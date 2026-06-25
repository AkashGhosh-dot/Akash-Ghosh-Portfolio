"use client";
import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/data/blog";
import type { ContentSection } from "@/types/blog";
import Tag from "@/components/ui/Tag";

const categoryVariant: Record<string, "blue" | "purple" | "green"> = {
  "Business Analysis": "blue",
  "Data Analytics": "purple",
  Requirements: "green",
};

function renderSection(section: ContentSection, idx: number) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          key={idx}
          className="text-2xl sm:text-3xl font-bold text-[#F9FAFB] mt-12 mb-4 tracking-tight"
        >
          {section.content}
        </h2>
      );

    case "subheading":
      return (
        <h3
          key={idx}
          className="text-lg font-semibold text-[#60A5FA] mt-8 mb-3"
        >
          {section.content}
        </h3>
      );

    case "paragraph":
      return (
        <p
          key={idx}
          className="text-[#9CA3AF] text-base sm:text-[1.05rem] leading-[1.85] mb-5"
        >
          {section.content}
        </p>
      );

    case "list":
      return (
        <ul key={idx} className="space-y-3 mb-6 mt-2">
          {section.items?.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[#9CA3AF] text-base leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-[0.6rem] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          key={idx}
          className="relative pl-5 border-l-2 border-[#3B82F6] my-8"
        >
          <p className="text-lg sm:text-xl font-semibold text-[#F9FAFB] leading-snug italic">
            &ldquo;{section.content}&rdquo;
          </p>
        </blockquote>
      );

    case "callout":
      return (
        <div
          key={idx}
          className="my-8 rounded-2xl p-5 border"
          style={{
            background: "rgba(59,130,246,0.06)",
            borderColor: "rgba(59,130,246,0.2)",
          }}
        >
          <p className="text-[#60A5FA] text-sm sm:text-base leading-relaxed font-medium">
            {section.content}
          </p>
        </div>
      );

    default:
      return null;
  }
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return (
    <main className="min-h-screen bg-[#0B0F19] pt-28 pb-24">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 line-grid opacity-25 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#60A5FA] transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            Back to Blog
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <Tag variant={categoryVariant[post.category] ?? "blue"}>{post.category}</Tag>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1] text-[#F9FAFB] mb-6">
            {post.title}
          </h1>

          <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">{post.excerpt}</p>

          {/* Meta row */}
          <div className="flex items-center gap-5 text-sm text-[#9CA3AF] pb-8 border-b border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#3B82F6]" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#3B82F6]" />
              {post.readTime}
            </span>
          </div>
        </motion.header>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-20"
        >
          {post.content.map((section, idx) => renderSection(section, idx))}
        </motion.article>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.06] mb-16" />

        {/* Related articles */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-[#F9FAFB] font-bold text-xl mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="glass rounded-2xl p-5 flex flex-col gap-3 card-hover group"
                >
                  <Tag variant={categoryVariant[relPost.category] ?? "blue"}>
                    {relPost.category}
                  </Tag>
                  <h3 className="text-[#F9FAFB] font-semibold text-sm leading-snug group-hover:text-[#60A5FA] transition-colors">
                    {relPost.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs text-[#9CA3AF]">
                      {new Date(relPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#60A5FA] group-hover:text-[#A78BFA] transition-colors">
                      Read
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to blog (bottom) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] text-[#9CA3AF] text-sm font-medium hover:border-[#3B82F6]/40 hover:text-[#60A5FA] transition-all duration-200"
          >
            <ArrowLeft size={14} />
            View All Posts
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
