"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  if (pathname.startsWith("/case-studies")) return null;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-3 items-center h-16 sm:h-18">

            {/* Left — empty balancing column */}
            <div className="flex items-center">
              {/* Mobile hamburger sits here on small screens */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Center — navigation links */}
            <nav className="hidden lg:flex items-center justify-center gap-1">
              {navLinks.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={cn(
                      "relative whitespace-nowrap px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive
                        ? "text-[#60A5FA]"
                        : "text-[#9CA3AF] hover:text-[#F9FAFB]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right — Resume button */}
            <div className="flex items-center justify-end">
              <a
                href="/resume/akash-ghosh-resume.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#7B72E1] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all duration-200"
              >
                <Download size={14} />
                Resume
              </a>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0B0F19]/95 backdrop-blur-xl pt-20"
          >
            <nav className="flex flex-col items-center justify-center gap-2 h-full pb-20">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                  onClick={() => scrollTo(href)}
                  className="w-full max-w-xs text-center py-4 text-xl font-semibold text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
                >
                  {label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                href="/resume/akash-ghosh-resume.pdf"
                download
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7B72E1] text-white font-semibold"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
