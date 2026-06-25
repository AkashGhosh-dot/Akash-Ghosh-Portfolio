"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Bot, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/animations/FadeInUp";

const offerings = [
  {
    icon: Lightbulb,
    color: "#3B82F6",
    title: "Strategic Thinking",
    description: "Transform ambiguity into clear strategies, actionable roadmaps, and measurable business outcomes.",
  },
  {
    icon: BarChart3,
    color: "#7B72E1",
    title: "Data-Driven Decision Making",
    description: "Leverage data, research, and analytical frameworks to uncover insights and support confident decisions.",
  },
  {
    icon: Bot,
    color: "#A78BFA",
    title: "AI-Powered Business Analysis",
    description: "Utilize AI to accelerate research, streamline documentation, improve workflows, and identify opportunities for innovation.",
  },
  {
    icon: Users,
    color: "#60A5FA",
    title: "Stakeholder Alignment",
    description: "Bridge the gap between business needs, user expectations, and execution teams to drive successful outcomes.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "Deep-dive into business context, stakeholder needs, and the root problem",
  },
  {
    step: "02",
    title: "Analyse",
    description: "Apply data analysis and structured frameworks to surface insights and gaps",
  },
  {
    step: "03",
    title: "Translate",
    description: "Convert findings into clear requirements, process improvements, and actionable strategies",
  },
  {
    step: "04",
    title: "Deliver",
    description: "Ensure solutions achieve measurable business outcomes and stakeholder buy-in",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-[#0B0F19] relative">
      <div className="absolute inset-0 line-grid opacity-50" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div>
            <SectionHeading
              label="About Me"
              title="Bridging Strategy, Data & Execution"
              subtitle="I turn ambiguity into structured decisions — closing the gap between what stakeholders need and what teams actually deliver."
            />

            <FadeInUp delay={0.2} className="mt-8 space-y-5">
              <p className="text-[#9CA3AF] text-base leading-relaxed">
                I work where most organizational friction lives — the gap between strategy and execution. As a <span className="text-[#F9FAFB] font-medium">Business Analyst</span>, my focus is on making that gap smaller: surfacing root causes, aligning stakeholders around a shared understanding, and defining solutions that are actually buildable and measurable.
              </p>
              <p className="text-[#9CA3AF] text-base leading-relaxed">
                I combine <span className="text-[#60A5FA] font-medium">analytical depth</span> with strong communication instincts. I model data to expose what the numbers are really saying, structure requirements so delivery teams have a clear and defensible target, and track the KPIs that reflect genuine performance — not just activity. I also integrate <span className="text-[#F9FAFB] font-medium">AI tools heavily into my workflow</span> — using them to accelerate analysis, pressure-test assumptions, and surface patterns that would otherwise take far longer to uncover. The result is faster decisions, fewer revision cycles, and outcomes that hold up under scrutiny.
              </p>
              <p className="text-[#9CA3AF] text-base leading-relaxed">
                I adapt quickly across business environments because good analysis is fundamentally about people, problems, and logic. Give me a complex challenge — a broken process, a product decision, a strategic gap — and I&apos;ll break it down, find the leverage point, and deliver something that creates real, lasting value.
              </p>
            </FadeInUp>

            {/* Pull quote */}
            <FadeInUp delay={0.4} className="mt-8">
              <blockquote className="relative pl-5 border-l-2 border-[#3B82F6]">
                <p className="text-lg sm:text-xl font-semibold text-[#F9FAFB] leading-snug italic">
                  &ldquo;I don&apos;t just document what stakeholders ask for — I find the business problem behind the business problem.&rdquo;
                </p>
              </blockquote>
            </FadeInUp>
          </div>

          {/* Right — value props + process */}
          <div className="space-y-8">
            {/* What I Bring to a Team */}
            <FadeInUp delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-[#F9FAFB] font-semibold text-sm mb-5 tracking-wider uppercase">
                  What I Bring to a Team
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {offerings.map(({ icon: Icon, color, title, description }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="flex flex-col gap-2.5 p-4 rounded-xl hover:bg-white/[0.03] transition-colors duration-200"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                      >
                        <Icon size={15} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-[#F9FAFB] text-sm font-semibold leading-snug">{title}</p>
                        <p className="text-[#9CA3AF] text-xs leading-relaxed mt-0.5">{description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Process steps */}
            <FadeInUp delay={0.3}>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-[#F9FAFB] font-semibold text-sm mb-5 tracking-wider uppercase">
                  My Analytical Process
                </h3>
                <div className="space-y-5">
                  {processSteps.map(({ step, title, description }, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <span className="text-xs font-mono font-bold text-[#3B82F6] pt-0.5 w-6 shrink-0">
                        {step}
                      </span>
                      <div>
                        <p className="text-[#F9FAFB] text-sm font-semibold">{title}</p>
                        <p className="text-[#9CA3AF] text-xs leading-relaxed mt-0.5">{description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
