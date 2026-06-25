"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CalendarClock, CheckCircle } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/animations/FadeInUp";

const subjectOptions = [
  "Full-time BA Opportunity",
  "Consulting / Freelance Project",
  "Collaboration",
  "General Inquiry",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email me directly.");
      }
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#0B0F19] relative">
      <div className="absolute inset-0 line-grid opacity-40" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#3B82F6]/6 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Together"
          subtitle="Open to Business Analyst, Product Analyst, and Consulting opportunities globally. I respond within 24 hours."
          center
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <FadeInUp delay={0.1}>
            <div className="glass rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <CheckCircle size={48} className="text-[#10B981] mb-4" />
                  <h3 className="text-[#F9FAFB] font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-[#9CA3AF] text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-2">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#F9FAFB] placeholder:text-[#4B5563] text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9CA3AF] mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#F9FAFB] placeholder:text-[#4B5563] text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-white/[0.08] text-[#F9FAFB] text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition-all"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about the opportunity or project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#F9FAFB] placeholder:text-[#4B5563] text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-[#EF4444] text-xs">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7B72E1] text-white font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:scale-[1.01] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeInUp>

          {/* Contact info */}
          <FadeInUp delay={0.2} className="space-y-4">
            {/* Direct contact */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-[#F9FAFB] font-semibold text-sm mb-4 tracking-wider uppercase">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:akash9876ghosh@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                    <Mail size={16} className="text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Email</p>
                    <p className="text-sm text-[#F9FAFB] font-medium group-hover:text-[#60A5FA] transition-colors">
                      akash9876ghosh@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/akash-ghosh-57a59b341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                    <LinkedInIcon size={16} className="text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">LinkedIn</p>
                    <p className="text-sm text-[#F9FAFB] font-medium group-hover:text-[#60A5FA] transition-colors">
                      linkedin.com/in/akash-ghosh-57a59b341
                    </p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7B72E1]/10 border border-[#7B72E1]/20 flex items-center justify-center group-hover:bg-[#7B72E1]/20 transition-colors">
                    <GitHubIcon size={16} className="text-[#A78BFA]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">GitHub</p>
                    <p className="text-sm text-[#9CA3AF] italic">Link coming soon</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Calendly placeholder */}
            <div className="glass rounded-2xl p-6 border-dashed relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/3 to-[#7B72E1]/3" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarClock size={18} className="text-[#60A5FA]" />
                  <h3 className="text-[#F9FAFB] font-semibold text-sm">Schedule a Call</h3>
                </div>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Prefer a direct conversation? Calendar booking will be available here shortly.
                </p>
                <div className="px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-center">
                  <span className="text-xs text-[#9CA3AF]">Calendly integration — coming soon</span>
                </div>
              </div>
            </div>

            {/* Availability note */}
            <div className="glass rounded-2xl p-5 flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 animate-pulse shrink-0" />
              <p className="text-sm text-[#9CA3AF]">
                <span className="text-[#F9FAFB] font-medium">Currently available</span> for full-time BA, Product Analyst, and Consulting roles. Open to remote and global opportunities.
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
