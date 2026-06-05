import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Curtain Reveal ── */
function initCurtainReveal() {
  document.querySelectorAll<HTMLElement>("[data-curtain]").forEach((wrap) => {
    const panels = wrap.querySelectorAll<HTMLElement>(".curtain__panel");
    if (!panels.length) return;

    const isSlow = wrap.hasAttribute("data-curtain-slow");
    const dur = isSlow ? 1.8 : 1.1;
    const stag = isSlow ? 0.3 : 0.2;

    gsap.set(panels, { scaleX: 1 });

    gsap.to(panels, {
      scaleX: 0,
      duration: dur,
      ease: "power3.inOut",
      stagger: stag,
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        once: true,
      },
    });
  });
}

/* ── Fade Up ── */
function initFadeUp() {
  document.querySelectorAll<HTMLElement>("[data-fade-up]").forEach((el) => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}

/* ── Stagger children ── */
function initStagger() {
  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
    const children = parent.children;
    gsap.fromTo(children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: parent,
          start: "top 80%",
          once: true,
        },
      }
    );
  });
}

/* ── Init all ── */
export function initScrollAnimations() {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    initCurtainReveal();
    initFadeUp();
    initStagger();
  });
}
