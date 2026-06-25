"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Construction } from "lucide-react";
import Tag from "@/components/ui/Tag";
import type { CaseStudy } from "@/types/caseStudy";

interface Props {
  study: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyDetailModal({ study, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = study ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [study]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {study && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 sm:inset-8 lg:inset-12 z-[101] bg-[#0D1220] border border-white/10 rounded-3xl overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="sticky top-4 left-full float-right z-10 mr-4 p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-12 max-w-4xl mx-auto">

              {/* ── Header ── */}
              <div className="mb-10 relative">
                <div
                  className="absolute -top-12 -left-12 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                  style={{ background: study.color, opacity: 0.12 }}
                />
                <Tag variant="blue" className="mb-4 relative">{study.category}</Tag>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 relative leading-tight"
                  style={{
                    background: `linear-gradient(135deg, ${study.color} 0%, #A78BFA 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {study.title}
                </h2>
                <p className="text-[#9CA3AF] text-base relative">{study.tagline}</p>
              </div>

              {study.comingSoon ? (
                /* ── Coming Soon placeholder ── */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${study.color}15`, border: `1px solid ${study.color}30` }}
                  >
                    <Construction size={28} style={{ color: study.color }} />
                  </div>
                  <h3 className="text-[#F9FAFB] font-bold text-xl mb-3">Case Study In Progress</h3>
                  <p className="text-[#9CA3AF] text-sm max-w-sm leading-relaxed">
                    This case study is currently being written up. Check back soon — the full breakdown of challenge, approach, and outcomes will be here shortly.
                  </p>
                  <div
                    className="mt-8 px-5 py-2.5 rounded-full text-xs font-semibold"
                    style={{
                      background: `${study.color}12`,
                      border: `1px solid ${study.color}30`,
                      color: study.color,
                    }}
                  >
                    Coming Soon
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* ── Business Challenge ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="rounded-2xl p-6 mb-8"
                    style={{
                      background: `${study.color}0A`,
                      border: `1px solid ${study.color}28`,
                    }}
                  >
                    <h3
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-3"
                      style={{ color: study.color }}
                    >
                      01 — The Business Challenge
                    </h3>
                    <p className="text-[#F9FAFB] text-base leading-relaxed font-medium mb-3">
                      {study.challenge}
                    </p>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">
                      {study.challengeContext}
                    </p>
                  </motion.div>

                  {/* ── My Approach (timeline) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.5 }}
                    className="mb-8"
                  >
                    <h3
                      className="text-xs font-bold tracking-[0.15em] uppercase mb-7"
                      style={{ color: study.color }}
                    >
                      02 — My Approach
                    </h3>

                    <div className="space-y-0">
                      {study.approach.map(({ title, description }, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.22 + i * 0.07, duration: 0.4 }}
                          className="flex gap-5"
                        >
                          <div className="flex flex-col items-center shrink-0">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                              style={{
                                background: `${study.color}18`,
                                border: `1.5px solid ${study.color}50`,
                                color: study.color,
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            {i < study.approach.length - 1 && (
                              <div
                                className="w-px flex-1 my-1"
                                style={{ background: `${study.color}20`, minHeight: "28px" }}
                              />
                            )}
                          </div>
                          <div className="pb-7">
                            <p className="text-[#F9FAFB] text-sm font-semibold mb-1 leading-snug">{title}</p>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed">{description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Outcomes & Impact ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mb-8 rounded-2xl p-6 bg-[#10B981]/[0.05] border border-[#10B981]/20"
                  >
                    <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-4 text-[#10B981]">
                      03 — Outcomes & Impact
                    </h3>
                    <p className="text-[#F9FAFB] font-semibold text-base mb-5 leading-snug">
                      {study.impactStatement}
                    </p>
                    <ul className="space-y-3">
                      {study.outcomePoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#9CA3AF] text-sm leading-relaxed">
                          <CheckCircle2 size={15} className="text-[#10B981] mt-0.5 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* ── Skills Applied ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.42, duration: 0.4 }}
                  >
                    <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-4 text-[#6B7280]">
                      Skills Applied
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {study.skills.map((skill) => (
                        <Tag key={skill} variant="purple">{skill}</Tag>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
