"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import FadeInUp from "@/components/animations/FadeInUp";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string>(experiences[0]?.id ?? "");

  return (
    <section id="experience" className="section-padding bg-[#0B0F19] relative">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          subtitle="Where I've applied my skills to create measurable business impact."
          className="mb-16"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6] via-[#7B72E1] to-transparent" />

          <div className="space-y-8 pl-16">
            {experiences.map((exp, i) => (
              <FadeInUp key={exp.id} delay={i * 0.15}>
                {/* Node */}
                <div className="absolute left-4 w-4 h-4 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7B72E1] border-2 border-[#0B0F19] mt-6" />

                <div className="glass rounded-2xl overflow-hidden card-hover">
                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-[#F9FAFB] font-bold text-lg">{exp.role}</h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                              Present
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#9CA3AF]">
                          <span className="text-[#60A5FA] font-semibold">{exp.company}</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === exp.id ? "" : exp.id)
                        }
                        className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/[0.06] transition-colors"
                      >
                        {expandedId === exp.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>

                    {/* Expanded content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedId === exp.id ? "auto" : 0,
                        opacity: expandedId === exp.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2.5 mb-5 pt-2 border-t border-white/[0.06]">
                        {exp.description.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-[#9CA3AF]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Tag key={skill} variant="blue">
                            {skill}
                          </Tag>
                        ))}
                      </div>
                    </motion.div>

                    {/* Preview when collapsed */}
                    {expandedId !== exp.id && (
                      <p className="text-[#9CA3AF] text-sm">
                        {exp.description[0]}...{" "}
                        <button
                          onClick={() => setExpandedId(exp.id)}
                          className="text-[#60A5FA] hover:underline inline-flex items-center gap-1"
                        >
                          Read more <ExternalLink size={11} />
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </FadeInUp>
            ))}

            {/* Education entry */}
            <FadeInUp delay={0.3}>
              <div className="absolute left-4 w-4 h-4 rounded-full bg-gradient-to-br from-[#7B72E1] to-[#A78BFA] border-2 border-[#0B0F19]" style={{ top: "calc(100% - 80px)" }} />
              <div className="glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-[#F9FAFB] font-bold text-base">
                        B.Tech — Electronics & Communication Engineering
                      </h3>
                    </div>
                    <p className="text-[#60A5FA] font-semibold text-sm mb-1">
                      Guru Nanak Institute of Technology (GNIT), Sodepore
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#9CA3AF]">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        Graduated 2024
                      </span>
                      <span className="font-semibold text-[#A78BFA]">CGPA: 8.29</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
