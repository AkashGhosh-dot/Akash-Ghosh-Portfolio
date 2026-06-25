"use client";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import FadeInUp from "@/components/animations/FadeInUp";
import { blogPosts } from "@/data/blog";

const categoryVariant: Record<string, "blue" | "purple" | "green"> = {
  "Business Analysis": "blue",
  "Data Analytics": "purple",
  Requirements: "green",
};

export default function BlogPreview() {
  return (
    <section id="blog" className="section-padding bg-[#0B0F19] relative">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="section-container relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <SectionHeading
            label="Insights"
            title="Thoughts & Perspectives"
            subtitle="Business analysis thinking, data insights, and product strategy."
          />
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="/blog"
            className="shrink-0 flex items-center gap-2 text-sm font-semibold text-[#60A5FA] hover:text-[#A78BFA] transition-colors group"
          >
            View All Posts
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <FadeInUp key={post.slug} delay={i * 0.12}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-2xl p-6 h-full flex flex-col card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <Tag variant={categoryVariant[post.category] ?? "blue"}>
                    {post.category}
                  </Tag>
                  <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-[#F9FAFB] font-bold text-base leading-snug mb-3 flex-1">
                  {post.title}
                </h3>

                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <a
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-[#60A5FA] hover:text-[#A78BFA] transition-colors group/link"
                  >
                    Read
                    <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.article>
            </FadeInUp>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-sm font-medium text-[#9CA3AF] hover:border-[#3B82F6]/40 hover:text-[#60A5FA] transition-all duration-200"
          >
            View all articles
            <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
