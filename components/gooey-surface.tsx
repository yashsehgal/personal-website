"use client";

import { quadToMatrix3d } from "@/lib/gooey-math";
import { GooeyRenderer, readSurfaceColor } from "@/lib/gooey-renderer";
import { GooeySoftBody } from "@/lib/gooey-soft-body";
import { cn } from "cn";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const CANVAS_PAD = 176;
const DRAG_THRESHOLD = 5;
const CONTROL_DRAG_THRESHOLD = 9;
const HANDOFF_MS = 380;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const STEAL_SELECTOR = "input, textarea, select, [data-no-gooey]";

type GooeySurfaceProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function eventPoint(node: HTMLElement, event: PointerEvent | ReactPointerEvent) {
  const rect = node.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function GooeySurface({
  children,
  className,
  contentClassName,
}: GooeySurfaceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodyRef = useRef<GooeySoftBody | null>(null);
  const rendererRef = useRef<GooeyRenderer | null>(null);
  const positionsRef = useRef(new Float32Array(0));
  const colorRef = useRef<[number, number, number]>([0.145, 0.145, 0.145]);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const liveRef = useRef(false);
  const handoffRef = useRef<{ started: boolean; endsAt: number }>({
    started: false,
    endsAt: 0,
  });
  const suppressClickRef = useRef(false);
  const pointerRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    dragging: boolean;
    locked: boolean;
  } | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isHandoff, setIsHandoff] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const showBlob = isLive && !isHandoff;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas || prefersReducedMotion()) {
      return;
    }

    const body = new GooeySoftBody();
    const renderer = new GooeyRenderer(canvas, body.cols, body.rows, CANVAS_PAD);
    bodyRef.current = body;
    rendererRef.current = renderer;
    positionsRef.current = new Float32Array(body.cols * body.rows * 2);

    const applyAppearance = () => {
      colorRef.current = readSurfaceColor(root);
      renderer.setAppearance(colorRef.current, 20, 1);
    };

    const syncSize = () => {
      const width = root.offsetWidth;
      const height = root.offsetHeight;
      body.resize(width, height);
      renderer.setSize(width, height, window.devicePixelRatio);
      applyAppearance();
    };

    syncSize();

    const observer = new ResizeObserver(syncSize);
    observer.observe(root);

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    themeQuery.addEventListener("change", applyAppearance);

    return () => {
      cancelAnimationFrame(frameRef.current);
      themeQuery.removeEventListener("change", applyAppearance);
      observer.disconnect();
      renderer.dispose();
      rendererRef.current = null;
      bodyRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isLive) {
      const content = contentRef.current;

      if (content) {
        content.style.transform = "none";
      }

      handoffRef.current = { started: false, endsAt: 0 };
      return;
    }

    lastTimeRef.current = performance.now();
    handoffRef.current = { started: false, endsAt: 0 };

    const tick = (now: number) => {
      const body = bodyRef.current;
      const renderer = rendererRef.current;
      const content = contentRef.current;

      if (!body || !renderer || !content) {
        return;
      }

      if (body.grabbing && handoffRef.current.started) {
        handoffRef.current = { started: false, endsAt: 0 };
        setIsHandoff(false);
      }

      const moving = body.step((now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;
      body.writePositions(positionsRef.current);
      renderer.setAppearance(colorRef.current, 20, body.deformation);
      renderer.updateVertices(positionsRef.current);
      renderer.render();

      const corners = body.getCorners();
      content.style.transform = quadToMatrix3d(
        body.width,
        body.height,
        corners.topLeft,
        corners.topRight,
        corners.bottomLeft,
        corners.bottomRight,
      );

      if (moving) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!handoffRef.current.started) {
        renderer.setAppearance(colorRef.current, 20, 0);
        renderer.render();
        content.style.transform = "none";
        handoffRef.current = {
          started: true,
          endsAt: now + HANDOFF_MS,
        };
        setIsHandoff(true);
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      if (now < handoffRef.current.endsAt) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      liveRef.current = false;
      setIsLive(false);
      setIsHandoff(false);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isLive]);

  const startLive = () => {
    if (liveRef.current) {
      return;
    }

    liveRef.current = true;
    handoffRef.current = { started: false, endsAt: 0 };
    setIsHandoff(false);
    setIsLive(true);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || prefersReducedMotion()) {
      return;
    }

    const root = rootRef.current;
    const target = event.target;

    if (!root || !(target instanceof Element)) {
      return;
    }

    if (target.closest(STEAL_SELECTOR)) {
      return;
    }

    const point = eventPoint(root, event);
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      locked: Boolean(target.closest("a, button")),
    };

    bodyRef.current?.grab(point.x, point.y);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    const root = rootRef.current;
    const body = bodyRef.current;

    if (!pointer || pointer.id !== event.pointerId || !root || !body) {
      return;
    }

    const distance = Math.hypot(
      event.clientX - pointer.startX,
      event.clientY - pointer.startY,
    );
    const threshold = pointer.locked ? CONTROL_DRAG_THRESHOLD : DRAG_THRESHOLD;

    if (!pointer.dragging && distance >= threshold) {
      pointer.dragging = true;
      suppressClickRef.current = true;
      startLive();
      setIsGrabbing(true);
      root.setPointerCapture(event.pointerId);
    }

    if (!pointer.dragging) {
      return;
    }

    const point = eventPoint(root, event);
    body.drag(point.x, point.y);
  };

  const endPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const root = rootRef.current;

    if (pointer.dragging) {
      bodyRef.current?.release();
      setIsGrabbing(false);
      root?.hasPointerCapture(event.pointerId) &&
        root.releasePointerCapture(event.pointerId);
    }

    pointerRef.current = null;
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div
      ref={rootRef}
      data-gooey-live={showBlob || undefined}
      data-gooey-handoff={isHandoff || undefined}
      data-gooey-grabbing={isGrabbing || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onClickCapture={onClickCapture}
      className={cn(
        "relative touch-none select-none transition-[background-color,box-shadow,backdrop-filter] duration-350 ease-[cubic-bezier(0.2,0,0,1)]",
        isGrabbing ? "cursor-grabbing" : "cursor-grab",
        "data-gooey-live:bg-transparent data-gooey-live:shadow-none data-gooey-live:backdrop-blur-none data-gooey-live:duration-0",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute max-w-none transition-opacity duration-350 ease-[cubic-bezier(0.2,0,0,1)]",
          showBlob ? "opacity-100 duration-0" : "opacity-0",
        )}
      />
      <div
        ref={contentRef}
        className={cn("relative origin-top-left", contentClassName)}
      >
        {children}
      </div>
    </div>
  );
}
