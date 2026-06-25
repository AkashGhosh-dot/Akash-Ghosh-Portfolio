"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowRight, Search, BarChart3, FileText, CheckCircle2, Rocket } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const workflowSteps = [
  { icon: Search,       label: "Discover",  color: "#60A5FA" },
  { icon: BarChart3,    label: "Analyse",   color: "#7B72E1" },
  { icon: FileText,     label: "Define",    color: "#A78BFA" },
  { icon: CheckCircle2, label: "Validate",  color: "#60A5FA" },
  { icon: Rocket,       label: "Deliver",   color: "#10B981" },
];

const BASE_DELAY = 2.3;
const STAGGER = 0.12;

function fadeUp(i: number) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: BASE_DELAY + i * STAGGER },
  };
}

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#0B0F19]"
    >
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0 opacity-60">
        <HeroScene />
      </div>

      {/* ── Ambient left glow ── */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/6 blur-[140px] pointer-events-none z-0" />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 z-0 dot-grid opacity-35 pointer-events-none" />

      {/* ══════════════════════════════════════
          PORTRAIT — absolutely placed, right side
      ══════════════════════════════════════ */}

      {/* Deep glow blob behind portrait */}
      <div
        className="absolute right-0 top-0 w-[55%] h-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(123,114,225,0.13) 0%, rgba(59,130,246,0.07) 50%, transparent 80%)",
        }}
      />

      {/* Portrait wrapper — desktop: absolute bottom-right | mobile: in-flow */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: BASE_DELAY + 0.1 }}
        className="
          hidden lg:block
          absolute bottom-[150px] right-0
          w-[44%] xl:w-[40%] 2xl:w-[36%]
          h-[96%]
          pointer-events-none z-10
        "
      >
        <div className="relative w-full h-full">
          {/* Rim-light and glow via drop-shadow on the PNG */}
          <Image
            src="/images/profile/backgrowndless-photo.png"
            alt="Akash Ghosh — Business Analyst"
            fill
            priority
            className="object-contain object-bottom select-none"
            style={{
              filter:
                "drop-shadow(0 0 18px rgba(123,114,225,0.75)) drop-shadow(0 0 48px rgba(59,130,246,0.4)) drop-shadow(-8px 0 28px rgba(123,114,225,0.5))",
            }}
          />

          {/* Bottom fade — blends feet into background */}
          <div
            className="absolute bottom-0 inset-x-0 z-20 pointer-events-none"
            style={{
              height: "35%",
              background:
                "linear-gradient(to top, #0B0F19 0%, rgba(11,15,25,0.85) 30%, rgba(11,15,25,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Left edge fade — blends portrait into text area */}
          <div
            className="absolute inset-y-0 left-0 z-20 pointer-events-none"
            style={{
              width: "28%",
              background:
                "linear-gradient(to right, #0B0F19 0%, rgba(11,15,25,0.6) 50%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          CONTENT — left side
      ══════════════════════════════════════ */}
      <div className="relative z-20 section-container min-h-screen flex flex-col justify-center pt-28 pb-20">

        {/* Mobile portrait (in-flow, above text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: BASE_DELAY }}
          className="lg:hidden flex justify-center mb-8 mt-[50px]"
        >
          <div className="relative w-52 h-64 sm:w-64 sm:h-80">
            <Image
              src="/images/profile/backgrowndless-photo.png"
              alt="Akash Ghosh"
              fill
              priority
              className="object-contain object-bottom"
              style={{
                filter:
                  "drop-shadow(0 0 16px rgba(123,114,225,0.7)) drop-shadow(0 0 40px rgba(59,130,246,0.35))",
              }}
            />
            <div
              className="absolute bottom-0 inset-x-0 pointer-events-none"
              style={{
                height: "30%",
                background:
                  "linear-gradient(to top, #0B0F19 0%, transparent 100%)",
              }}
            />
          </div>
        </motion.div>

        {/* Text block — constrained to left portion on desktop */}
        <div className="w-full lg:max-w-[52%] xl:max-w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Status badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Open to BA & Product Analyst Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(1)}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-[0.95] mb-5"
          >
            <span className="gradient-text">Akash</span>
            <br />
            <span className="text-[#F9FAFB]">Ghosh</span>
          </motion.h1>

          {/* Title row */}
          <motion.div {...fadeUp(2)} className="flex items-center gap-3 mb-5">
            <span className="hidden lg:block w-8 h-px bg-[#3B82F6]/50 shrink-0" />
            <p className="text-[#9CA3AF] text-xs sm:text-sm font-medium tracking-[0.15em] uppercase">
              Business Analyst · Product Thinker · Data-Driven Strategist
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(3)}
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#F9FAFB] max-w-lg leading-snug mb-8"
          >
            Transforming Business Complexity Into{" "}
            <span className="gradient-text-blue">Clarity, Strategy & Results.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(4)} className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={scrollToProjects}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7B72E1] text-white font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:scale-[1.02] transition-all duration-200"
            >
              View My Work
            </button>
            <a
              href="/resume/akash-ghosh-resume.pdf"
              download
              className="px-7 py-3.5 rounded-xl border border-white/15 text-[#F9FAFB] font-semibold hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* BA Process Workflow Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: BASE_DELAY + 0.52 }}
            className="w-full max-w-sm sm:max-w-lg lg:max-w-xs xl:max-w-md"
          >
            <p className="text-[#9CA3AF] text-[10px] uppercase tracking-widest mb-2.5 font-medium">
              BA Process
            </p>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-start">
                {workflowSteps.map(({ icon: Icon, label, color }, i) => (
                  <Fragment key={label}>
                    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0 px-1">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.35, delay: BASE_DELAY + 0.62 + i * 0.09 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${color}15`,
                          border: `1px solid ${color}35`,
                        }}
                      >
                        <Icon size={14} style={{ color }} />
                      </motion.div>
                      <span className="text-[#9CA3AF] text-[9px] text-center leading-tight font-medium">
                        {label}
                      </span>
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <ArrowRight size={10} className="mt-2.5 shrink-0 text-[#3B82F6]/30" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE_DELAY + 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-[#9CA3AF] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-[#3B82F6]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
