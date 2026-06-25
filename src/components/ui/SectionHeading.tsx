"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      className={cn(center ? "text-center" : "", className)}
    >
      {label && (
        <div className={cn("flex items-center gap-3 mb-4", center && "justify-center")}>
          <span className="w-8 h-px bg-[#3B82F6]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3B82F6]">
            {label}
          </span>
          <span className="w-8 h-px bg-[#3B82F6]" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F9FAFB] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-[#9CA3AF] text-base sm:text-lg leading-relaxed", center ? "max-w-2xl mx-auto" : "max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
