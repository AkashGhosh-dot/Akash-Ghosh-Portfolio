"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative bg-[#0B0F19]">
      <div className="absolute inset-0 line-grid opacity-40" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Skills"
          title="Tools, Techniques & Expertise"
          subtitle="A full-spectrum skill set spanning business analysis, data science, and technology."
          center
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass rounded-2xl p-6 h-full card-hover"
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-2 h-5 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, ${category.accent}, ${category.accent}80)`,
                  }}
                />
                <h3 className="text-[#F9FAFB] font-semibold text-sm">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: catIndex * 0.06 + skillIndex * 0.04 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: `${category.accent}12`,
                      color: category.accent,
                      border: `1px solid ${category.accent}30`,
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-2xl p-6 text-center"
        >
          <p className="text-[#9CA3AF] text-sm">
            Continuously expanding expertise in{" "}
            <span className="text-[#60A5FA] font-medium">AI-augmented business analysis</span>,{" "}
            <span className="text-[#A78BFA] font-medium">product management fundamentals</span>, and{" "}
            <span className="text-[#60A5FA] font-medium">advanced data analytics</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
