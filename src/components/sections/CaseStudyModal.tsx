"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Tag from "@/components/ui/Tag";
import type { Project } from "@/types/project";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-[101] bg-[#0F1623] border border-white/10 rounded-3xl overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="sticky top-4 left-full float-right z-10 mr-4 p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-12 max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-10">
                <Tag variant="blue" className="mb-4">{project.category}</Tag>
                <h2 className="text-3xl sm:text-4xl font-black text-[#F9FAFB] mb-2">{project.title}</h2>
                <p className="text-[#60A5FA] font-medium">{project.subtitle}</p>
              </div>

              {/* Overview strip */}
              <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Tag key={tool} variant="purple">{tool}</Tag>
                  ))}
                </div>
              </div>

              {/* Sections */}
              {[
                { label: "01 — The Problem", content: project.problem },
                { label: "02 — Business Context", content: project.context },
              ].map(({ label, content }) => (
                <div key={label} className="mb-8">
                  <h3 className="text-[#3B82F6] text-xs font-bold tracking-[0.15em] uppercase mb-3">{label}</h3>
                  <p className="text-[#9CA3AF] leading-relaxed">{content}</p>
                </div>
              ))}

              {/* Lists */}
              {[
                { label: "03 — Objectives", items: project.objectives },
                { label: "04 — Approach & Methodology", items: project.approach },
                { label: "05 — Key Findings", items: project.findings },
                { label: "06 — Recommendations", items: project.recommendations },
                { label: "07 — Results & Impact", items: project.results },
              ].map(({ label, items }) => (
                <div key={label} className="mb-8">
                  <h3 className="text-[#3B82F6] text-xs font-bold tracking-[0.15em] uppercase mb-3">{label}</h3>
                  <ul className="space-y-2.5">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#9CA3AF] text-sm leading-relaxed">
                        <ArrowRight size={14} className="text-[#3B82F6] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Lessons Learned */}
              <div className="mb-8">
                <h3 className="text-[#3B82F6] text-xs font-bold tracking-[0.15em] uppercase mb-3">
                  08 — Lessons Learned
                </h3>
                <ul className="space-y-2.5">
                  {project.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#9CA3AF] text-sm leading-relaxed">
                      <span className="text-[#A78BFA] font-bold shrink-0">→</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
