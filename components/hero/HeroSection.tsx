"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import BloomLayer from "./BloomLayer";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const imageWrapper = imageWrapperRef.current;
      const bloomPrimary = document.getElementById("bloom-primary");
      const bloomDiamond = document.getElementById("bloom-diamond");
      const section = sectionRef.current;

      if (!imageWrapper || !bloomPrimary || !bloomDiamond || !section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(imageWrapper, { filter: "brightness(1)" });
        gsap.set(bloomPrimary, { opacity: 0.08 });
        gsap.set(bloomDiamond, { opacity: 0.06 });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.to(imageWrapper, {
          filter: "brightness(0.38)",
          duration: 2,
          ease: "power2.out",
        });

        tl.to(bloomPrimary, {
          opacity: 0.05,
          duration: 1.8,
          ease: "power1.inOut",
        }, "-=1.5");

        tl.to(bloomDiamond, {
          opacity: 0.04,
          duration: 1.8,
          ease: "power1.inOut",
        }, "<");

        tl.to(imageWrapper, {
          filter: "brightness(1)",
          duration: 2.8,
          ease: "power1.inOut",
        });

        tl.to(bloomPrimary, {
          opacity: 0.10,
          duration: 2,
          ease: "power2.out",
        }, "<");

        tl.to(bloomDiamond, {
          opacity: 0.07,
          duration: 2,
          ease: "power2.out",
        }, "<");

        tl.to(bloomPrimary, {
          opacity: 0.02,
          duration: 0.08,
          ease: "none",
        }, "-=1.8");

        tl.to(bloomPrimary, {
          opacity: 0.10,
          duration: 0.15,
          ease: "power2.out",
        });

        tl.to(bloomPrimary, {
          opacity: 0.13,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        tl.to(bloomDiamond, {
          opacity: 0.09,
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }, "<");
      });

      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 2,
          onUpdate: (self) => {
            gsap.set(imageWrapper, {
              scale: 1 + self.progress * 0.08,
            });
            gsap.set(bloomPrimary, {
              opacity: Math.min(0.10 + self.progress * 0.08, 0.18),
            });
          },
        });
      }
    };

    initGSAP();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      aria-label="Diamonds Gentlemen's Club exterior"
    >
      <h1 className="sr-only">
        Diamonds Gentlemen's Club — Mississauga, Ontario
      </h1>

      <div
        ref={imageWrapperRef}
        className="hero-image-wrapper"
        style={{ zIndex: 1 }}
      >
        <Image
          src="/hero-desktop.jpg"
          alt="Diamonds Gentlemen's Club at night — red neon sign glowing on wet pavement"
          fill
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      <BloomLayer />

      <div
        className="hero-vignette"
        aria-hidden="true"
        style={{ zIndex: 3 }}
      />
    </section>
  );
}
