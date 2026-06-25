"use client";
import { Mail, ArrowUp } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/SocialIcons";
import { navLinks } from "@/data/navigation";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#0B0F19]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-[#F9FAFB] font-bold text-lg">Akash Ghosh</span>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs">
              Business Analyst · Product Thinker · Data-Driven Strategist
            </p>
            <p className="mt-2 text-xs text-[#3B82F6] font-medium">
              Open to global BA & Product Analyst opportunities
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#F9FAFB] font-semibold text-sm mb-4 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-[#9CA3AF] hover:text-[#60A5FA] text-sm transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#F9FAFB] font-semibold text-sm mb-4 tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/akash-ghosh-57a59b341"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#9CA3AF] hover:text-[#60A5FA] text-sm transition-colors group"
              >
                <LinkedInIcon size={16} className="group-hover:scale-110 transition-transform" />
                linkedin.com/in/akash-ghosh-57a59b341
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#9CA3AF] hover:text-[#60A5FA] text-sm transition-colors group"
              >
                <GitHubIcon size={16} className="group-hover:scale-110 transition-transform" />
                GitHub (coming soon)
              </a>
              <a
                href="mailto:akash9876ghosh@gmail.com"
                className="flex items-center gap-3 text-[#9CA3AF] hover:text-[#60A5FA] text-sm transition-colors group"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                akash9876ghosh@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-[#9CA3AF] text-xs text-center sm:text-left">
            © 2025 Akash Ghosh · Built with Next.js, Framer Motion & Three.js
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/akash-ghosh-57a59b341"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#60A5FA] hover:bg-white/[0.06] transition-all"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href="mailto:akash9876ghosh@gmail.com"
              className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#60A5FA] hover:bg-white/[0.06] transition-all"
            >
              <Mail size={16} />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.06] hover:bg-[#3B82F6]/20 text-[#9CA3AF] hover:text-[#60A5FA] transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
