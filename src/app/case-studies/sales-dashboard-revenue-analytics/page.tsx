"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Info,
  BarChart3, TrendingUp, Target, Code2, Package,
} from "lucide-react";

// ── TOC ───────────────────────────────────────────────────────────
const toc = [
  { id: "business-problem",  num: "01", title: "Business Problem"           },
  { id: "stakeholders",      num: "02", title: "Stakeholder Identification"  },
  { id: "req-gathering",     num: "03", title: "Requirement Gathering"       },
  { id: "as-is",             num: "04", title: "As-Is Process Analysis"      },
  { id: "root-cause",        num: "05", title: "Root Cause Analysis"         },
  { id: "gap-analysis",      num: "06", title: "Gap Analysis"                },
  { id: "brd",               num: "07", title: "BRD"                         },
  { id: "to-be",             num: "08", title: "To-Be Process Design"        },
  { id: "frs",               num: "09", title: "Functional & Non-Functional" },
  { id: "user-stories",      num: "10", title: "User Stories & AC"           },
  { id: "bpmn",              num: "11", title: "Process Flows & BPMN"        },
  { id: "data-analysis",     num: "12", title: "Data Analysis & Mapping"     },
  { id: "wireframes",        num: "13", title: "Wireframes & Prototypes"     },
  { id: "req-validation",    num: "14", title: "Requirement Validation"      },
  { id: "backlog",           num: "15", title: "Backlog & Prioritization"    },
  { id: "sprint-execution",  num: "16", title: "Agile Sprint Execution"      },
  { id: "dev-support",       num: "17", title: "Development Support"         },
  { id: "testing-support",   num: "18", title: "Testing Support"             },
  { id: "uat",               num: "19", title: "UAT"                         },
  { id: "go-live",           num: "20", title: "Deployment / Go-Live"        },
  { id: "training",          num: "21", title: "Training & Change Mgmt"      },
  { id: "pir",               num: "22", title: "Post-Implementation Review"  },
  { id: "impact",            num: "23", title: "Business Impact"             },
];

const BLUE  = "#3B82F6";
const LBLUE = "#60A5FA";

// ── Helpers ───────────────────────────────────────────────────────

function S({ id, num, title, sub, children }: {
  id: string; num: string; title: string; sub?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-20">
      <div className="flex items-start gap-3 mb-7">
        <span className="font-mono text-xs font-bold shrink-0 mt-1 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: BLUE }}>
          {num}
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F9FAFB] leading-tight">{title}</h2>
          {sub && <p className="text-[#9CA3AF] text-sm mt-1 leading-relaxed max-w-2xl">{sub}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function MC({ v, label, c = BLUE, note }: { v: string; label: string; c?: string; note?: string }) {
  return (
    <div className="glass rounded-xl p-5 text-center">
      <div className="text-3xl sm:text-4xl font-black leading-none mb-1" style={{ color: c }}>{v}</div>
      <div className="text-[#F9FAFB] text-sm font-semibold leading-snug">{label}</div>
      {note && <div className="text-[#6B7280] text-xs mt-1">{note}</div>}
    </div>
  );
}

function IB({ t = "i", children }: { t?: "i" | "w" | "s"; children: React.ReactNode }) {
  const cfg = {
    i: { bg: "rgba(59,130,246,0.07)",  bd: "rgba(59,130,246,0.2)",  ic: LBLUE,     el: <Info size={14} /> },
    w: { bg: "rgba(245,158,11,0.07)",  bd: "rgba(245,158,11,0.2)",  ic: "#F59E0B", el: <AlertTriangle size={14} /> },
    s: { bg: "rgba(16,185,129,0.07)",  bd: "rgba(16,185,129,0.2)",  ic: "#10B981", el: <CheckCircle2 size={14} /> },
  }[t];
  return (
    <div className="rounded-xl p-4 flex gap-3 text-sm leading-relaxed"
      style={{ background: cfg.bg, border: `1px solid ${cfg.bd}` }}>
      <span className="shrink-0 mt-0.5" style={{ color: cfg.ic }}>{cfg.el}</span>
      <div className="text-[#D1D5DB]">{children}</div>
    </div>
  );
}

function T({ hs, rows }: { hs: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }} className="border-b border-white/[0.07]">
            {hs.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-[#6B7280] font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors last:border-0">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-[#D1D5DB] align-top text-[13px]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CB({ code, lang = "SQL" }: { code: string; lang?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07]"
        style={{ background: "rgba(255,255,255,0.03)" }}>
        <Code2 size={12} className="text-[#4B5563]" />
        <span className="text-[10px] text-[#4B5563] font-mono uppercase tracking-widest">{lang}</span>
        <div className="ml-auto flex gap-1.5">
          {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        </div>
      </div>
      <pre className="p-5 text-[#67E8F9] text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre"
        style={{ background: "rgba(0,0,0,0.5)" }}>
        {code}
      </pre>
    </div>
  );
}

function Bdg({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    blue:   { bg: "rgba(59,130,246,0.1)",  text: "#60A5FA",  border: "rgba(59,130,246,0.25)"  },
    purple: { bg: "rgba(167,139,250,0.1)", text: "#A78BFA",  border: "rgba(167,139,250,0.25)" },
    green:  { bg: "rgba(16,185,129,0.1)",  text: "#34D399",  border: "rgba(16,185,129,0.25)"  },
    yellow: { bg: "rgba(245,158,11,0.1)",  text: "#FCD34D",  border: "rgba(245,158,11,0.25)"  },
    red:    { bg: "rgba(239,68,68,0.1)",   text: "#F87171",  border: "rgba(239,68,68,0.25)"   },
    orange: { bg: "rgba(249,115,22,0.1)",  text: "#FB923C",  border: "rgba(249,115,22,0.25)"  },
    gray:   { bg: "rgba(107,114,128,0.1)", text: "#9CA3AF",  border: "rgba(107,114,128,0.25)" },
    indigo: { bg: "rgba(99,102,241,0.1)",  text: "#818CF8",  border: "rgba(99,102,241,0.25)"  },
  };
  const s = map[color] ?? map.blue;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}>
      {children}
    </span>
  );
}

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>;
}

// Helper to avoid jsx-key errors when Bdg is used inside array literals
function bd(color: string, text: string): React.ReactNode {
  return <Bdg color={color}>{text}</Bdg>;
}

// ── Page ──────────────────────────────────────────────────────────

