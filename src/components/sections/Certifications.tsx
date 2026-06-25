"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import FadeInUp from "@/components/animations/FadeInUp";
import { certifications } from "@/data/certifications";

const issuerColors: Record<string, string> = {
  Google: "#3B82F6",
  "Code With Harry": "#7B72E1",
};

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-[#0B0F19] relative">
      <div className="absolute inset-0 line-grid opacity-40" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Certifications"
          title="Credentials & Learning"
          subtitle="Continuously sharpening my skills through structured learning programmes."
          center
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <FadeInUp key={cert.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-2xl p-8 h-full flex flex-col gradient-border"
              >
                {/* Icon + issuer */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${issuerColors[cert.issuer] ?? "#3B82F6"}20`,
                      border: `1px solid ${issuerColors[cert.issuer] ?? "#3B82F6"}30`,
                    }}
                  >
                    <Award
                      size={22}
                      style={{ color: issuerColors[cert.issuer] ?? "#3B82F6" }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#9CA3AF]">{cert.year}</span>
                </div>

                <h3 className="text-[#F9FAFB] font-bold text-base leading-snug mb-2">
                  {cert.name}
                </h3>
                <p
                  className="text-sm font-semibold mb-4"
                  style={{ color: issuerColors[cert.issuer] ?? "#3B82F6" }}
                >
                  {cert.issuer} · {cert.platform}
                </p>

                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 flex-1">
                  {cert.description}
                </p>

                {/* Skills covered */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <Tag key={skill} variant="muted">{skill}</Tag>
                  ))}
                </div>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-[#9CA3AF] hover:text-[#60A5FA] transition-colors duration-200"
                >
                  <ExternalLink size={12} />
                  Verify Certificate
                </a>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
