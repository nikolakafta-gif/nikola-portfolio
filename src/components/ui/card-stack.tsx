"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  React.useEffect(() => {
    function check() {
      const w = window.innerWidth;
      setIsMobile(w <= 991);
      setIsTablet(w > 767 && w <= 991);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const len = items.length;

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;
  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(700, intervalMs));

    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full"
        style={{ height: cardHeight + 80 }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: any,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-2xl overflow-hidden shadow-xl",
                    "will-change-transform select-none",
                    isActive
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-pointer",
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                    border: "1px solid rgba(27,29,30,0.1)",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} isMobile={isMobile} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile View button */}
      {isMobile && activeItem.href && (
        <div style={{ marginTop: "1.5em", position: "relative", zIndex: 10 }} className="flex justify-center">
          <a
            href={activeItem.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4em",
              background: "transparent",
              color: "#1b1d1e",
              fontSize: isTablet ? "0.9em" : "0.75em",
              fontWeight: 500,
              padding: isTablet ? "0.6em 1.5em" : "0.45em 1em",
              borderRadius: "999px",
              border: "1px solid rgba(27,29,30,0.15)",
              textDecoration: "none",
            }}
          >
            View Project
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      )}

      {/* Navigation arrows */}
      {showDots ? (
        <div style={{ marginTop: isMobile ? "3em" : "3.5em", position: "relative", zIndex: 10 }} className="flex items-center justify-center gap-5">
          <button
            onClick={prev}
            disabled={!canGoPrev}
            aria-label="Previous project"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: isTablet ? "2.5em" : isMobile ? "2.25em" : "2.75em",
              height: isTablet ? "2.5em" : isMobile ? "2.25em" : "2.75em",
              borderRadius: "50%",
              border: "1px solid rgba(27,29,30,0.1)",
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              cursor: canGoPrev ? "pointer" : "default",
              opacity: canGoPrev ? 1 : 0.3,
              transition: "transform 0.25s ease, background 0.2s ease",
              color: "#1b1d1e",
            }}
            onMouseEnter={(e) => { if (canGoPrev) { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.65)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}
          >
            <svg width={isTablet ? "16" : isMobile ? "14" : "18"} height={isTablet ? "16" : isMobile ? "14" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={!canGoNext}
            aria-label="Next project"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: isTablet ? "2.5em" : isMobile ? "2.25em" : "2.75em",
              height: isTablet ? "2.5em" : isMobile ? "2.25em" : "2.75em",
              borderRadius: "50%",
              border: "1px solid rgba(27,29,30,0.1)",
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              cursor: canGoNext ? "pointer" : "default",
              opacity: canGoNext ? 1 : 0.3,
              transition: "transform 0.25s ease, background 0.2s ease",
              color: "#1b1d1e",
            }}
            onMouseEnter={(e) => { if (canGoNext) { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.65)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(255,255,255,0.4)"; }}
          >
            <svg width={isTablet ? "16" : isMobile ? "14" : "18"} height={isTablet ? "16" : isMobile ? "14" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function DefaultFanCard({ item, isMobile }: { item: CardStackItem; active: boolean; isMobile?: boolean }) {
  if (isMobile) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          {item.imageSrc ? (
            <img
              src={item.imageSrc}
              alt={item.title}
              className="object-cover"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
              loading="eager"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-sm"
              style={{ background: "#f5f5f5", color: "rgba(27,29,30,0.5)" }}
            >
              No image
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full group">
      <style>{`
        .fan-overlay { opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
        .group:hover .fan-overlay { opacity: 1; pointer-events: auto; }
      `}</style>
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            draggable={false}
            loading="eager"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm"
            style={{ background: "#f5f5f5", color: "rgba(27,29,30,0.5)" }}
          >
            No image
          </div>
        )}
      </div>

      {/* Hover overlay — CSS-driven for reliable hover with framer-motion drag */}
      <div
        className="fan-overlay fan-overlay-inner"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1.5em",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {item.tag && (
              <span
                className="fan-tag"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.75em",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "0.35em",
                  display: "block",
                }}
              >
                {item.tag}
              </span>
            )}
            <span
              className="fan-title"
              style={{
                color: "#fff",
                fontSize: "1.25em",
                fontWeight: 600,
              }}
            >
              {item.title}
            </span>
          </div>

          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="fan-view"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5em",
                background: "transparent",
                color: "#fff",
                fontSize: "1em",
                fontWeight: 500,
                padding: "0.6em 2em",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "background 0.2s ease, backdrop-filter 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.backdropFilter = "blur(8px)"; e.currentTarget.style.webkitBackdropFilter = "blur(8px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.backdropFilter = "none"; e.currentTarget.style.webkitBackdropFilter = "none"; }}
            >
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
