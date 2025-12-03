"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const loaderRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(textRef.current, {
      opacity: 1,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.to(textRef.current, {
      letterSpacing: "8px",
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    tl.to(loaderRef.current, {
      scale: 1,
      duration: 1.2,
      ease: "power4.out",
    }, "-=1");

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
    >
      <h1
        ref={textRef}
        className="text-white text-5xl font-bold tracking-[2px] opacity-0"
      >
        GO-CART
      </h1>
    </div>
  );
}
