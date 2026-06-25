"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 24 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.getAttribute("role") === "button"
      );
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          width: isPointer ? 8 : 6,
          height: isPointer ? 8 : 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isPointer ? 1.5 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
          borderColor: isPointer ? "rgba(59,130,246,0.7)" : "rgba(255,255,255,0.25)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
