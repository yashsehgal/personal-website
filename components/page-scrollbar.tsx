"use client";

import { cn } from "cn";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const EDGE_INSET_PX = 2;
const MIN_THUMB_HEIGHT_PX = 32;

function getScrollMetrics() {
  const viewportHeight = window.innerHeight;
  const contentHeight = document.documentElement.scrollHeight;
  const trackHeight = viewportHeight - EDGE_INSET_PX * 2;
  const thumbHeight = Math.max(
    MIN_THUMB_HEIGHT_PX,
    (trackHeight * viewportHeight) / contentHeight,
  );

  return {
    isScrollable: contentHeight > viewportHeight + 1,
    maxScroll: contentHeight - viewportHeight,
    maxThumbOffset: trackHeight - thumbHeight,
    thumbHeight,
  };
}

export function PageScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerY: number; scrollY: number } | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const thumb = thumbRef.current;
      const metrics = getScrollMetrics();

      setIsScrollable(metrics.isScrollable);

      if (!thumb || !metrics.isScrollable) {
        return;
      }

      const progress = metrics.maxScroll > 0 ? window.scrollY / metrics.maxScroll : 0;
      const offset = EDGE_INSET_PX + progress * metrics.maxThumbOffset;

      thumb.style.height = `${metrics.thumbHeight}px`;
      thumb.style.translate = `0 ${offset}px`;
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(update);
      }
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerY: event.clientY, scrollY: window.scrollY };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    const { maxScroll, maxThumbOffset } = getScrollMetrics();

    if (maxThumbOffset <= 0) {
      return;
    }

    window.scrollTo({
      top:
        drag.scrollY +
        ((event.clientY - drag.pointerY) * maxScroll) / maxThumbOffset,
      behavior: "instant",
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setIsDragging(false);
  };

  return (
    <div
      ref={thumbRef}
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "group fixed top-0 right-0 z-50 flex w-3 justify-center touch:hidden",
        isScrollable ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        className={cn(
          "h-full w-1.5 rounded-full transition-[background-color,width] duration-150 ease-out group-hover:w-2",
          isDragging
            ? "w-2 bg-foreground/40"
            : "bg-foreground/20 group-hover:bg-foreground/35",
        )}
      />
    </div>
  );
}
