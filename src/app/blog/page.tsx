"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Tag from "@/components/ui/Tag";

const categoryVariant: Record<string, "blue" | "purple" | "green"> = {
  "Business Analysis": "blue",
  "Data Analytics": "purple",
  Requirements: "green",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] pt-28 pb-24">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Back to portfolio */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#60A5FA] transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#3B82F6] mb-4">
            Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#F9FAFB] mb-4">
            Thoughts &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #7B72E1 50%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Perspectives
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed">
            Business analysis thinking, data insights, and product strategy — written from the
            perspective of a practitioner, not a textbook.
          </p>
        </motion.div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 flex flex-col card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <Tag variant={categoryVariant[post.category] ?? "blue"}>{post.category}</Tag>
                <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-[#F9FAFB] font-bold text-base leading-snug mb-3 flex-1">
                {post.title}
              </h2>

              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">{post.excerpt}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <Calendar size={11} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-xs font-semibold text-[#60A5FA] hover:text-[#A78BFA] transition-colors group/link"
                >
                  Read
                  <ArrowRight
                    size={12}
                    className="group-hover/link:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
