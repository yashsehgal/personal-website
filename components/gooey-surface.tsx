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
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const liveRef = useRef(false);
  const suppressClickRef = useRef(false);
  const pointerRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    dragging: boolean;
    locked: boolean;
  } | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

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
      renderer.setAppearance(readSurfaceColor(root), 20, 2.6);
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

      return;
    }

    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const body = bodyRef.current;
      const renderer = rendererRef.current;
      const content = contentRef.current;

      if (!body || !renderer || !content) {
        return;
      }

      const moving = body.step((now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;
      body.writePositions(positionsRef.current);
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

      liveRef.current = false;
      setIsLive(false);
      content.style.transform = "none";
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isLive]);

  const startLive = () => {
    if (liveRef.current) {
      return;
    }

    liveRef.current = true;
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
      data-gooey-live={isLive || undefined}
      data-gooey-grabbing={isGrabbing || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onClickCapture={onClickCapture}
      className={cn(
        "relative touch-none select-none",
        isGrabbing ? "cursor-grabbing" : "cursor-grab",
        "data-gooey-live:bg-transparent data-gooey-live:shadow-none data-gooey-live:backdrop-blur-none",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute max-w-none",
          isLive ? "opacity-100" : "opacity-0",
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
