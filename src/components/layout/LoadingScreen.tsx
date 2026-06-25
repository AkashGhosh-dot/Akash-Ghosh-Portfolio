"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0F19]"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-[#3B82F6]/6 blur-[120px]" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#7B72E1]/8 blur-[80px]" />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-4 select-none">
            {/* "Welcome" */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-6xl sm:text-7xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #7B72E1 50%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
              className="text-[#9CA3AF] text-sm sm:text-base tracking-[0.2em] uppercase font-medium"
            >
              Thanks for visiting
            </motion.p>

            {/* Thin accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.85 }}
              className="w-12 h-px origin-left"
              style={{
                background: "linear-gradient(to right, #3B82F6, #A78BFA)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
