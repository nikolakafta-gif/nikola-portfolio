"use client";

import { useEffect, useState } from "react";
import { CardStack, type CardStackItem } from "./ui/card-stack";

const projects: CardStackItem[] = [
  {
    id: 1,
    title: "Comira",
    description: "Coming soon page with countdown timer and waitlist signup",
    imageSrc: "/assets/images/work-comira.webp",
    href: "https://comira-eight.vercel.app/",
    tag: "Web Development",
  },
  {
    id: 2,
    title: "Doorly",
    description: "Smart doorbell landing page with sleek product showcase",
    imageSrc: "/assets/images/work-doorly.webp",
    href: "https://doorly-chi.vercel.app/",
    tag: "Web Development",
  },
  {
    id: 3,
    title: "Vistal",
    description: "Modern business website with clean design and smooth UX",
    imageSrc: "/assets/images/work-vistal.webp",
    href: "https://vistal-brown.vercel.app/",
    tag: "Web Development",
  },
  {
    id: 4,
    title: "Casera",
    description: "Real estate platform with elegant property showcase",
    imageSrc: "/assets/images/work-casera.webp",
    href: "https://casera-hotel.vercel.app/",
    tag: "Web Development",
  },
  {
    id: 5,
    title: "Advisia",
    description: "Consulting agency website with professional branding",
    imageSrc: "/assets/images/work-advisia.webp",
    href: "https://advisia-five.vercel.app/",
    tag: "Web Development",
  },
];

function useResponsiveCard() {
  const [dims, setDims] = useState({ w: 620, h: 350, spread: 44, depth: 120, overlap: 0.48, maxVis: 7 });

  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      if (vw <= 479) {
        setDims({ w: 240, h: 135, spread: 22, depth: 40, overlap: 0.6, maxVis: 3 });
      } else if (vw <= 767) {
        setDims({ w: 300, h: 170, spread: 28, depth: 60, overlap: 0.55, maxVis: 3 });
      } else if (vw <= 991) {
        setDims({ w: 400, h: 225, spread: 34, depth: 80, overlap: 0.5, maxVis: 5 });
      } else {
        setDims({ w: 620, h: 350, spread: 44, depth: 120, overlap: 0.48, maxVis: 7 });
      }
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

export default function WorkStack() {
  const { w, h, spread, depth, overlap, maxVis } = useResponsiveCard();

  return (
    <CardStack
      items={projects}
      initialIndex={0}
      autoAdvance
      intervalMs={3000}
      pauseOnHover
      showDots
      cardWidth={w}
      cardHeight={h}
      overlap={overlap}
      spreadDeg={spread}
      depthPx={depth}
      maxVisible={maxVis}
      tiltXDeg={10}
      activeLiftPx={20}
      activeScale={1.02}
      inactiveScale={0.92}
    />
  );
}
