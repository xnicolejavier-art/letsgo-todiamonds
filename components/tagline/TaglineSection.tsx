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
        gsap.set([line1, line2, line3], { y: 0 });
        return;
      }

      ctx = gsap.context(() => {
        /*
         * Each line starts translated down behind its overflow:hidden
         * parent. GSAP moves each to y:0, creating a reveal from
         * darkness rather than a fade or slide.
         *
         * once:true means the animation plays once and holds.
         * No scrub — the lines arrive with their own timing,
         * not tied directly to scroll position.
         */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });

        // Line 1 — The lights.
        tl.to(line1, {
          y: 0,
          duration: 1.0,
          ease: "power2.out",
        });

        // Line 2 — The girls. (0.3s after line 1)
        tl.to(
          line2,
          {
            y: 0,
            duration: 1.0,
            ease: "power2.out",
          },
          "+=0.3"
        );

        // Line 3 — The freedom. (longer pause — this one lands differently)
        tl.to(
          line3,
          {
            y: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          "+=0.7"
        );
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
        /*
         * Negative margin pulls this section up into the hero,
         * making the transition feel continuous rather than
         * like entering a new page section.
         * The hero image bleeds through via the dark background.
         */
        position: "relative",
        marginTop: "-30vh",
        paddingTop: "15vh",
        paddingBottom: "20vh",
        paddingLeft: "clamp(2rem, 8vw, 10rem)",
        background:
          "linear-gradient(to bottom, transparent 0%, #080A0C 35%, #080A0C 100%)",
        zIndex: 10,
      }}
    >
      {/*
       * Each tagline line has two layers:
       * - outer: overflow hidden, acts as the mask
       * - inner (ref): starts at translateY(100%), GSAP reveals to 0
       * This creates the emergence-from-darkness effect.
       */}

      {/* Line 1 */}
      <div style={{ overflow: "hidden", marginBottom: "0.15em" }}>
        <div
          ref={line1Ref}
          style={{
            transform: "translateY(100%)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#F0EDE8",
            lineHeight: 1.1,
          }}
        >
          The lights.
        </div>
      </div>

      {/* Line 2 */}
      <div style={{ overflow: "hidden", marginBottom: "0.15em" }}>
        <div
          ref={line2Ref}
          style={{
            transform: "translateY(100%)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#F0EDE8",
            lineHeight: 1.1,
          }}
        >
          The girls.
        </div>
      </div>

      {/* Line 3 — The freedom. Slightly larger. This one lands. */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={line3Ref}
          style={{
            transform: "translateY(100%)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#F0EDE8",
            lineHeight: 1.1,
          }}
        >
          The freedom.
        </div>
      </div>
    </section>
  );
}