export default function SalesDashboardCaseStudy() {
  const [active, setActive] = useState("business-problem");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-15% 0px -78% 0px" }
    );
    toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#080C14] border-b border-white/[0.05]">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-[#3B82F6]/6 blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 relative z-10">
          <Link href="/#case-studies"
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F9FAFB] text-sm mb-8 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Bdg color="blue">Data Analytics</Bdg>
            <Bdg color="green">12 Weeks</Bdg>
            <Bdg color="blue">Business Analyst</Bdg>
            <Bdg color="indigo">Power BI · SQL · Excel</Bdg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F9FAFB] leading-tight mb-4">
            Sales Dashboard &<br />
            <span style={{ background: "linear-gradient(135deg,#3B82F6,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Revenue Analytics
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed mb-10">
            A mid-size Indian electronics accessories company was selling 6 products on Amazon, Flipkart, and
            their own website — but their most-marketed product wasn&apos;t selling, and their revenue crashed every
            January to March. No one knew why. This is the full BA journey from problem discovery to a live
            dashboard that gave the team clear, data-driven answers.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MC v="65%"  label="Revenue Drop — Jan to Mar"   c="#EF4444" note="Every year, no explanation" />
            <MC v="3×"   label="Marketing Spend on Premium"  c="#F59E0B" note="Lowest-selling product" />
            <MC v="+41%" label="Revenue Growth (Jan–Mar)"    c="#10B981" note="After dashboard launch" />
            <MC v="₹38L" label="Slow-Moving Inventory Found" c={BLUE}    note="Cleared with targeted offers" />
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">

          {/* TOC */}
          <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="text-[10px] text-[#374151] uppercase tracking-widest font-semibold mb-3 px-2">BA Lifecycle</p>
            <nav className="space-y-0.5">
              {toc.map(({ id, num, title }) => (
                <button key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-all duration-150 ${
                    active === id
                      ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "text-[#4B5563] hover:text-[#D1D5DB] hover:bg-white/[0.03]"
                  }`}>
                  <span className={`font-mono text-[10px] shrink-0 w-5 ${active === id ? "text-[#3B82F6]" : "text-[#374151]"}`}>{num}</span>
                  <span className="truncate">{title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">

            {/* ── 01 ── */}
            <S id="business-problem" num="01" title="Business Problem"
              sub="Two problems hiding in plain sight — one product nobody was buying, and one season that killed revenue every year.">
              <p className="text-[#9CA3AF] leading-relaxed">
                An Indian product-based company selling electronics accessories — phone cases (budget ₹299,
                mid-range ₹699, premium ₹1,499), earbuds (₹899), chargers (₹599), and screen protectors (₹199) —
                across Amazon, Flipkart, and their own website was generating around{" "}
                <span className="text-[#F9FAFB] font-medium">₹9.2 Cr annual revenue</span>.
                On paper, the business was doing okay. But underneath, two specific problems were quietly eating
                into growth.
              </p>
              <Glass>
                <div className="space-y-4">
                  <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <p className="text-[#F87171] text-xs font-bold uppercase tracking-wider mb-1">Problem 1 — Wrong product getting all the money</p>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      The premium phone case (₹1,499) was receiving <strong className="text-white">3× more marketing budget</strong> than
                      any other product — the Marketing Manager kept increasing ads assuming more visibility would
                      fix the low sales. It didn&apos;t. The premium case consistently ranked last in units sold
                      across all channels. Meanwhile, the budget case (₹299) was the top seller with almost no
                      ad spend. Nobody had looked at this comparison side-by-side.
                    </p>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <p className="text-[#FCD34D] text-xs font-bold uppercase tracking-wider mb-1">Problem 2 — Revenue dying every January to March</p>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      Every year, sales would fall by <strong className="text-white">65%</strong> between January and March compared to
                      the festive season (October–November — Diwali, Christmas, New Year). The team would panic,
                      run heavy discounts, overspend on ads, and still struggle. No historical data analysis had
                      ever been done to understand the pattern, predict it, or plan inventory accordingly.
                    </p>
                  </div>
                </div>
              </Glass>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="65%"   label="Revenue drop Jan–Mar"            c="#EF4444" note="vs. Oct–Nov peak" />
                <MC v="Last"  label="Premium product rank in sales"   c="#F59E0B" note="Despite 3× ad spend" />
                <MC v="3"     label="Platforms, no connected data"    c="#9CA3AF" note="Amazon, Flipkart, Website" />
                <MC v="8–10h" label="Hours to build monthly report"   c="#EF4444" note="All manual, in Excel" />
              </div>
              <T hs={["What Was Wrong", "The Real Impact"]} rows={[
                ["Premium phone case (₹1,499) getting 3× marketing budget but selling the least",                "₹38 Lakhs worth of premium inventory piling up unsold; marketing money being wasted month after month"],
                ["Revenue drops 65% every January–March but nobody knew why or how to plan for it",              "Team runs panic discounts in January cutting margins; orders wrong inventory for the slow season every year"],
                ["Sales data from Amazon, Flipkart, and the website was never combined in real-time",             "All decisions were made on 30-day-old data; problems were discovered too late to fix them"],
                ["No product-level view of returns — some products had very high return rates",                   "One product was discovered to have a 34% return rate — meaning 1 in 3 units came back. Nobody knew."],
                ["Marketing Manager had no way to see which ad campaign led to actual sales",                     "Ad budgets allocated based on gut feel, not actual revenue data from each channel"],
              ]} />
            </S>

            {/* ── 02 ── */}
            <S id="stakeholders" num="02" title="Stakeholder Identification"
              sub="Identifying every person who was affected by the problem and whose buy-in was needed for the solution to work.">
              <p className="text-[#9CA3AF] leading-relaxed">
                Before gathering requirements, I mapped out everyone who had a stake in this project — either
                because they owned data, made decisions based on sales numbers, or would be a daily user of
                the new dashboard. Understanding what each person cared about helped me ask the right questions
                and design a solution that everyone would actually use.
              </p>
              <T hs={["Designation", "What They Wanted to Know", "Why They Matter", "Power", "Interest"]} rows={[
                ["Sales Manager",       "How much revenue are we making? Which product and channel is performing?",          "Final approver; would use dashboard daily to track performance",             bd("red","High"),    bd("red","High")],
                ["Marketing Manager",  "Which ads are actually driving sales? Where should I put the budget?",              "Controlled the marketing spend causing the premium product waste",           bd("yellow","Med"),  bd("red","High")],
                ["Product Manager",    "Why is the premium product not selling? Should we change the price?",               "Owned the product catalogue and pricing decisions",                          bd("yellow","Med"),  bd("red","High")],
                ["Finance Manager",    "What is our actual monthly revenue? What are we forecasting for next quarter?",      "Needed accurate revenue data; approved the project budget",                  bd("red","High"),    bd("yellow","Med")],
                ["Operations Manager", "How much inventory should we order? Which products need restocking?",               "Responsible for stock planning — currently ordering wrong quantities each season", bd("yellow","Med"), bd("yellow","Med")],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Power / Interest Grid</h3>
                <p className="text-[#9CA3AF] text-xs mb-4 leading-relaxed">
                  This grid helped me decide how much time to spend with each person and how to communicate
                  with them. High power + High interest = involve them in every decision. High power + Low
                  interest = keep them updated regularly but don&apos;t overwhelm them.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Manage Closely — involve in all decisions", bg: "rgba(239,68,68,0.08)",   bd: "rgba(239,68,68,0.2)",   names: ["Sales Manager — final sign-off authority", "Finance Manager — budget and revenue owner"] },
                    { label: "Keep Informed — update regularly",          bg: "rgba(245,158,11,0.08)",  bd: "rgba(245,158,11,0.2)",  names: ["Marketing Manager — data owner for ad spend", "Product Manager — pricing decisions"] },
                    { label: "Keep Satisfied — check in on milestones",   bg: "rgba(59,130,246,0.08)",  bd: "rgba(59,130,246,0.2)",  names: ["Operations Manager — inventory planning user"] },
                    { label: "Monitor — minimal engagement needed",       bg: "rgba(107,114,128,0.08)", bd: "rgba(107,114,128,0.2)", names: ["Senior Leadership — final dashboard recipient"] },
                  ].map(({ label, bg, bd, names }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: bg, border: `1px solid ${bd}` }}>
                      <p className="font-semibold text-[#F9FAFB] mb-2 text-[11px]">{label}</p>
                      {names.map(n => <p key={n} className="text-[#9CA3AF] text-[11px] mb-0.5">· {n}</p>)}
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* ── 03 ── */}
            <S id="req-gathering" num="03" title="Requirement Gathering"
              sub="Finding out exactly what the business needs — using different techniques because different people hold different types of information.">
              <p className="text-[#9CA3AF] leading-relaxed">
                Requirement gathering is about understanding the problem deeply before jumping to a solution.
                I used multiple techniques because interviews alone don&apos;t give the full picture — sometimes
                you need to sit and watch how people actually work, or look at the raw data yourself.
              </p>
              <T hs={["Technique Used", "How I Did It", "What I Found"]} rows={[
                ["1:1 Interviews",           "Sat with each of the 5 stakeholders separately for 30–45 minutes and asked structured questions about what they needed, what was frustrating them, and what success would look like",                        "Each person had a different definition of 'sales performance'. Marketing was looking at orders; Finance was looking at revenue after returns; Sales was looking at units sold. All different."],
                ["Process Observation",      "Sat with the Sales Manager for one full day and watched them build the monthly report from scratch — from downloading files to sending the final Excel",                                                       "The report took 8 hours and 40 minutes. First 5 hours downloading and copy-pasting data. Next 3 hours formatting. The report covered last month — not even the current week."],
                ["Document Analysis",        "Reviewed the last 6 months of Amazon reports, Flipkart reports, website analytics exports, and the master Excel file the team used",                                                                          "Found that the premium phone case had a 6.2% conversion rate (only 6 out of every 100 people who saw it, bought it). The budget case had 27%. This was the first time this comparison had been made."],
                ["Workshop (Group Session)", "Ran a 2-hour session with Sales Manager, Marketing Manager, and Product Manager together to align on what success looks like and what the dashboard must show",                                                "Discovered they had never agreed on what counts as a 'sale' — some counted orders placed, some counted orders delivered. This needed to be fixed before any dashboard was built."],
                ["Survey",                   "Sent a short 8-question survey to the broader sales team (7 people) to understand what they needed on a day-to-day basis",                                                                                    "72% said they needed to see channel-wise sales in real time. 65% said they wasted time downloading individual reports instead of doing actual sales work."],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Sample Interview Questions — Sales Manager</h3>
                <div className="space-y-2">
                  {[
                    "Walk me through how you figure out what the total sales number is for this month right now.",
                    "When a product is underperforming, how do you currently find out? And how long does it take?",
                    "Which question do you get asked most often that you cannot answer quickly with the current data?",
                    "What does a good month look like vs. a bad month — in numbers, not just feeling?",
                    "If you had one screen you could check every morning, what are the 3 numbers you would want on it?",
                  ].map((q, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: BLUE }}>Q{i + 1}</span>
                      <p className="text-[#D1D5DB] text-sm leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </Glass>
              <IB t="w">
                <strong>Key conflict uncovered:</strong> The Marketing Manager was running campaigns and measuring
                success by how many people clicked the ad. The Sales Manager measured success by how many orders
                were placed. The Finance Manager measured success by revenue after returns and refunds. These
                three numbers were all different — and the company had never realised they were measuring
                &ldquo;sales&rdquo; in three different ways. Aligning on one definition was the first major
                outcome of the requirement gathering phase.
              </IB>
            </S>

            {/* ── 04 ── */}
            <S id="as-is" num="04" title="As-Is Process Analysis"
              sub="Documenting exactly how things work right now — before suggesting any changes. You cannot fix what you haven't fully understood.">
              <p className="text-[#9CA3AF] leading-relaxed">
                The &ldquo;As-Is&rdquo; process is the current-state process — step by step, how does the team
                currently get from raw sales data to a business decision? I mapped this by watching the team
                work and asking them to describe every step. What I found was a process held together entirely
                by manual effort, with problems at almost every step.
              </p>
              <T hs={["Step", "What Happens", "Who Does It", "The Problem"]} rows={[
                ["Step 1", "At the start of each month, Amazon Seller Central report is downloaded as an Excel file",               "Sales Manager / Team Member", "Done once a month — so data is always 30 days old. No one checks mid-month."],
                ["Step 2", "Flipkart Seller Hub report is downloaded separately as another Excel file",                             "Sales Manager",               "Different column names than Amazon. Needs manual renaming every time before combining."],
                ["Step 3", "Website sales data exported from the e-commerce backend (Shopify)",                                    "Operations Team",             "Nobody has clear ownership. Sometimes exported on Day 2 of the month, sometimes Day 5."],
                ["Step 4", "All three files are manually copied and pasted into one master Excel sheet",                           "Sales Manager",               "Takes 2–3 hours. Human errors like missed rows, wrong columns, or duplicate entries happen regularly."],
                ["Step 5", "Excel pivot tables are manually created to summarise product-wise and channel-wise numbers",            "Sales Manager",               "Takes another 2–3 hours. If a mistake was made in Step 4, the summaries are wrong."],
                ["Step 6", "A PowerPoint report is built from the pivot tables and emailed to leadership",                         "Sales Manager",               "The report arrives on Day 7–10 of the new month. It covers last month. Decisions are made on data that is already old."],
                ["Step 7", "Marketing Manager adjusts ad spend based on the report",                                               "Marketing Manager",           "By the time the report arrives, 1/3 of the new month is already over. Ad changes are too late."],
              ]} />
              <IB t="w">
                <strong>Key observation:</strong> During the shadowing session, I timed the full monthly
                reporting process. Total time: 8 hours and 40 minutes — across 2 days. For a process that
                only produces last month&apos;s numbers. The Sales Manager said: &ldquo;I spend so much time
                building the report that I barely have time to act on it.&rdquo;
              </IB>
            </S>

            {/* ── 05 ── */}
            <S id="root-cause" num="05" title="Root Cause Analysis"
              sub="Asking 'why' five times to find the real cause — not just the surface symptom. The fix must address the root, not the result.">
              <p className="text-[#9CA3AF] leading-relaxed">
                Root Cause Analysis (RCA) is a technique where instead of fixing the first problem you see, you
                keep asking &ldquo;but why?&rdquo; until you find the actual underlying cause. I applied the
                &ldquo;5 Whys&rdquo; method to both main problems separately.
              </p>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-2 uppercase tracking-wider">5 Whys — Problem 1: Why is the premium phone case (₹1,499) not selling?</h3>
                <div className="space-y-2 mt-5">
                  {[
                    { why: "Why 1", q: "Why is the premium phone case not selling despite heavy marketing?",                  a: "Customers are landing on the product page but not buying it — the conversion rate is only 6.2%, compared to 27% for the budget case." },
                    { why: "Why 2", q: "Why is the conversion rate so low for the premium case?",                             a: "Customer reviews show they feel ₹1,499 is too expensive for an Indian brand. They compare it to global brands like Spigen (which is well-known for premium cases) and choose the global brand instead." },
                    { why: "Why 3", q: "Why is the product priced at ₹1,499 if it sits in the same range as trusted global brands?", a: "The Product Manager priced it based on the production cost plus desired margin — not based on what customers are actually willing to pay for a domestic brand at that quality level." },
                    { why: "Why 4", q: "Why was customer willingness to pay not researched before launching at ₹1,499?",     a: "No customer survey or pricing research was done. The pricing decision was made internally, based on assumed margins." },
                    { why: "Why 5", q: "Why was no pricing research done before launch?",                                     a: "The team had no data analysis process in place. Product decisions — including pricing — were based on gut feel and competitor observation, not actual data about customer behaviour." },
                  ].map(({ why, q, a }, i, arr) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0 pt-0.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", color: BLUE }}>
                          {i + 1}
                        </div>
                        {i < arr.length - 1 && <div className="w-px flex-1 my-1 min-h-[16px]" style={{ background: "rgba(59,130,246,0.15)" }} />}
                      </div>
                      <div className="pb-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: BLUE }}>{why}</p>
                        <p className="text-[#F9FAFB] text-sm font-medium mb-0.5">{q}</p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{a}</p>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-4" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <p className="text-[#10B981] text-sm font-bold mb-1">Root Cause Found</p>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      The real problem was not the product, and not the marketing. It was that the company
                      was making product and pricing decisions without any customer data. The premium case at
                      ₹1,499 was launched into a price segment where customers trusted global brands more.
                      The fix was not more ads — it was repricing the product to ₹999 (a sweet spot where
                      data showed strong buying intent) and stopping the marketing waste.
                    </p>
                  </div>
                </div>
              </Glass>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">5 Whys — Problem 2: Why does revenue crash every January to March?</h3>
                <div className="space-y-2">
                  {[
                    { why: "Why 1", q: "Why does revenue fall 65% between January and March?",              a: "October–November is the festive season in India (Diwali, New Year gifting). People buy electronics and accessories as gifts. January–March is post-festive — no major buying occasion." },
                    { why: "Why 2", q: "Why has this not been planned for every year?",                     a: "The team knows the festive season is big, but they have never looked at the historical monthly data to calculate exactly how big the drop is and for how long." },
                    { why: "Why 3", q: "Why hasn't historical data been analysed to plan for the slow season?", a: "All historical data was sitting in separate Excel files across 3 channels. No one had ever combined it to see a 12-month or 24-month trend." },
                    { why: "Why 4", q: "Why has no one combined the data to spot the seasonal pattern?",    a: "Combining the data takes 8+ hours every month. Nobody had the time to do it just for historical analysis on top of the regular reporting work." },
                    { why: "Why 5", q: "Why is the reporting process so manual and time-consuming?",        a: "There is no connected data system. Every data source requires a separate manual download and copy-paste. No automation exists." },
                  ].map(({ why, q, a }, i, arr) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0 pt-0.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.35)", color: "#A78BFA" }}>
                          {i + 1}
                        </div>
                        {i < arr.length - 1 && <div className="w-px flex-1 my-1 min-h-[16px]" style={{ background: "rgba(167,139,250,0.15)" }} />}
                      </div>
                      <div className="pb-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5 text-[#A78BFA]">{why}</p>
                        <p className="text-[#F9FAFB] text-sm font-medium mb-0.5">{q}</p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
              <T hs={["Category", "Root Causes Found"]} rows={[
                ["People",     "Decisions made by gut feel — no habit of looking at data before deciding on price, inventory, or marketing spend"],
                ["Process",    "No monthly or weekly review of sales data across channels; no seasonal planning process; reporting done too infrequently"],
                ["Technology", "No connected data system; three platforms with no integration; all analysis done manually in Excel"],
                ["Data",       "No historical trend analysis ever done; no product-level return rate tracking; no channel-level profitability view"],
              ]} />
            </S>

            {/* ── 06 ── */}
            <S id="gap-analysis" num="06" title="Gap Analysis"
              sub="A gap analysis compares 'what we have now' with 'what we need' — making it clear what needs to be built.">
              <p className="text-[#9CA3AF] leading-relaxed">
                After the As-Is analysis and Root Cause Analysis, I documented every capability the business
                currently lacks compared to what it needs to make data-driven decisions. Each gap was rated
                by how critical it is to fix.
              </p>
              <T hs={["What the Business Needs", "What Exists Today", "The Gap", "Priority"]} rows={[
                ["A single place to see all sales from Amazon, Flipkart, and website together",   "Three separate reports downloaded manually from three different platforms",       "No connected system; data combined only once a month, manually",             bd("red","Critical")],
                ["Product performance comparison — which product earns the most vs. costs the most to market", "No comparison exists; marketing and sales tracked in separate sheets",           "Marketing spend and sales revenue never looked at side-by-side",             bd("red","Critical")],
                ["Monthly and seasonal sales trend (which months are slow, which are fast)",      "Possible from historical data but nobody has had time to do the analysis",      "24-month trend never visualised; seasonal planning done by feel",             bd("red","Critical")],
                ["Product return rate by channel",                                               "Returns tracked at platform level but never broken down by product",             "High return rate products (like the 34%-return product) go unnoticed",       bd("red","Critical")],
                ["Which marketing channel (Amazon Ads, Flipkart Ads, Google) drives actual revenue", "Ad spend known; revenue by channel known separately; never connected",         "Marketing Manager cannot see which ₹1 of ad spend generates the most sales", bd("yellow","High")],
                ["Automated daily/weekly reports instead of 8-hour monthly manual build",         "Fully manual; one person spends 8–10 hours every month",                         "No automation; high effort, outdated output",                                bd("yellow","High")],
                ["Inventory planning based on seasonal data — order the right stock for Jan–Mar", "Ordering based on last month's numbers, not seasonal history",                  "Over-ordering for the slow season, under-ordering for festive season",        bd("orange","Medium")],
              ]} />
            </S>

            {/* ── 07 ── */}
            <S id="brd" num="07" title="Business Requirements Document (BRD)"
              sub="The BRD is the official document that captures everything the new system must do — in business language, not technical language. It is the agreement between the BA and the stakeholders before any development begins.">
              <T hs={["ID", "Must / Should / Could", "What the System Must Do", "Which Problem It Solves", "How We'll Know It's Done"]} rows={[
                ["BR-001", bd("red","Must"),    "Show combined sales from Amazon, Flipkart, and the website in one single dashboard view",                           "Gap: No single view",            "Dashboard shows one total revenue number that matches the sum of all 3 platforms"],
                ["BR-002", bd("red","Must"),    "Show each product's total sales, total units sold, and total marketing spend side-by-side for easy comparison",    "Problem 1: Premium product waste","All 6 products visible in one table with sales and spend columns"],
                ["BR-003", bd("red","Must"),    "Show monthly sales for the last 24 months as a chart so seasonal patterns are clearly visible",                    "Problem 2: Jan–Mar crash",       "A month-by-month chart covering 2 full years is visible and accurate"],
                ["BR-004", bd("red","Must"),    "Show return rate for each product — what percentage of orders are being returned",                                  "Gap: High return rate hidden",   "Return % visible per product; sorted from highest to lowest return rate"],
                ["BR-005", bd("red","Must"),    "Data should update automatically every day — no manual downloading or copy-pasting required",                       "AS-IS: 8-hour manual process",   "Sales Manager confirms they have not manually downloaded any file for 2 weeks"],
                ["BR-006", bd("yellow","Should"),"Show which sales channel (Amazon / Flipkart / Website) generates the most revenue after returns and refunds",      "Gap: Channel profitability",     "Revenue shown separately for each channel with returns deducted"],
                ["BR-007", bd("yellow","Should"),"Automatically send a weekly summary report by email every Monday morning to Sales Manager and Finance Manager",   "AS-IS: Manual PowerPoint",       "Email arrives automatically on Monday; no manual action needed"],
                ["BR-008", bd("orange","Could"), "Show an inventory forecast for the next 3 months based on seasonal sales history",                                 "Gap: Wrong inventory ordering",  "Forecast numbers are within 15% of actual sales in the following month"],
              ]} />
              <IB t="s">
                The BRD was reviewed in a formal meeting with the Sales Manager and Finance Manager at the end of
                Week 4. All 8 requirements were agreed and signed off before any development work began. One
                requirement (BR-005 — daily refresh) was changed from &ldquo;real-time&rdquo; to &ldquo;daily&rdquo;
                after the Operations team confirmed real-time was technically complex and daily was sufficient for
                their decision-making needs.
              </IB>
            </S>

            {/* ── 08 ── */}
            <S id="to-be" num="08" title="To-Be Process Design"
              sub="The To-Be process is the future-state design — how the same work will happen after the new system is in place. Every manual step should either be automated or eliminated.">
              <p className="text-[#9CA3AF] leading-relaxed">
                The goal of the To-Be design was simple: the Sales Manager should be able to open one dashboard
                each morning and see everything they need to make decisions — without downloading a single file,
                copy-pasting anything, or spending hours in Excel.
              </p>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">New Process — How It Works</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { lane: "Data Sources",        color: BLUE,     steps: ["Amazon (daily auto-sync)", "Flipkart (daily auto-sync)", "Own website / Shopify (daily auto-sync)", "Ad platforms (Google, Meta)"] },
                    { lane: "Automated Data Layer", color: "#7B72E1",steps: ["All 3 sources connect to a central database", "Data cleaned and standardised automatically", "Returns and refunds calculated", "Refreshes every night at 12am"] },
                    { lane: "Power BI Dashboard",  color: "#A78BFA", steps: ["Pulls from the central database", "Calculates all KPIs (revenue, units, returns, margin)", "Updates every morning with last night's data", "4 views available to different teams"] },
                    { lane: "Teams — What They See",color: "#10B981", steps: ["Sales Manager: overall revenue + product performance", "Marketing Manager: channel-wise sales vs. ad spend", "Finance Manager: auto-email every Monday", "Operations Manager: seasonal trend + inventory forecast"] },
                  ].map(({ lane, color, steps }) => (
                    <div key={lane} className="rounded-xl overflow-hidden border border-white/[0.07]">
                      <div className="px-4 py-2 flex items-center gap-2" style={{ background: `${color}15`, borderBottom: `1px solid ${color}25` }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <span className="font-semibold text-[#F9FAFB] text-[11px] uppercase tracking-wider">{lane}</span>
                      </div>
                      <div className="p-3 flex flex-wrap gap-2">
                        {steps.map((step, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="px-2.5 py-1.5 rounded-lg text-[11px] text-[#D1D5DB]"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                              {step}
                            </span>
                            {i < steps.length - 1 && <ArrowRight size={9} className="text-[#374151] shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
              <T hs={["Old Way (AS-IS)", "New Way (TO-BE)", "Improvement"]} rows={[
                ["Download Amazon report manually on Day 1 of every month",                          "Amazon data syncs automatically every night",                             "Zero manual effort; data is always current"],
                ["Copy-paste from 3 different Excel files into one master sheet (3 hrs)",            "All 3 sources are already combined in the central database",              "3 hours of work eliminated completely"],
                ["Build pivot tables in Excel to see product-wise numbers (2 hrs)",                  "Product comparison table is always ready in the dashboard",              "Visible instantly; no Excel needed"],
                ["Build a PowerPoint report and email it — arrives on Day 7–10 (8–10 hrs total)",   "Automated email sent every Monday morning; no manual action needed",     "8–10 hours of work reduced to zero"],
                ["Marketing Manager adjusts ad spend based on last month's data",                   "Marketing Manager can check yesterday's performance and adjust today",   "Decisions based on recent data, not 30-day-old data"],
              ]} />
            </S>

            {/* ── 09 ── */}
            <S id="frs" num="09" title="Functional & Non-Functional Requirements"
              sub="Functional requirements describe what the system must do. Non-functional requirements describe how well it must do it — speed, security, reliability.">
              <T hs={["ID", "What the System Must Do (Functional)", "BR It Comes From", "Priority"]} rows={[
                ["FR-001", "Connect to Amazon Seller Central API and automatically download new orders and returns every night",                                         "BR-001", bd("red","Must")],
                ["FR-002", "Connect to Flipkart Seller Hub API and automatically download new orders and returns every night",                                          "BR-001", bd("red","Must")],
                ["FR-003", "Connect to the website (Shopify) and automatically pull new orders and returns every night",                                                "BR-001", bd("red","Must")],
                ["FR-004", "Show a product performance table: product name, units sold, total revenue, total ad spend, and revenue earned per ₹1 of ad spent",         "BR-002", bd("red","Must")],
                ["FR-005", "Show a 24-month sales trend chart — bar chart showing total monthly revenue for the last 2 years",                                         "BR-003", bd("red","Must")],
                ["FR-006", "Calculate and display the return rate (%) for each product — i.e., what % of orders were returned",                                        "BR-004", bd("red","Must")],
                ["FR-007", "Show revenue broken down by channel: Amazon total, Flipkart total, Website total — with returns already deducted",                         "BR-006", bd("yellow","Should")],
                ["FR-008", "Automatically send a weekly email summary every Monday at 8am to the Sales Manager and Finance Manager",                                   "BR-007", bd("yellow","Should")],
                ["FR-009", "Show a 3-month sales forecast based on the same months from the previous 2 years",                                                        "BR-008", bd("orange","Could")],
                ["FR-010", "Allow each user role (Sales, Marketing, Finance, Operations) to see only their relevant dashboard view",                                   "BR-001", bd("red","Must")],
              ]} />
              <T hs={["ID", "How the System Must Behave (Non-Functional)", "How We Measure It", "Priority"]} rows={[
                ["NFR-001", "Dashboard must load within 3 seconds on a normal internet connection",                          "Tested by opening the dashboard 10 times and measuring load time",   bd("red","Must")],
                ["NFR-002", "Daily data refresh must complete by 6am so morning data is ready when the team starts work",   "Check that data is updated before 6am for 5 consecutive working days",bd("red","Must")],
                ["NFR-003", "Only logged-in employees can access the dashboard — no public access",                          "Attempt to open dashboard without login; should show login screen",   bd("red","Must")],
                ["NFR-004", "Revenue numbers must match the source platform numbers within ±1% (accounting for timing)",    "Compare dashboard totals with platform exports for the same date",    bd("red","Must")],
                ["NFR-005", "Dashboard must work properly on mobile phones (for the Sales Manager who travels frequently)", "Open dashboard on an Android phone and iPhone; all views must load",  bd("yellow","Should")],
              ]} />
            </S>

            {/* ── 10 ── */}
            <S id="user-stories" num="10" title="User Stories & Acceptance Criteria"
              sub="A user story describes a feature from the user's point of view — what they want, and why. Acceptance criteria define exactly when we can say the story is 'done'.">
              <p className="text-[#9CA3AF] leading-relaxed">
                User stories follow this format: <span className="text-[#F9FAFB] font-medium">&ldquo;As a [role], I want [feature] so that [reason].&rdquo;</span> They
                help the development team understand who they are building for and why — not just what to build.
              </p>
              <div className="space-y-5">
                {[
                  {
                    epic: "Epic 1 — Product Performance", color: BLUE,
                    stories: [
                      { id: "US-001", pts: 8,  role: "Sales Manager",      story: "I want to see all 6 products side-by-side with their sales, units sold, and marketing spend so that I can immediately see which products are worth investing in and which are not.", priority: "Must" },
                      { id: "US-002", pts: 5,  role: "Product Manager",    story: "I want to see the conversion rate for each product (how many people who saw it actually bought it) so that I can identify if a product has a pricing or messaging problem.", priority: "Must" },
                    ],
                  },
                  {
                    epic: "Epic 2 — Seasonal & Revenue Trends", color: "#A78BFA",
                    stories: [
                      { id: "US-010", pts: 8,  role: "Operations Manager", story: "I want to see a chart of monthly sales for the past 2 years so that I can plan how much inventory to order before the slow season (January–March) and avoid overstocking.", priority: "Must" },
                      { id: "US-011", pts: 5,  role: "Finance Manager",    story: "I want to see a 3-month sales forecast based on historical data so that I can plan the budget for the upcoming quarter without relying on guesswork.", priority: "Should" },
                    ],
                  },
                  {
                    epic: "Epic 3 — Marketing & Channel Performance", color: "#10B981",
                    stories: [
                      { id: "US-020", pts: 5,  role: "Marketing Manager",  story: "I want to see how much revenue each sales channel (Amazon, Flipkart, Website) generates vs. how much ad spend goes into each, so that I can move budget to the most profitable channel.", priority: "Should" },
                      { id: "US-021", pts: 3,  role: "Finance Manager",    story: "I want to automatically receive a summary report every Monday morning by email so that I do not have to ask the Sales Manager to send me numbers manually.", priority: "Should" },
                    ],
                  },
                ].map(({ epic, color, stories }) => (
                  <Glass key={epic}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                      <h3 className="text-[#F9FAFB] text-sm font-semibold">{epic}</h3>
                    </div>
                    <div className="space-y-3">
                      {stories.map(({ id, pts, role, story, priority }) => (
                        <div key={id} className="rounded-xl p-4 bg-white/[0.02] border border-white/[0.05]">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Bdg color="gray">{id}</Bdg>
                            <Bdg color="blue">{role}</Bdg>
                            <Bdg color={priority === "Must" ? "red" : "yellow"}>{priority}</Bdg>
                            <span className="ml-auto text-[11px] font-mono font-semibold" style={{ color }}>{pts} pts</span>
                          </div>
                          <p className="text-[#9CA3AF] text-xs leading-relaxed">
                            <span className="text-[#F9FAFB] font-medium">As a {role}</span>, {story}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Glass>
                ))}
              </div>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Acceptance Criteria — US-001 (Product Performance View)</h3>
                <p className="text-[#9CA3AF] text-xs mb-4 leading-relaxed">
                  Acceptance criteria are written in Given / When / Then format. They define the exact
                  conditions that must be true for us to say a user story has been completed successfully.
                </p>
                <div className="space-y-2">
                  {[
                    { g: "The dashboard has loaded with this month's data",                                              w: "The Sales Manager opens the Product Performance view",                                               t: "A table is visible showing all 6 products with columns for: units sold, total revenue (₹), total ad spend (₹), and revenue earned per ₹1 of ad spend — sorted from highest to lowest ROI" },
                    { g: "All 6 products have sales data for the current month",                                         w: "The Sales Manager clicks on the premium phone case row",                                             t: "A detailed breakdown opens showing: channel-wise sales (Amazon / Flipkart / Website), return rate, month-over-month change, and a comparison to the previous month" },
                    { g: "The premium phone case has sold 0 units on the website this month",                            w: "The Sales Manager views the product table",                                                          t: "The premium phone case row is highlighted in amber (as a low-performer alert) and shows 0 units next to the Website channel column" },
                  ].map(({ g, w, t }, i) => (
                    <div key={i} className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.05] text-xs space-y-1">
                      <p className="text-[#D1D5DB]"><span className="font-bold" style={{ color: BLUE }}>Given</span> {g}</p>
                      <p className="text-[#D1D5DB]"><span className="font-bold text-[#F59E0B]">When</span> {w}</p>
                      <p className="text-[#D1D5DB]"><span className="font-bold text-[#10B981]">Then</span> {t}</p>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* ── 11 ── */}
            <S id="bpmn" num="11" title="Process Flows & BPMN"
              sub="BPMN (Business Process Model and Notation) is a standard way to draw process flow diagrams — like a flowchart but with specific shapes and rules that every BA and developer understands the same way.">
              <p className="text-[#9CA3AF] leading-relaxed">
                I created two BPMN diagrams: one showing the current (AS-IS) process and one showing the
                future (TO-BE) process. These diagrams were used to clearly show the team what was changing
                and why — making it easier to get buy-in from people who were used to the old process.
              </p>
              <T hs={["BPMN Shape", "What It Means", "Where I Used It"]} rows={[
                ["Circle (Start Event)",         "Where the process begins",                                                "AS-IS: 'First of the month arrives'; TO-BE: 'Midnight data refresh triggers automatically'"],
                ["Rounded Rectangle (Task)",     "A step someone does — either a person (User Task) or a system (Service Task)", "AS-IS: 'Download Amazon report' (User Task); TO-BE: 'API pulls Amazon data' (Service Task)"],
                ["Diamond (Gateway)",            "A decision point — the process goes one way or another based on a condition", "TO-BE: 'Is a product's return rate > 20%?' → Yes: flag in red / No: show in green"],
                ["Envelope (Message Event)",     "Something is sent — an email, a notification, a trigger",                "TO-BE: 'Weekly summary email sent to Sales Manager and Finance Manager automatically'"],
                ["Circle with thick border (End)","Where the process ends",                                                "AS-IS: 'Report emailed to leadership'; TO-BE: 'Dashboard updated, email sent, done'"],
                ["Swimming Lanes",               "Separate rows showing who is responsible for each step",                 "Lanes: Data Sources | Automated Pipeline | Dashboard | Sales Team | Finance Team"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Key Design Decisions Documented in BPMN</h3>
                <div className="space-y-2">
                  {[
                    { decision: "Daily refresh, not real-time",       color: BLUE,     detail: "Originally considered real-time data. After discussion with Operations team, we agreed daily refresh at midnight was enough — all decisions are made in the morning anyway. Real-time was unnecessary complexity and cost." },
                    { decision: "Returns deducted before showing revenue", color: "#10B981", detail: "The dashboard shows net revenue (after returns) not gross revenue (before returns). This was specifically requested by the Finance Manager after discovering one product had a 34% return rate inflating gross numbers." },
                    { decision: "Low-performer product alert at 10% conversion", color: "#F59E0B", detail: "Any product with a conversion rate below 10% gets an amber flag automatically. The 10% threshold was agreed with the Product Manager based on industry benchmarks for this price range." },
                    { decision: "Separate views for each team",        color: "#A78BFA", detail: "Rather than one complex dashboard everyone shares, four separate views were designed — Sales, Marketing, Finance, Operations. Each person sees only what is relevant to their role." },
                  ].map(({ decision, color, detail }) => (
                    <div key={decision} className="flex gap-3 rounded-xl p-3 bg-white/[0.02] border border-white/[0.05]">
                      <div className="w-1.5 rounded-full shrink-0 mt-1" style={{ background: color }} />
                      <div>
                        <p className="text-[#F9FAFB] text-xs font-semibold mb-0.5">{decision}</p>
                        <p className="text-[#9CA3AF] text-xs leading-relaxed">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* ── 12 ── */}
            <S id="data-analysis" num="12" title="Data Analysis & Data Mapping"
              sub="Before building anything, I analysed the raw data from all 3 platforms and mapped out exactly where each number comes from — so the dashboard always shows the right figures.">
              <p className="text-[#9CA3AF] leading-relaxed">
                Data mapping means documenting every data source, what data it contains, and how the fields
                from different systems connect to each other. This is critical because Amazon calls an order
                &ldquo;Shipped&rdquo;, Flipkart calls it &ldquo;Dispatched&rdquo;, and the website calls it
                &ldquo;Fulfilled&rdquo; — but they all mean the same thing. Without mapping, the system
                would count them differently.
              </p>
              <T hs={["Data Source", "What Data It Has", "Important Fields", "How It Connects"]} rows={[
                ["Amazon Seller Central",  "All Amazon orders, returns, ad spend, product listing performance",  "Order ID, Product ASIN, Sale Amount, Order Date, Return Status, Ad Spend",  "Connects to central DB via Amazon SP-API; Product ASIN maps to internal Product ID"],
                ["Flipkart Seller Hub",    "All Flipkart orders, returns, ad spend, product listing performance","Order ID, Product SKU, Sale Amount, Order Date, Return Flag, Campaign Spend","Connects via Flipkart Seller API; SKU maps to internal Product ID"],
                ["Shopify (Own Website)",  "Website orders, returns, customer location, ad source (UTM)",       "Order ID, Product ID, Revenue, Created Date, Refund Amount, UTM Source",    "Connects via Shopify API; Product ID already matches internal Product ID"],
                ["Google Ads / Meta Ads",  "Ad campaign spend by product and day",                              "Campaign Name, Product Name, Date, Spend (₹), Clicks, Impressions",        "Exported daily; Campaign Name matched to Product Name using a mapping table"],
                ["Internal Product Master","Master list of all products with their ID, name, price, and category","Product ID, Name, Category, Launch Price, Current Price, Target Margin",   "The common link across all sources — every order maps back to a Product ID"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">Data Dictionary — Key Fields</h3>
                <T hs={["Field Name", "What It Means", "Where It Comes From", "How It Is Calculated"]} rows={[
                  ["net_revenue",      "Money actually earned — after returns and refunds deducted",         "All 3 platforms",      "SUM(sale_amount) minus SUM(refund_amount) for the same period"],
                  ["return_rate_pct",  "What % of orders for a product were returned by the customer",       "All 3 platforms",      "(Total returns ÷ Total orders) × 100 — calculated per product, per month"],
                  ["roas",             "Return on Ad Spend — for every ₹1 spent on ads, how many ₹ in sales","Orders + Ad data",     "net_revenue ÷ total_ad_spend — if > 1, the ad is profitable"],
                  ["sales_channel",    "Which platform the sale happened on",                                "Derived from source",  "'Amazon' / 'Flipkart' / 'Website' — set based on which API the order came from"],
                  ["is_slow_month",    "Whether this month is historically a slow sales month",              "Derived from history", "TRUE if the same month in both previous years had revenue below 50% of the annual average"],
                ]} />
              </Glass>
              <CB lang="SQL" code={`-- Which product earns the most for every rupee spent on ads?
-- (ROAS = Return on Ad Spend -- higher is better)
SELECT
  p.product_name,
  p.selling_price,
  COUNT(o.order_id)                    AS total_orders,
  SUM(o.sale_amount - o.refund_amount) AS net_revenue,
  SUM(m.ad_spend)                      AS total_ad_spend,
  ROUND(
    SUM(o.sale_amount - o.refund_amount)
    / NULLIF(SUM(m.ad_spend), 0), 2
  )                                    AS revenue_per_rupee_of_ad_spend
FROM products p
LEFT JOIN orders o      ON p.product_id = o.product_id
LEFT JOIN ad_spend m    ON p.product_id = m.product_id
  AND MONTH(m.spend_date) = MONTH(o.order_date)
WHERE o.order_date >= DATEADD(year, -1, GETDATE())
GROUP BY p.product_id, p.product_name, p.selling_price
ORDER BY revenue_per_rupee_of_ad_spend DESC;`} />
              <CB lang="SQL" code={`-- Monthly sales trend for the last 24 months
-- Used to identify seasonal patterns (festive peak vs. Jan-Mar slump)
SELECT
  YEAR(order_date)                     AS sale_year,
  MONTH(order_date)                    AS sale_month,
  DATENAME(month, order_date)          AS month_name,
  SUM(sale_amount - refund_amount)     AS net_revenue,
  COUNT(order_id)                      AS total_orders,
  AVG(sale_amount)                     AS avg_order_value
FROM orders
WHERE order_date >= DATEADD(year, -2, GETDATE())
GROUP BY
  YEAR(order_date),
  MONTH(order_date),
  DATENAME(month, order_date)
ORDER BY sale_year, sale_month;`} />
            </S>

            {/* ── 13 ── */}
            <S id="wireframes" num="13" title="Wireframes & Prototypes"
              sub="A wireframe is a simple sketch (or digital mockup) of what the dashboard will look like — before the developer builds anything. It is reviewed with stakeholders to confirm we are building the right thing.">
              <p className="text-[#9CA3AF] leading-relaxed">
                I designed 4 dashboard views in Figma — one for each type of user. Instead of one complex
                screen with everything on it, each team sees only what they need. The wireframes were reviewed
                with stakeholders twice before development began.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    view: "View 1", title: "Sales Overview",
                    color: BLUE, icon: <BarChart3 size={15} />,
                    for: "Sales Manager",
                    headline: "Total revenue this month across all channels",
                    shows: [
                      "Total net revenue (this month vs. last month vs. same month last year)",
                      "Channel split: Amazon vs. Flipkart vs. Website (with % share)",
                      "Top 3 products by units sold and revenue",
                      "Number of orders, average order value, return rate",
                    ],
                  },
                  {
                    view: "View 2", title: "Product Performance",
                    color: "#7B72E1", icon: <Package size={15} />,
                    for: "Product Manager & Sales Manager",
                    headline: "Which product earns the most for every ₹1 spent?",
                    shows: [
                      "All 6 products in a table: sales, revenue, ad spend, ROAS",
                      "Conversion rate per product — flagged amber if below 10%",
                      "Return rate per product — flagged red if above 20%",
                      "Month-over-month trend: is this product growing or declining?",
                    ],
                  },
                  {
                    view: "View 3", title: "Seasonal Trends",
                    color: "#10B981", icon: <TrendingUp size={15} />,
                    for: "Operations Manager & Finance Manager",
                    headline: "Which months are slow? How slow? For how long?",
                    shows: [
                      "24-month bar chart showing net revenue per month",
                      "Festive season (Oct–Nov) vs. slow season (Jan–Mar) highlighted",
                      "3-month rolling forecast based on last 2 years of same-month data",
                      "Recommended inventory order quantity for next 3 months",
                    ],
                  },
                  {
                    view: "View 4", title: "Marketing & Channel ROI",
                    color: "#F59E0B", icon: <Target size={15} />,
                    for: "Marketing Manager",
                    headline: "Which channel brings the most sales per rupee spent on ads?",
                    shows: [
                      "Ad spend vs. revenue by channel (Amazon Ads / Flipkart Ads / Google / Meta)",
                      "ROAS for each campaign and each product",
                      "Which product + channel combination has the highest return",
                      "Month-wise ad spend efficiency trend",
                    ],
                  },
                ].map(({ view, title, color, icon, for: forRole, headline, shows }) => (
                  <div key={view} className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                        {icon}
                      </div>
                      <div>
                        <p className="text-[#6B7280] text-[10px] font-mono uppercase">{view}</p>
                        <p className="text-[#F9FAFB] text-sm font-bold">{title}</p>
                      </div>
                    </div>
                    <div className="rounded-lg px-3 py-2 mb-3" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                      <p className="text-[11px] font-semibold" style={{ color }}>Main Question It Answers</p>
                      <p className="text-[#D1D5DB] text-xs mt-0.5">{headline}</p>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mb-2 uppercase tracking-wider font-semibold">For: {forRole}</p>
                    {shows.map(s => (
                      <p key={s} className="text-[#9CA3AF] text-xs flex gap-1.5 mb-1">
                        <span style={{ color }} className="shrink-0">·</span>{s}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <IB t="i">
                <strong>Feedback from Round 1 review:</strong> The Marketing Manager asked for the ROAS
                (Return on Ad Spend) number to be shown right next to the ad spend number — not on a separate
                screen. &ldquo;I need to see both together to make a decision. If I have to click between
                screens, I won&apos;t use it.&rdquo; This was implemented in Round 2, and the Marketing Manager
                confirmed it was exactly what they needed.
              </IB>
            </S>

            {/* ── 14 ── */}
            <S id="req-validation" num="14" title="Requirement Validation"
              sub="Before the developer builds anything, every requirement must be formally reviewed and signed off. This prevents building the wrong thing and having to redo it later.">
              <T hs={["Validation Step", "When", "Who Was Involved", "What Was Reviewed", "Result"]} rows={[
                ["BRD Review Meeting",          "End of Week 4",  "Sales Manager + Finance Manager",            "All 8 business requirements reviewed one by one; acceptance criteria confirmed",   "Approved — BR-005 changed from real-time to daily refresh"],
                ["Stakeholder Walkthrough",      "Week 5",         "All 5 stakeholders",                         "Full requirements summary presented; each person confirmed their needs were covered","All signed off; Operations Manager added one new request (seasonal forecast)"],
                ["FRS Technical Review",         "Week 6",         "BI Developer + Sales Manager",               "All 10 functional requirements reviewed for technical feasibility",                "FR-009 (inventory forecast) flagged as complex; simplified to 3-month trend only"],
                ["Wireframe Review — Round 1",  "Week 7",         "Sales Manager, Marketing Manager, Product Mgr","Figma mockups walked through screen by screen; feedback captured",                "6 change requests — ROAS placement, colour scheme, mobile layout"],
                ["Wireframe Review — Round 2",  "Week 8",         "Sales Manager + Marketing Manager",           "Updated Figma reviewed after Round 1 changes implemented",                        "Approved — no further changes requested. Green light to begin development."],
              ]} />
              <IB t="s">
                No development work started until all validations were complete and approved. This may seem
                slow, but it saved significant time later — the developer had zero ambiguity about what to
                build. There were no mid-development change requests that required rework.
              </IB>
            </S>

            {/* ── 15 ── */}
            <S id="backlog" num="15" title="Backlog Creation & Prioritization"
              sub="The backlog is the full list of everything that needs to be built, sorted by priority. MoSCoW is the prioritization method: Must Have, Should Have, Could Have, Won't Have (for now).">
              <T hs={["Priority", "Stories", "What Gets Built", "When"]} rows={[
                [bd("red","Must Have"),    "12 stories — 55 points", "All 3 platform connections, product performance view, seasonal trend view, return rates, basic sales overview",   "Sprint 1 & 2"],
                [bd("yellow","Should Have"),"8 stories — 34 points",  "Marketing/channel ROI view, automated Monday email, ROAS calculation per product and channel",                    "Sprint 3"],
                [bd("orange","Could Have"), "5 stories — 22 points",  "3-month seasonal forecast, low-performer product alerts, mobile-optimised layout",                                "Sprint 4 if time permits"],
                [bd("gray","Won't Have"),   "3 stories — —",          "Customer segmentation, WhatsApp alerts, integration with accounting software (planned for Phase 2)",             "Phase 2 backlog"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Sprint Plan — 4 Sprints of 2 Weeks Each</h3>
                <div className="space-y-2">
                  {[
                    { sprint: "Sprint 1", wks: "Wk 9–10",  color: BLUE,     focus: "Build the data pipeline: connect Amazon, Flipkart, and Shopify APIs to the central database. Set up daily refresh. Validate that the numbers match the source platforms." },
                    { sprint: "Sprint 2", wks: "Wk 10–11", color: "#7B72E1",focus: "Build View 1 (Sales Overview) and View 2 (Product Performance). Include return rate, ROAS, and conversion rate. Add low-performer flagging." },
                    { sprint: "Sprint 3", wks: "Wk 11–12", color: "#A78BFA",focus: "Build View 3 (Seasonal Trends) with 24-month chart and forecast. Build View 4 (Marketing ROI). Set up automated Monday email." },
                    { sprint: "Sprint 4", wks: "Wk 12–13", color: "#10B981",focus: "Mobile optimisation, UAT defect fixes, performance testing, user training preparation, and go-live readiness check." },
                  ].map(({ sprint, wks, color, focus }) => (
                    <div key={sprint} className="flex gap-3 rounded-xl p-3 bg-white/[0.02] border border-white/[0.05]">
                      <div className="shrink-0 px-2 py-1 rounded-lg text-[10px] font-bold font-mono h-fit"
                        style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                        {sprint}
                      </div>
                      <div>
                        <Bdg color="gray">{wks}</Bdg>
                        <p className="text-[#9CA3AF] text-xs leading-relaxed mt-1">{focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* ── 16 ── */}
            <S id="sprint-execution" num="16" title="Agile Sprint Execution"
              sub="Agile sprints are short 2-week work cycles where the team builds and delivers a working piece of the system — instead of trying to build everything at once.">
              <T hs={["Agile Ceremony", "How Often", "What I Did as BA"]} rows={[
                ["Sprint Planning",     "Start of each sprint",  "Explained the top-priority user stories to the developer; clarified acceptance criteria; confirmed what 'done' looks like for each story"],
                ["Daily Stand-Up",      "Every day (15 min)",    "Flagged any requirements questions that came up during development; resolved ambiguities before they caused rework or delays"],
                ["Sprint Review",       "End of each sprint",    "Showed the completed features to the Sales Manager and Marketing Manager; collected their feedback and added it to the next sprint if needed"],
                ["Sprint Retrospective","End of each sprint",    "Discussed what went well and what to improve in the next sprint — helped the team improve their process as they went"],
                ["Backlog Refinement",  "Middle of each sprint", "Reviewed upcoming stories, added missing detail, removed blockers, and adjusted estimates based on what we learned in the current sprint"],
              ]} />
              <IB t="i">
                <strong>Important mid-sprint discovery:</strong> During Sprint 1, we found that Flipkart&apos;s
                API did not provide a direct &ldquo;return reason&rdquo; field — it only showed whether an item
                was returned, not why. This meant the &ldquo;return reason analysis&rdquo; feature we had
                planned could not be built as originally designed. I updated the requirement immediately and
                replaced it with &ldquo;return rate by product only&rdquo; — which was still valuable and
                could be delivered on time. This type of real-time requirement adjustment is a core part of
                the BA role during development.
              </IB>
            </S>

            {/* ── 17 ── */}
            <S id="dev-support" num="17" title="Development Support"
              sub="The BA's job doesn't end when development starts. During the build phase, the developer needs help clarifying requirements, handling unexpected findings, and managing changes from stakeholders.">
              <T hs={["Situation", "What Happened", "What I Did as BA", "Result"]} rows={[
                ["Developer needed calculation clarity", "Developer was unsure how to calculate ROAS — was it per order or per month?",                            "Wrote a clear calculation specification: ROAS = Net Revenue ÷ Ad Spend, calculated monthly per product per channel", "Developer built the correct metric first time; no rework needed"],
                ["Stakeholder change request",           "Marketing Manager asked mid-Sprint 2 to add campaign-level breakdown (not just channel-level)",          "Assessed the impact: needed 1 new data field, 2 extra hours of development. Logged as a Should Have for Sprint 3",   "Sprint 2 was not disrupted; the new feature was added in Sprint 3 on schedule"],
                ["Data quality issue found",             "12% of orders from the website had no product ID — they couldn&apos;t be linked to the product master",  "Traced it to a Shopify order form issue. Temporary fix: unmatched orders categorised as 'Other' with a note",          "Dashboard launched without this being a blocker; the Shopify form was fixed separately"],
                ["Stakeholder anxiety during build",     "Sales Manager wanted to see progress and was worried nothing was happening visibly",                     "Ran a mid-Sprint 2 live demo showing the product performance view with real data (even though it wasn&apos;t finished)", "Stakeholder confidence restored; no scope creep from the demo"],
              ]} />
            </S>

            {/* ── 18 ── */}
            <S id="testing-support" num="18" title="Testing Support"
              sub="Before UAT (user testing), the BA helps design the test cases and ensures the system is tested against what was actually required — not just whether it works technically.">
              <T hs={["What I Did", "Details"]} rows={[
                ["Wrote the UAT Test Plan",       "Created a document listing all 34 test cases, the expected result for each, who would run each test, and what counts as pass or fail — before testing began"],
                ["Reviewed test cases for coverage","Checked that every BR and FR had at least 2 test cases covering it. Found 3 functional requirements had no test cases — added them before testing started"],
                ["Designed edge case tests",       "Added tests for unusual situations: What happens if a product has zero sales this month? What if ad spend is zero? What if returns > sales? These were cases the developer might not have considered."],
                ["Attended defect triage sessions","When defects were found during testing, I attended the daily triage meeting to classify each defect — is it a requirements issue, a build issue, or a data issue? Each type needs a different fix."],
                ["Verified fixes before re-testing","After the developer fixed a defect, I reviewed the fix against the original requirement to confirm it was correct before the tester re-ran the test. Prevented fixes that solved the symptom but not the cause."],
              ]} />
              <IB t="w">
                <strong>Critical defect found before UAT:</strong> During internal testing, the Sales Overview
                view was showing gross revenue (before returns) instead of net revenue (after returns). This
                happened because the developer used the wrong field from the database. The Finance Manager
                would have immediately rejected this in UAT. Catching it in internal testing saved a full
                round of UAT rework.
              </IB>
            </S>

            {/* ── 19 ── */}
            <S id="uat" num="19" title="User Acceptance Testing (UAT)"
              sub="UAT is when the actual users test the system — not the developer, not the BA. They use it the way they would in real life and confirm it does what the BRD said it must do.">
              <T hs={["What Was Tested", "Test Cases", "Tested By", "Passed", "Failed", "Status"]} rows={[
                ["Data accuracy — do dashboard numbers match platform numbers?", "8",  "Finance Manager + Sales Manager", "8",  "0", bd("green","All Pass")],
                ["Product performance view — all products, ROAS, return rates",  "10", "Sales Manager + Product Manager", "9",  "1", bd("yellow","1 Fixed")],
                ["Seasonal trends view — 24-month chart accuracy",               "6",  "Operations Manager",              "6",  "0", bd("green","All Pass")],
                ["Marketing ROI view — channel split and ROAS",                  "6",  "Marketing Manager",               "5",  "1", bd("yellow","1 Fixed")],
                ["Automated Monday email — correct numbers, arrives on time",    "4",  "Finance Manager",                 "4",  "0", bd("green","All Pass")],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">Defects Found & Fixed</h3>
                <div className="space-y-2">
                  {[
                    { id: "DEF-001", sev: "High",   what: "Premium phone case return rate was showing 3.2% instead of 34%. Root cause: the return rate was being calculated as returns ÷ total products in inventory, not returns ÷ total orders. Fixed the calculation and re-tested — correct result confirmed." },
                    { id: "DEF-002", sev: "Medium", what: "ROAS on the Marketing view was not updating when a different month was selected from the date filter. Root cause: the ad spend table was not connected to the date filter. Fixed by the developer in 4 hours." },
                  ].map(({ id, sev, what }) => (
                    <div key={id} className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Bdg color="gray">{id}</Bdg>
                        <Bdg color={sev === "High" ? "red" : "yellow"}>{sev} Severity</Bdg>
                      </div>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{what}</p>
                    </div>
                  ))}
                </div>
              </Glass>
              <IB t="s">
                Both defects were fixed and re-tested within 2 days. All 5 stakeholders gave formal sign-off
                at the end of UAT. Sign-off means they confirmed: &ldquo;Yes, this does what we asked for in
                the BRD, and we are happy to go live.&rdquo;
              </IB>
            </S>

            {/* ── 20 ── */}
            <S id="go-live" num="20" title="Deployment / Go-Live"
              sub="Go-live is when the new system becomes the official tool the team uses — and the old process is retired. A phased approach was used to reduce risk.">
              <T hs={["Day", "What Happened", "Who Was Responsible"]} rows={[
                ["Day 1",      "Final data check: compared dashboard revenue numbers with manual platform exports for last 3 months. All within ±0.8% — within the agreed ±1% accuracy threshold.", "BA + BI Developer"],
                ["Day 1",      "Dashboard access given to Sales Manager and Finance Manager only — to test with real users before the full team gets access (Phase 1 rollout)",                        "BI Developer"],
                ["Day 2",      "30-minute walkthrough with Sales Manager and Finance Manager — live data, real questions answered",                                                                   "BA"],
                ["Day 3",      "Access given to Marketing Manager and Product Manager (Phase 2 rollout)",                                                                                           "BI Developer"],
                ["Day 4",      "Access given to Operations Manager and the full sales team (Phase 3 rollout)",                                                                                      "BI Developer"],
                ["Day 5",      "First automated Monday email tested — scheduled and confirmed to send the following Monday",                                                                        "BI Developer"],
                ["Week 2",     "Hypercare period: BA available daily to answer any questions and fix any small issues reported by users",                                                            "BA"],
                ["Week 2 Mon", "First automated Monday email received by Sales Manager and Finance Manager — containing last week&apos;s revenue summary with no manual action",                   "System (auto)"],
              ]} />
              <IB t="s">
                The phased rollout (leadership first, then full team) meant that if something was wrong, only
                2 people saw it — not the entire team. The Sales Manager was also more likely to champion
                the tool to the team after having used it themselves for 2 days first.
              </IB>
            </S>

            {/* ── 21 ── */}
            <S id="training" num="21" title="Training & Change Management"
              sub="A great dashboard that nobody uses is a failed project. Change management ensures the team actually adopts the new system and stops using the old manual process.">
              <T hs={["Who Was Trained", "Format", "Duration", "What Was Covered"]} rows={[
                ["Sales Manager",        "1-on-1 session",    "45 min", "Sales Overview and Product Performance views; how to filter by channel, product, and time period; how to interpret return rate and ROAS numbers"],
                ["Finance Manager",      "1-on-1 session",    "30 min", "The automated Monday email format; how to verify dashboard numbers against QuickBooks; the seasonal forecast view"],
                ["Marketing Manager",   "1-on-1 session",    "30 min", "Marketing ROI view; how to read ROAS; how to compare ad spend vs. revenue by channel and campaign"],
                ["Product Manager",     "1-on-1 session",    "30 min", "Product Performance view; conversion rate; what the low-performer amber flag means and when to act on it"],
                ["Operations Manager",  "1-on-1 session",    "20 min", "Seasonal Trends view; how to read the 3-month forecast; how to use it for inventory planning decisions"],
                ["Full Sales Team (7)", "Group session",     "30 min", "Overview of all 4 views; how to log in; who to contact if something looks wrong"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">Change Management — Key Actions</h3>
                <div className="space-y-2">
                  {[
                    { action: "Old Excel files archived on Day 1",         detail: "The Sales Manager archived all old master Excel files with a team announcement: 'From today, the dashboard is our source of truth.' Removing the old tool removed the temptation to fall back to it." },
                    { action: "Sales Manager championed it to the team",    detail: "Because the Sales Manager had 2 days of experience with the live dashboard before the team got access, they were able to say 'this is working, I trust it' — which was more persuasive than any training session." },
                    { action: "1-page quick reference guide distributed",   detail: "A simple 1-page PDF: how to log in, which view to use for which question, and who to contact if something looks wrong. Sent via the team WhatsApp group on Day 4." },
                    { action: "Week 2 open Q&A session",                    detail: "A 20-minute optional session where anyone could ask questions or raise concerns. 4 of 7 sales team members attended. No major issues were raised — small usability questions resolved in real time." },
                  ].map(({ action, detail }) => (
                    <div key={action} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-[#10B981]" />
                      <div>
                        <p className="text-[#F9FAFB] text-xs font-semibold">{action}</p>
                        <p className="text-[#9CA3AF] text-xs leading-relaxed mt-0.5">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* ── 22 ── */}
            <S id="pir" num="22" title="Post-Implementation Review"
              sub="The Post-Implementation Review (PIR) happens 4 weeks after go-live. It checks whether the system delivered what it promised, what went well, and what to do differently next time.">
              <T hs={["Finding", "Type", "Detail"]} rows={[
                ["All 8 business requirements were delivered as agreed",           bd("green","Positive"),     "Every requirement from the BRD was built, tested, and confirmed working at go-live"],
                ["Premium product issue identified and actioned quickly",          bd("green","Positive"),     "Within 1 week of go-live, the Product Manager used the dashboard to confirm the pricing hypothesis. The premium case was repriced from ₹1,499 to ₹999. Sales went up 180% in the first month after repricing."],
                ["Seasonal planning happened for the first time this year",        bd("green","Positive"),     "The Operations Manager used the 24-month trend view to plan January–March inventory 6 weeks in advance — instead of ordering based on last month as before. Over-ordering reduced by 40%."],
                ["12% of website orders still showing as 'Other' product",         bd("yellow","Improvement"),"The Shopify form issue (no product ID on some orders) was fixed but historical data cannot be corrected. Agreed to run a data cleaning exercise in Q2."],
                ["Mobile dashboard works but has a slow load time on older phones",bd("yellow","Learning"),    "iPhone 15 and recent Android phones load fast. Some older phones take 6–8 seconds. Flagged for optimisation in the next development cycle."],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">3 Key Lessons from This Project</h3>
                <div className="space-y-3">
                  {[
                    { lesson: "Align on definitions before touching data",     detail: "The definition alignment session (Workshop 1) was the most valuable thing we did in the entire project. If we had built the dashboard first and discovered later that Sales, Finance, and Marketing were measuring 'revenue' differently, we would have had to rebuild significant parts of it." },
                    { lesson: "Sign-off before build = no surprises during build", detail: "Because every requirement was formally signed off before development started, there were zero unexpected changes during the 4 sprints. This is a direct result of the requirement validation gate. It feels slow upfront but saves much more time later." },
                    { lesson: "Remove the old process at go-live, don't run both",  detail: "Archiving the Excel files on Day 1 was the single most important change management action. When people have a fallback, they use it. When they don't, they adapt. The team adopted the dashboard fully within the first week." },
                  ].map(({ lesson, detail }) => (
                    <div key={lesson} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <p className="text-[#F9FAFB] text-xs font-semibold mb-1">{lesson}</p>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* ── 23 ── */}
            <S id="impact" num="23" title="Business Impact Measurement"
              sub="Measured at 8 weeks post go-live — comparing actual outcomes against what was promised in the BRD.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="+41%"  label="Revenue growth in Jan–Mar"        c="#10B981" note="vs. same period last year" />
                <MC v="+180%" label="Premium product sales after reprice" c={BLUE}  note="₹1,499 → repriced to ₹999" />
                <MC v="₹38L"  label="Slow-moving inventory cleared"    c="#A78BFA" note="Targeted discount campaigns" />
                <MC v="20min" label="Time to get monthly report"       c="#F59E0B" note="Was 8–10 hours manually" />
              </div>
              <T hs={["What We Promised in BRD", "Target", "Actual Result (8 Weeks)", "Status"]} rows={[
                ["Single combined view of Amazon + Flipkart + Website sales",            "Working dashboard with all 3 sources", "Live and accurate within ±0.8%",                     bd("green","Done")],
                ["Product comparison: sales vs. marketing spend side-by-side",           "All 6 products visible in one table",  "Table live; premium case identified as lowest ROAS (0.4)", bd("green","Done")],
                ["24-month seasonal sales chart to plan for slow months",                "Chart covering 24 months of history", "Chart live; Jan–Mar pattern clearly visible",         bd("green","Done")],
                ["Return rate visible per product",                                      "Return % per product shown",          "Return rates visible; one product found at 34% return rate", bd("green","Done")],
                ["Daily automated data refresh — no manual downloading",                 "Zero manual downloads needed",        "Sales Manager confirms no manual file downloaded in 8 weeks", bd("green","Done")],
                ["Channel-wise revenue: Amazon, Flipkart, Website separately",           "Each channel shown with net revenue", "All 3 channels visible; Website found to have highest ROAS", bd("green","Done")],
                ["Automated Monday email to Sales Manager and Finance Manager",           "Email arrives without manual action", "Email arriving every Monday 8am for 8 consecutive weeks", bd("green","Done")],
                ["3-month seasonal forecast for inventory planning",                     "Forecast within 15% of actual",       "Forecast accuracy: 11% variance in Month 1 after go-live",  bd("green","Done")],
              ]} />
              <Glass>
                <p className="text-[#D1D5DB] text-sm italic leading-relaxed border-l-2 pl-4" style={{ borderColor: "#10B981" }}>
                  &ldquo;Before the dashboard, we used to guess which months would be slow and panic when they
                  arrived. Now I can open the seasonal view and plan 3 months in advance. We ordered 40% less
                  inventory for January this year compared to last year — and we had fewer stockouts because
                  we put that budget into the products that actually sell in January.&rdquo;
                </p>
                <p className="text-[#6B7280] text-xs mt-3">— Operations Manager · 6 weeks post go-live</p>
              </Glass>
              <IB t="s">
                <strong>The most important outcome:</strong> The premium phone case was repriced from ₹1,499
                to ₹999 based directly on data from the dashboard (low conversion rate, low ROAS, high competitor
                pricing in that segment). Within 1 month, sales of the premium case increased by 180%.
                This single pricing decision — made possible only because the dashboard existed — recovered
                more value than the entire cost of the project. It is the clearest example of what
                data-driven decision making actually means in practice.
              </IB>
            </S>

          </main>
        </div>
      </div>
    </div>
  );
}
