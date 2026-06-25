"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart2, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import CaseStudyModal from "@/components/sections/CaseStudyModal";
import FadeInUp from "@/components/animations/FadeInUp";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

const projectIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  "netflix-data-analysis": BarChart2,
  "house-price-prediction": TrendingUp,
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding bg-[#0B0F19] relative">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Projects"
          title="Case Studies & Work"
          subtitle="Real analytical problems. Real data. Real business insights."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const Icon = projectIcons[project.id] ?? BarChart2;
            return (
              <FadeInUp key={project.id} delay={i * 0.15}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="glass rounded-2xl p-8 h-full flex flex-col gradient-border group"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#7B72E1]/20 border border-white/10 flex items-center justify-center group-hover:border-[#3B82F6]/40 transition-colors duration-300">
                      <Icon size={22} className="text-[#60A5FA]" />
                    </div>
                    <Tag variant="blue">{project.category}</Tag>
                  </div>

                  {/* Content */}
                  <h3 className="text-[#F9FAFB] text-xl font-bold mb-2 group-hover:text-[#60A5FA] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#A78BFA] text-sm font-medium mb-4">{project.subtitle}</p>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 flex-1">
                    {project.summary}
                  </p>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tools.slice(0, 4).map((tool) => (
                      <Tag key={tool} variant="muted">{tool}</Tag>
                    ))}
                    {project.tools.length > 4 && (
                      <Tag variant="muted">+{project.tools.length - 4} more</Tag>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#60A5FA] hover:text-[#A78BFA] transition-colors duration-200 group/btn"
                  >
                    View Case Study
                    <ArrowUpRight
                      size={16}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200"
                    />
                  </button>
                </motion.article>
              </FadeInUp>
            );
          })}
        </div>

        {/* Future projects hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 glass rounded-2xl p-6 text-center border-dashed"
        >
          <p className="text-[#9CA3AF] text-sm">
            More projects and case studies being added as work progresses.{" "}
            <a
              href="https://www.linkedin.com/in/akash-ghosh-57a59b341"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#60A5FA] hover:underline"
            >
              Follow on LinkedIn
            </a>{" "}
            for updates.
          </p>
        </motion.div>
      </div>

      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
