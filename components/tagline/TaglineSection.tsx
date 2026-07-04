"use client";

import { useEffect, useRef } from "react";

export default function TaglineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const line3 = line3Ref.current;

      if (!section || !line1 || !line2 || !line3) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([line1, line2, line3], { y: 0, opacity: 1 });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        });

        tl.to(line1, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        });

        tl.to(line2, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }, "+=0.35");

        tl.to(line3, {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
        }, "+=0.75");
      });
    };

    initGSAP();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Tagline"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#080A0C",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "clamp(2rem, 10vw, 12rem)",
        paddingTop: "10vh",
        paddingBottom: "10vh",
        zIndex: 10,
      }}
    >
      <div style={{ overflow: "hidden", marginBottom: "1.6em" }}>
        <div
          ref={line1Ref}
          style={{
            transform: "translateY(100%)",
            opacity: 0,
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "rgba(240, 237, 232, 0.85)",
            lineHeight: 1.1,
          }}
        >
          The lights.
        </div>
      </div>

      <div style={{ overflow: "hidden", marginBottom: "1.6em" }}>
        <div
          ref={line2Ref}
          style={{
            transform: "translateY(100%)",
            opacity: 0,
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "rgba(240, 237, 232, 0.85)",
            lineHeight: 1.1,
          }}
        >
          The girls.
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div
          ref={line3Ref}
          style={{
            transform: "translateY(100%)",
            opacity: 0,
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "rgba(240, 237, 232, 0.85)",
            lineHeight: 1.1,
          }}
        >
          The freedom.
        </div>
      </div>
    </section>
  );
}
