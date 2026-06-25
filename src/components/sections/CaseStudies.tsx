"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Users,
  Car,
  Briefcase,
  ArrowUpRight,
  type LucideProps,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import FadeInUp from "@/components/animations/FadeInUp";
import CaseStudyDetailModal from "@/components/sections/CaseStudyDetailModal";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/types/caseStudy";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  BarChart3,
  Bot,
  Users,
  Car,
  Briefcase,
};

export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="section-padding bg-[#080C14] relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 line-grid opacity-25" />

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Case Studies"
          title="Business Challenges. Real Solutions."
          subtitle="Five engagements across data analytics, AI, operations, and process improvement — each demonstrating how structured analysis drives measurable business outcomes."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((study, i) => {
            const Icon = iconMap[study.iconName] ?? Briefcase;
            return (
              <FadeInUp key={study.id} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative flex flex-col rounded-2xl overflow-hidden h-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${study.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${study.color}10, 0 20px 60px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="h-[3px] w-full shrink-0"
                    style={{
                      background: `linear-gradient(to right, ${study.color}, ${study.color}00)`,
                    }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon + faint number */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${study.color}15`,
                          border: `1px solid ${study.color}30`,
                        }}
                      >
                        <Icon size={18} style={{ color: study.color }} />
                      </div>
                      <span
                        className="text-6xl font-black font-mono leading-none select-none"
                        style={{ color: study.color, opacity: 0.07 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Category */}
                    <Tag variant="muted" className="mb-3 self-start text-[11px]">
                      {study.category}
                    </Tag>

                    {/* Title */}
                    <h3 className="text-[#F9FAFB] text-[1.05rem] font-bold mb-3 leading-snug transition-colors duration-300 group-hover:text-[#60A5FA]">
                      {study.title}
                    </h3>

                    {/* Challenge text */}
                    <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {study.challenge}
                    </p>

                    {/* Outcome pill */}
                    <div
                      className="rounded-xl p-3 mb-5"
                      style={{
                        background: "rgba(16, 185, 129, 0.07)",
                        border: "1px solid rgba(16, 185, 129, 0.18)",
                      }}
                    >
                      <p className="text-[#10B981] text-xs font-medium leading-snug line-clamp-2">
                        {study.outcome}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {study.skills.slice(0, 3).map((skill) => (
                        <Tag key={skill} variant="muted" className="text-[10px]">
                          {skill}
                        </Tag>
                      ))}
                      {study.skills.length > 3 && (
                        <Tag variant="muted" className="text-[10px]">
                          +{study.skills.length - 3}
                        </Tag>
                      )}
                    </div>

                    {/* CTA */}
                    {study.detailPage ? (
                      <Link
                        href={study.detailPage}
                        className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 group/btn mt-auto self-start"
                        style={{ color: study.color }}
                      >
                        View Case Study
                        <ArrowUpRight
                          size={14}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200"
                        />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setActiveStudy(study)}
                        className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 group/btn mt-auto self-start"
                        style={{ color: study.color }}
                      >
                        View Case Study
                        <ArrowUpRight
                          size={14}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200"
                        />
                      </button>
                    )}
                  </div>
                </motion.article>
              </FadeInUp>
            );
          })}
        </div>
      </div>

      <CaseStudyDetailModal study={activeStudy} onClose={() => setActiveStudy(null)} />
    </section>
  );
}
