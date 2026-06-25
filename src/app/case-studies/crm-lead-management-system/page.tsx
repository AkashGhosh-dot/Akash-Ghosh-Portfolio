"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Info,
  Code2, Users, Target, BarChart3, Shield, Database, TrendingUp,
  Zap, BookOpen, Award, Wrench, Clock, Activity, Eye,
  GitBranch, TestTube2, Rocket, Settings, MessageSquare,
  FileText, Star, RefreshCw, PieChart, Layers
} from "lucide-react";

// ── TOC ──────────────────────────────────────────────────────────
const toc = [
  { id: "executive-summary",       num: "01", title: "Executive Summary" },
  { id: "project-overview",        num: "02", title: "Project Overview" },
  { id: "business-problem",        num: "03", title: "Business Problem" },
  { id: "goals-metrics",           num: "04", title: "Goals & Success Metrics" },
  { id: "stakeholder-analysis",    num: "05", title: "Stakeholder Analysis" },
  { id: "req-gathering",           num: "06", title: "Requirement Gathering" },
  { id: "current-state",           num: "07", title: "Current State (AS-IS)" },
  { id: "pain-points",             num: "08", title: "Pain Points" },
  { id: "root-cause",              num: "09", title: "Root Cause Analysis" },
  { id: "gap-analysis",            num: "10", title: "Gap Analysis" },
  { id: "user-personas",           num: "11", title: "User Personas" },
  { id: "journey-map",             num: "12", title: "Customer Journey Map" },
  { id: "process-flow",            num: "13", title: "Business Process Flow" },
  { id: "future-state",            num: "14", title: "Future State (TO-BE)" },
  { id: "brd",                     num: "15", title: "Business Requirements" },
  { id: "functional-req",          num: "16", title: "Functional Requirements" },
  { id: "non-functional-req",      num: "17", title: "Non-Functional Req." },
  { id: "user-stories",            num: "18", title: "User Stories" },
  { id: "acceptance-criteria",     num: "19", title: "Acceptance Criteria" },
  { id: "moscow",                  num: "20", title: "MoSCoW Prioritization" },
  { id: "process-mapping",         num: "21", title: "Process Mapping" },
  { id: "wireframes",              num: "22", title: "Wireframes & Design" },
  { id: "data-model",              num: "23", title: "CRM Data Model" },
  { id: "lead-lifecycle",          num: "24", title: "Lead Lifecycle Design" },
  { id: "lead-scoring",            num: "25", title: "Lead Scoring Framework" },
  { id: "dashboard-req",           num: "26", title: "Dashboard Requirements" },
  { id: "reporting-req",           num: "27", title: "Reporting Requirements" },
  { id: "data-analysis",           num: "28", title: "Data Analysis" },
  { id: "risk-assessment",         num: "29", title: "Risk Assessment" },
  { id: "assumptions",             num: "30", title: "Assumptions & Constraints" },
  { id: "sprint-planning",         num: "31", title: "Sprint Planning" },
  { id: "product-backlog",         num: "32", title: "Product Backlog" },
  { id: "uat-strategy",            num: "33", title: "UAT Strategy" },
  { id: "test-cases",              num: "34", title: "Test Cases" },
  { id: "defect-management",       num: "35", title: "Defect Management" },
  { id: "deployment-strategy",     num: "36", title: "Deployment Strategy" },
  { id: "change-management",       num: "37", title: "Change Management" },
  { id: "training",                num: "38", title: "Training Documentation" },
  { id: "pir",                     num: "39", title: "Post-Implementation Review" },
  { id: "kpi-tracking",            num: "40", title: "KPI Tracking" },
  { id: "before-after",            num: "41", title: "Before vs After" },
  { id: "business-impact",         num: "42", title: "Business Impact" },
  { id: "lessons-learned",         num: "43", title: "Lessons Learned" },
  { id: "ba-skills",               num: "44", title: "BA Skills Demonstrated" },
  { id: "tools-used",              num: "45", title: "Tools & Technologies" },
];

// ── Helpers ───────────────────────────────────────────────────────

function S({ id, num, title, sub, children }: {
  id: string; num: string; title: string; sub?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-20">
      <div className="flex items-start gap-3 mb-7">
        <span className="font-mono text-xs font-bold shrink-0 mt-1 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", color: "#A78BFA" }}>
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

function MC({ v, label, c = "#3B82F6", note }: { v: string; label: string; c?: string; note?: string }) {
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
    i: { bg: "rgba(59,130,246,0.07)",  bd: "rgba(59,130,246,0.2)",  ic: "#60A5FA", el: <Info size={14} /> },
    w: { bg: "rgba(245,158,11,0.07)",  bd: "rgba(245,158,11,0.2)",  ic: "#F59E0B", el: <AlertTriangle size={14} /> },
    s: { bg: "rgba(16,185,129,0.07)",  bd: "rgba(16,185,129,0.2)",  ic: "#10B981", el: <CheckCircle2 size={14} /> },
  }[t];
  return (
    <div className="rounded-xl p-4 flex gap-3 text-sm leading-relaxed" style={{ background: cfg.bg, border: `1px solid ${cfg.bd}` }}>
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
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07]" style={{ background: "rgba(255,255,255,0.03)" }}>
        <Code2 size={12} className="text-[#4B5563]" />
        <span className="text-[10px] text-[#4B5563] font-mono uppercase tracking-widest">{lang}</span>
        <div className="ml-auto flex gap-1.5">
          {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
        </div>
      </div>
      <pre className="p-5 text-[#67E8F9] text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre" style={{ background: "rgba(0,0,0,0.5)" }}>
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
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function CRMCaseStudy() {
  const [active, setActive] = useState("executive-summary");

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
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-[#A78BFA]/6 blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 relative z-10">
          <Link href="/#case-studies"
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F9FAFB] text-sm mb-8 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Bdg color="purple">CRM & Sales Ops</Bdg>
            <Bdg color="green">14 Weeks</Bdg>
            <Bdg color="blue">Lead Business Analyst</Bdg>
            <Bdg color="indigo">HubSpot · Power BI · Jira</Bdg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F9FAFB] leading-tight mb-4">
            CRM Lead Management<br />
            <span style={{ background: "linear-gradient(135deg,#A78BFA,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              System
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed mb-10">
            End-to-end HubSpot CRM implementation for a mid-market B2B SaaS company — structuring the lead pipeline,
            automating follow-ups, and delivering executive-level pipeline visibility across 14 weeks.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MC v="+72%" label="Lead Conversion Rate" c="#10B981" note="18% → 31%" />
            <MC v="-92%" label="Lead Response Time" c="#3B82F6" note="52 hrs → 4.2 hrs" />
            <MC v="$1.8M" label="Pipeline Recovered" c="#A78BFA" note="Previously untracked" />
            <MC v="47" label="User Stories Delivered" c="#F59E0B" note="Across 4 sprints" />
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">

          {/* TOC */}
          <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="text-[10px] text-[#374151] uppercase tracking-widest font-semibold mb-3 px-2">Contents</p>
            <nav className="space-y-0.5">
              {toc.map(({ id, num, title }) => (
                <button key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-all duration-150 ${
                    active === id ? "bg-[#A78BFA]/10 text-[#A78BFA]" : "text-[#4B5563] hover:text-[#D1D5DB] hover:bg-white/[0.03]"
                  }`}>
                  <span className={`font-mono text-[10px] shrink-0 w-5 ${active === id ? "text-[#A78BFA]" : "text-[#374151]"}`}>{num}</span>
                  <span className="truncate">{title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">

            {/* 01 Executive Summary */}
            <S id="executive-summary" num="01" title="Executive Summary">
              <p className="text-[#9CA3AF] leading-relaxed">
                TechVantage Solutions, a 150-person B2B SaaS company generating <span className="text-[#F9FAFB] font-medium">$8.2M ARR</span>, was
                losing an estimated $1.8M annually in potential revenue due to a fragmented, spreadsheet-driven lead
                management process. As Lead Business Analyst, I was engaged to define requirements, design a structured
                CRM lead lifecycle, and oversee the end-to-end implementation of HubSpot CRM Professional.
              </p>
              <p className="text-[#9CA3AF] leading-relaxed">
                The 14-week engagement ran from April 7 to July 12, 2024 — spanning discovery, requirements,
                design, build, testing, and go-live across a cross-functional team of 8. The result: a fully operational
                CRM with automated lead assignment, lead scoring, 6 workflow automations, and Power BI executive dashboards —
                eliminating spreadsheet chaos and creating a single source of truth for the entire sales pipeline.
              </p>
              <Glass>
                <h3 className="text-[#F9FAFB] font-semibold text-sm mb-5 uppercase tracking-wider">Key Outcomes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Lead-to-Opportunity Conversion", before: "18%", after: "31%", change: "+72%", c: "#10B981" },
                    { label: "Avg Lead Response Time", before: "52 hours", after: "4.2 hours", change: "−92%", c: "#3B82F6" },
                    { label: "Pipeline Visibility", before: "0% (spreadsheets)", after: "100% real-time", change: "↑", c: "#A78BFA" },
                    { label: "Weekly Reporting Time", before: "6–8 hours", after: "45 minutes", change: "−88%", c: "#F59E0B" },
                    { label: "Duplicate Lead Records", before: "~200/quarter", after: "~12/quarter", change: "−94%", c: "#10B981" },
                    { label: "Average Sales Cycle", before: "68 days", after: "54 days", change: "−21%", c: "#3B82F6" },
                  ].map(({ label, before, after, change, c }) => (
                    <div key={label} className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-[#6B7280] text-xs">{label}</span>
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="text-[#6B7280] line-through">{before}</span>
                        <ArrowRight size={9} className="text-[#374151] shrink-0" />
                        <span className="text-[#F9FAFB] font-semibold">{after}</span>
                        <span className="ml-auto font-bold" style={{ color: c }}>{change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* 02 Project Overview */}
            <S id="project-overview" num="02" title="Project Overview"
              sub="High-level project context, team composition, and phase breakdown.">
              <T hs={["Attribute", "Detail"]} rows={[
                ["Client",           "TechVantage Solutions — mid-market B2B SaaS (cloud analytics platform)"],
                ["Company Size",     "150 employees · 12 AEs · 3 BDRs · 1 Sales Manager"],
                ["Annual Revenue",   "$8.2M ARR · Average deal size $32K ACV · 45–90 day sales cycle"],
                ["Project Duration", "14 weeks — April 7 to July 12, 2024"],
                ["My Role",          "Lead Business Analyst — requirements, process design, UAT, training"],
                ["Team",             "BA, Product Owner, 3 Developers, 1 UX Designer, IT Lead, QA Analyst"],
                ["CRM Platform",     "HubSpot CRM Professional"],
                ["Methodology",      "Agile Scrum — 6-week discovery/design + 4 × 2-week sprints"],
                ["Budget",           "$186,000 (HubSpot license, implementation, training, contingency)"],
                ["Integration",      "HubSpot ↔ Mailchimp (email marketing) · HubSpot ↔ Power BI (reporting)"],
                ["Key Deliverables", "BRD (28pp) · FRS (18pp) · Process Maps · 47 Jira Stories · UAT Plan · Training Docs"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">Project Timeline</h3>
                <div className="space-y-2">
                  {[
                    { phase: "Phase 1", wks: "Wk 1–3", color: "#3B82F6",  title: "Discovery & Analysis",       desc: "Stakeholder interviews, current state documentation, data audit, pain point mapping" },
                    { phase: "Phase 2", wks: "Wk 4–6", color: "#7B72E1",  title: "Requirements & Design",      desc: "BRD, FRS, user stories, lead lifecycle design, wireframes, MoSCoW" },
                    { phase: "Phase 3", wks: "Wk 7–10", color: "#A78BFA", title: "Build & Configure",          desc: "Sprints 1 & 2 — HubSpot setup, scoring, workflows, integrations" },
                    { phase: "Phase 4", wks: "Wk 11–12", color: "#60A5FA",title: "Testing & Reporting",        desc: "Sprint 3 — Power BI dashboards, 85-case UAT, defect resolution" },
                    { phase: "Phase 5", wks: "Wk 13–14", color: "#10B981",title: "Deployment & Review",        desc: "Sprint 4 — data migration, training, phased go-live, PIR" },
                  ].map(({ phase, wks, color, title, desc }, i, arr) => (
                    <div key={phase} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0 pt-0.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ background: `${color}15`, border: `1.5px solid ${color}40`, color }}>
                          {i + 1}
                        </div>
                        {i < arr.length - 1 && <div className="w-px flex-1 my-1 min-h-[16px]" style={{ background: `${color}20` }} />}
                      </div>
                      <div className="pb-3">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-[#F9FAFB] text-sm font-semibold">{title}</span>
                          <Bdg color="gray">{wks}</Bdg>
                        </div>
                        <p className="text-[#9CA3AF] text-xs leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* 03 Business Problem */}
            <S id="business-problem" num="03" title="Business Problem"
              sub="Why this project existed and what was at stake commercially.">
              <p className="text-[#9CA3AF] leading-relaxed">
                TechVantage Solutions was generating 180+ inbound leads per month through paid search, content marketing,
                and LinkedIn outreach — but had no CRM. Leads were captured into four separate Google Sheets maintained by
                individual sales reps. There was no shared view, no lead ownership rules, no follow-up tracking, and no
                way for leadership to see the health of the pipeline without manually aggregating spreadsheets each week.
              </p>
              <p className="text-[#9CA3AF] leading-relaxed">
                The consequence was predictable: <span className="text-[#F9FAFB] font-medium">35% of inbound leads received
                no follow-up within 72 hours</span>. Research consistently shows that leads contacted within the first hour
                are 7× more likely to convert. At TechVantage's average deal size of $32K and 18% close rate,
                each lost lead represented meaningful revenue. The estimated annual impact was <span className="text-[#F9FAFB] font-medium">$1.8M
                in uncontacted or duplicated pipeline</span>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="35%" label="Leads with no 72-hr follow-up" c="#EF4444" note="Before project" />
                <MC v="52 hrs" label="Avg first-contact time" c="#F59E0B" note="Benchmark: &lt;1 hr" />
                <MC v="18%" label="Lead-to-close rate" c="#9CA3AF" note="Industry avg: 25–28%" />
                <MC v="$1.8M" label="Est. annual revenue leakage" c="#EF4444" note="Spreadsheet chaos" />
              </div>
              <IB t="w">
                <strong>Root commercial driver:</strong> The VP of Sales had flagged the pipeline visibility problem to the
                CEO in Q1 2024. A board meeting in March surfaced that the company could not accurately forecast Q2 revenue,
                which was affecting fundraising conversations. This project was prioritised as critical.
              </IB>
            </S>

            {/* 04 Goals & Success Metrics */}
            <S id="goals-metrics" num="04" title="Project Goals & Success Metrics"
              sub="Objectives agreed with stakeholders before requirements began. Metrics defined upfront to eliminate post-hoc interpretation.">
              <T hs={["#", "Business Goal", "Success Metric", "Baseline", "Target", "Actual"]} rows={[
                ["G1", "Create a single source of truth for lead data", "% of leads captured in CRM", "0%", "100%", "100%"],
                ["G2", "Reduce lead response time", "Avg hours to first contact", "52 hrs", "< 2 hrs", "4.2 hrs"],
                ["G3", "Improve lead-to-opportunity conversion", "% leads reaching Opportunity stage", "18%", "> 25%", "31%"],
                ["G4", "Automate manual follow-up reminders", "% follow-ups triggered automatically", "0%", "> 90%", "94%"],
                ["G5", "Reduce duplicate lead records", "Duplicates per quarter", "~200", "< 30", "12"],
                ["G6", "Deliver real-time pipeline visibility", "Dashboard availability", "None", "Live dashboard", "✓"],
                ["G7", "Reduce manual reporting effort", "Hrs/week on manual reports", "6–8 hrs", "< 1 hr", "45 min"],
                ["G8", "Improve forecast accuracy", "Forecast vs actual variance", "Unknown", "< 15%", "11%"],
              ]} />
              <IB t="s">
                All 8 success metrics were agreed in the Project Charter (signed Week 2) and tracked throughout delivery.
                6 of 8 targets were exceeded at go-live; the remaining 2 (G2, G8) were on-track within acceptable variance.
              </IB>
            </S>

            {/* 05 Stakeholder Analysis */}
            <S id="stakeholder-analysis" num="05" title="Stakeholder Analysis"
              sub="Identifying who was affected, their level of influence, and how I engaged them throughout the project.">
              <T hs={["Name", "Role", "Power", "Interest", "Engagement Strategy", "Primary Concern"]} rows={[
                ["James Okafor",  "Sales Director",          <Bdg color="red">High</Bdg>,    <Bdg color="red">High</Bdg>,    "Weekly steering meetings · sign-off authority", "Pipeline visibility & forecast accuracy"],
                ["Priya Mehta",   "Marketing Manager",       <Bdg color="yellow">Med</Bdg>,  <Bdg color="red">High</Bdg>,    "Bi-weekly syncs · requirements workshops",      "Lead source attribution & MQL handoff quality"],
                ["David Chen",    "IT Systems Lead",         <Bdg color="red">High</Bdg>,    <Bdg color="yellow">Med</Bdg>,  "Technical design reviews · sign-off on arch.",  "Security, SSO, data governance"],
                ["Rachel Torres", "Senior Account Executive",<Bdg color="green">Low</Bdg>,   <Bdg color="red">High</Bdg>,    "User interviews · UAT champion · feedback",     "Ease of use, no extra admin work"],
                ["Emma Williams", "Head of Customer Success",<Bdg color="yellow">Med</Bdg>,  <Bdg color="yellow">Med</Bdg>,  "Journey mapping session · monthly update",      "CRM data accuracy post-handoff to CS"],
                ["Liam Brooks",   "Finance Controller",      <Bdg color="green">Low</Bdg>,   <Bdg color="green">Low</Bdg>,   "Budget reviews · ROI sign-off",                 "Project cost vs projected revenue uplift"],
                ["Rohan Kapoor",  "CEO",                     <Bdg color="red">High</Bdg>,    <Bdg color="green">Low</Bdg>,   "Monthly exec briefings · escalation path",      "Forecast confidence, board-level reporting"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Power / Interest Grid</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Manage Closely (High/High)",   bg: "rgba(239,68,68,0.08)",   bd: "rgba(239,68,68,0.2)",   names: ["James Okafor (Sales Director)","Priya Mehta (Marketing)"] },
                    { label: "Keep Satisfied (High/Low)",    bg: "rgba(245,158,11,0.08)",  bd: "rgba(245,158,11,0.2)",  names: ["David Chen (IT Lead)","Rohan Kapoor (CEO)"] },
                    { label: "Keep Informed (Low/High)",     bg: "rgba(59,130,246,0.08)",  bd: "rgba(59,130,246,0.2)",  names: ["Rachel Torres (AE Champion)","Emma Williams (CS)"] },
                    { label: "Monitor (Low/Low)",            bg: "rgba(107,114,128,0.08)", bd: "rgba(107,114,128,0.2)", names: ["Liam Brooks (Finance)"] },
                  ].map(({ label, bg, bd, names }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: bg, border: `1px solid ${bd}` }}>
                      <p className="font-semibold text-[#F9FAFB] mb-2 text-[11px]">{label}</p>
                      {names.map(n => <p key={n} className="text-[#9CA3AF] text-[11px] leading-relaxed">· {n}</p>)}
                    </div>
                  ))}
                </div>
              </Glass>
            </S>

            {/* 06 Requirement Gathering */}
            <S id="req-gathering" num="06" title="Requirement Gathering Process"
              sub="The elicitation techniques I used, why I chose each, and what they surfaced.">
              <T hs={["Technique", "Sessions", "Participants", "Output", "Key Insight"]} rows={[
                ["Structured 1:1 Interviews",      "7 sessions · Wks 1–2", "All 7 stakeholders",           "Stakeholder register · Pain point list",      "52-hr response time identified as critical metric"],
                ["Requirements Workshops",         "3 sessions · Wk 3–4",  "Sales + Marketing + IT (6pp)", "Draft BRD · MoSCoW list · 47 user stories",   "Marketing and Sales had conflicting MQL definitions"],
                ["Process Observation",            "2 days · Wk 1",        "3 Sales reps (shadowed)",      "AS-IS process map · 8 friction points",       "Reps spending 45 min/day on spreadsheet admin"],
                ["Document / Data Audit",          "Wk 2",                 "BA + IT Lead",                 "Data quality report · duplicate analysis",    "~200 duplicate records/quarter across 4 sheets"],
                ["Survey (End-User Needs)",        "1 survey · Wk 2",      "12 AEs + 3 BDRs (15 total)",   "Prioritised feature list · UX preferences",   "80% of AEs wanted mobile-accessible CRM"],
                ["Prototype Review (Wireframes)", "2 sessions · Wk 5",    "5 AEs + Sales Director",       "Validated wireframes · 12 change requests",   "Lead scoring visibility was non-negotiable for reps"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Sample Interview Questions — Sales Director</h3>
                <div className="space-y-2">
                  {[
                    "Walk me through what happens from the moment a new lead comes in to when a rep first contacts them.",
                    "Where do you feel the current process breaks down most often?",
                    "If you had to make a forecast call today, what data would you be missing?",
                    "What does a 'good lead' look like to your team — and how do you currently identify one?",
                    "What would success look like for this project in 6 months?",
                  ].map((q, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-[#A78BFA] font-mono text-xs shrink-0 mt-0.5">Q{i+1}</span>
                      <p className="text-[#D1D5DB] text-sm leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </Glass>
              <IB t="i">
                <strong>BA Role:</strong> I designed all interview guides, facilitated all 3 workshops, documented outputs in
                Confluence within 24 hours of each session, and circulated for stakeholder sign-off before proceeding.
                Conflicting requirements between Marketing and Sales (MQL definition) were escalated to James Okafor and
                resolved in Workshop 2 via a structured facilitation exercise.
              </IB>
            </S>

            {/* 07 Current State */}
            <S id="current-state" num="07" title="Current State Analysis (AS-IS)"
              sub="Documenting how lead management actually worked before the project — not how stakeholders thought it worked.">
              <T hs={["Step", "Activity", "System/Tool", "Owner", "Problem"]} rows={[
                ["1", "Lead submits web form",              "Website (WordPress)",    "Marketing",   "No auto-notification — email to shared inbox"],
                ["2", "Marketing reviews form submission",  "Gmail shared inbox",     "Priya Mehta", "Often missed; avg 4–6 hr delay before anyone acts"],
                ["3", "Lead added to spreadsheet",          "Google Sheets (Sheet 1)","Priya / AE",  "Manual entry; typos, missing fields, duplicates"],
                ["4", "Lead assigned to rep (informally)",  "Slack DM",               "Sales Mgr",   "No rules; assignment based on who was online"],
                ["5", "Rep researches lead",                "LinkedIn / Google",      "AE",          "No standard research process; inconsistent depth"],
                ["6", "Rep logs first outreach attempt",    "Gmail / personal notes", "AE",          "No central log; no visibility to manager"],
                ["7", "Follow-up reminders",                "AE's personal calendar", "AE",          "Missed regularly; no escalation if no response"],
                ["8", "Deal progresses (if it does)",       "Sheet 2 (opportunities)","AE",          "Sheet 2 maintained separately; often out of sync"],
                ["9", "Weekly sales report",                "Google Sheets (Sheet 3)","Sales Mgr",   "6–8 hrs manual compilation every Friday"],
              ]} />
              <IB t="w">
                <strong>Process Observation Finding:</strong> During two days of shadowing three AEs, I observed that reps
                were spending an average of <strong>45–55 minutes per day</strong> on spreadsheet administration — entering
                data, reconciling duplicates, and searching for previous contact history. This was time not spent selling.
              </IB>
            </S>

            {/* 08 Pain Points */}
            <S id="pain-points" num="08" title="Pain Points Identified"
              sub="Synthesised from interviews, process observation, and data audit. Each pain point rated by business impact.">
              <T hs={["ID", "Pain Point", "Severity", "Source", "Quantified Impact"]} rows={[
                ["PP-01", "No single source of truth — 4 disconnected spreadsheets",     <Bdg color="red">Critical</Bdg>,    "Interviews + Audit",   "~200 duplicate records/quarter; AEs working on stale data"],
                ["PP-02", "Lead assignment by ad-hoc Slack messages",                     <Bdg color="red">Critical</Bdg>,    "Observation",          "Avg 4–6 hr assignment delay; 12% of leads unassigned after 24 hrs"],
                ["PP-03", "No automated follow-up reminders",                             <Bdg color="red">Critical</Bdg>,    "Interviews",           "35% of leads not followed up within 72 hrs"],
                ["PP-04", "No lead scoring — all leads treated equally",                  <Bdg color="yellow">High</Bdg>,     "Interviews + Survey",  "AEs spending equal time on cold and hot leads"],
                ["PP-05", "No lead source attribution",                                   <Bdg color="yellow">High</Bdg>,     "Interviews",           "Marketing unable to measure campaign ROI"],
                ["PP-06", "Sales reporting built manually every week",                    <Bdg color="yellow">High</Bdg>,     "Observation",          "6–8 hrs/week = ~$18K/year in Sales Manager time"],
                ["PP-07", "No integration between email marketing and lead data",         <Bdg color="yellow">High</Bdg>,     "Interviews",           "Marketing email clicks not visible to sales reps"],
                ["PP-08", "New leads not visible to Sales Director in real time",         <Bdg color="orange">Medium</Bdg>,   "Interviews",           "Forecast accuracy unreliable; board conversations affected"],
              ]} />
            </S>

            {/* 09 Root Cause Analysis */}
            <S id="root-cause" num="09" title="Root Cause Analysis"
              sub="Applied 5 Whys to the highest-impact pain point to ensure the solution addressed causes, not symptoms.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">5 Whys — PP-01: No Single Source of Truth</h3>
                <div className="space-y-2">
                  {[
                    { why: "Why 1", q: "Why are there 4 disconnected spreadsheets?",                              a: "Each AE created their own tracker because there was no shared system mandated by the company." },
                    { why: "Why 2", q: "Why was no shared system mandated?",                                      a: "Leadership assumed individual tracking was sufficient when the team was small (< 5 reps)." },
                    { why: "Why 3", q: "Why wasn't the system revisited as the team grew?",                       a: "No process review cadence existed; the Sales Manager was too busy generating reports to address systemic issues." },
                    { why: "Why 4", q: "Why was the Sales Manager too busy generating reports?",                   a: "All reporting was manual — no CRM or analytics tool was in place to automate data aggregation." },
                    { why: "Why 5", q: "Why was no CRM tool ever evaluated or adopted?",                          a: "No BA or operations function existed to identify the problem, quantify its cost, and build a business case." },
                  ].map(({ why, q, a }, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.35)", color: "#A78BFA" }}>
                          {i + 1}
                        </div>
                        {i < 4 && <div className="w-px flex-1 my-1 min-h-[20px]" style={{ background: "rgba(167,139,250,0.15)" }} />}
                      </div>
                      <div className="pb-4">
                        <p className="text-[11px] text-[#A78BFA] font-semibold mb-0.5 uppercase tracking-wider">{why}</p>
                        <p className="text-[#F9FAFB] text-sm font-medium mb-0.5">{q}</p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{a}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-[#10B981] text-sm font-semibold mb-1">Root Cause</p>
                  <p className="text-[#D1D5DB] text-sm leading-relaxed">
                    The absence of a centralised CRM was a <em>symptom</em> of a deeper organisational gap: no operations
                    or BA function existed to identify scaling problems before they became revenue-impacting. The solution
                    required both a technology deployment <em>and</em> a process change — without the latter, a CRM alone
                    would fail to achieve adoption.
                  </p>
                </div>
              </Glass>
              <T hs={["Category", "Contributing Factors"]} rows={[
                ["People",     "No CRM champion, no process owner, individual habits entrenched, resistance to change"],
                ["Process",    "No lead assignment rules, no SLA for first contact, no escalation path for uncontacted leads"],
                ["Technology", "No CRM platform, no marketing-sales integration, manual-only reporting"],
                ["Data",       "No data standards, no deduplication, no lead source tracking, inconsistent field use"],
              ]} />
            </S>

            {/* 10 Gap Analysis */}
            <S id="gap-analysis" num="10" title="Gap Analysis"
              sub="Structured comparison of current capabilities vs required capabilities to define the true scope of change.">
              <T hs={["Capability Area", "Current State", "Required State", "Gap", "Priority"]} rows={[
                ["Lead Capture",       "Manual entry into spreadsheets",          "Auto-capture from web forms into CRM",           "High",  <Bdg color="red">Critical</Bdg>],
                ["Lead Assignment",    "Ad-hoc Slack messages",                   "Rules-based auto-assignment (territory + round-robin)", "High", <Bdg color="red">Critical</Bdg>],
                ["Lead Scoring",       "None — all leads equal",                  "Demographic + behavioural scoring model",        "High",  <Bdg color="red">Critical</Bdg>],
                ["Follow-up Tracking", "Personal calendars / no tracking",        "Automated task creation + escalation",           "High",  <Bdg color="red">Critical</Bdg>],
                ["Pipeline Visibility","Weekly manual report (Fri afternoon)",     "Real-time dashboard (HubSpot + Power BI)",       "High",  <Bdg color="yellow">High</Bdg>],
                ["Email Integration",  "No link between Mailchimp and CRM",       "Bidirectional sync — email engagement in CRM",   "Med",   <Bdg color="yellow">High</Bdg>],
                ["Reporting",          "6–8 hrs/week manual spreadsheet build",   "Automated dashboards with scheduled exports",    "Med",   <Bdg color="yellow">High</Bdg>],
                ["Data Quality",       "~200 duplicates/quarter, inconsistent fields","Deduplication rules, mandatory fields, validation","Med", <Bdg color="orange">Medium</Bdg>],
                ["Mobile Access",      "Desktop spreadsheet only",                "HubSpot mobile app — iOS + Android",             "Low",   <Bdg color="orange">Medium</Bdg>],
                ["Forecast Accuracy",  "Unknown / manually guessed",              "Deal-stage-weighted pipeline forecast in HubSpot","High",  <Bdg color="yellow">High</Bdg>],
              ]} />
            </S>

            {/* 11 User Personas */}
            <S id="user-personas" num="11" title="User Personas"
              sub="Three primary personas developed from user interviews and observation to ground solution design in real user needs.">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    name: "Alex Rivera",
                    role: "Senior Account Executive",
                    age: "34",
                    color: "#3B82F6",
                    icon: <Users size={20} />,
                    context: "Manages 30–40 active leads at any time, runs 20+ outreach calls per week. Highly results-driven but frustrated by admin overhead.",
                    goals: ["Clear view of my prioritised lead queue", "Zero time on data entry", "Instant context when a lead calls back"],
                    frustrations: ["Spending 1 hr/day updating spreadsheets", "No history when a lead re-engages", "Chasing assignments via Slack"],
                    techComfort: "High",
                  },
                  {
                    name: "Priya Mehta",
                    role: "Marketing Manager",
                    age: "31",
                    color: "#A78BFA",
                    icon: <Target size={20} />,
                    context: "Generates 180+ leads/month across 6 channels. Runs bi-weekly campaigns but has no visibility on which ones produce pipeline.",
                    goals: ["See which campaigns produce SQLs, not just MQLs", "Agree a clear MQL definition with Sales", "Prove marketing ROI to the board"],
                    frustrations: ["No feedback loop from Sales on lead quality", "Can't see if leads are being followed up", "Attribution is a guessing game"],
                    techComfort: "Medium",
                  },
                  {
                    name: "James Okafor",
                    role: "Sales Director",
                    age: "42",
                    color: "#10B981",
                    icon: <BarChart3 size={20} />,
                    context: "Responsible for the full sales pipeline, team performance, and board-level forecasting. Currently blind to real-time data.",
                    goals: ["Real-time pipeline view at any moment", "Accurate Q-end forecast within 15% variance", "Identify which reps need coaching"],
                    frustrations: ["6–8 hrs/week building a report that's already stale", "Can't answer CEO's forecast question in real time", "No way to see rep activity levels"],
                    techComfort: "Low-Medium",
                  },
                ].map(({ name, role, color, icon, context, goals, frustrations, techComfort }) => (
                  <Glass key={name}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                        {icon}
                      </div>
                      <div>
                        <p className="text-[#F9FAFB] font-bold text-sm">{name}</p>
                        <p className="text-[#9CA3AF] text-xs">{role}</p>
                      </div>
                    </div>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed mb-4">{context}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color }}>Goals</p>
                        {goals.map(g => <p key={g} className="text-[#D1D5DB] text-xs leading-relaxed flex gap-1.5"><span style={{ color }} className="shrink-0">·</span>{g}</p>)}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-[#F59E0B]">Frustrations</p>
                        {frustrations.map(f => <p key={f} className="text-[#D1D5DB] text-xs leading-relaxed flex gap-1.5"><span className="text-[#F59E0B] shrink-0">·</span>{f}</p>)}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                        <span className="text-[11px] text-[#6B7280]">Tech Comfort</span>
                        <Bdg color="gray">{techComfort}</Bdg>
                      </div>
                    </div>
                  </Glass>
                ))}
              </div>
            </S>

            {/* 12 Customer Journey Map */}
            <S id="journey-map" num="12" title="Customer Journey Map"
              sub="Mapping the lead's experience across all touchpoints — capturing current friction and the improved future state.">
              <T hs={["Stage", "Lead Activity", "Company Touchpoint", "Current Pain", "TO-BE Improvement"]} rows={[
                ["Awareness",    "Discovers TechVantage via Google / LinkedIn ad", "Paid ad / SEO content",         "Ad clicks tracked but not linked to lead record",          "UTM params auto-captured in HubSpot contact"],
                ["Capture",      "Submits web form or books demo",                 "Website form / Calendly",        "Manual copy to spreadsheet; 4–6 hr delay",                 "HubSpot form auto-creates contact + notifies rep"],
                ["Assignment",   "Waits for first contact",                        "Slack DM from Sales Mgr",        "No rule, avg 52 hrs to first contact",                     "Auto-assign + rep notified in < 5 min"],
                ["First Contact","Receives first call or email from rep",          "AE outreach (email / call)",     "AE has no context; researches from scratch",               "HubSpot shows company data, form answers, page views"],
                ["Nurture",      "Receives follow-up emails, attends demo",        "Email sequence / demo call",     "No tracking if lead opens email; rep unaware",             "Mailchimp engagement synced to HubSpot contact timeline"],
                ["Qualification","Discusses fit, pain, budget, authority",         "Discovery call with AE",         "No structured qualification framework in use",             "BANT fields captured in HubSpot; score updates in real time"],
                ["Proposal",     "Receives proposal document",                     "AE sends proposal via email",    "Proposal not tracked in pipeline; no close-date field",    "Deal created in HubSpot; close date + value recorded"],
                ["Decision",     "Decides to proceed or decline",                  "AE closing call",                "No data on why deals are lost — no closed-lost reason",    "Closed-lost reason captured in HubSpot for analysis"],
              ]} />
            </S>

            {/* 13 Process Flow AS-IS */}
            <S id="process-flow" num="13" title="Business Process Flow (AS-IS)"
              sub="Documented in Lucidchart as a BPMN swim-lane diagram. Summarised here with key handoff points and failure modes.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">AS-IS Lead Flow — Swim Lanes</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { lane: "Marketing", color: "#A78BFA", steps: ["Run campaign → generate lead","Lead submits web form","Copy lead to Google Sheet 1 (manual)","Slack message to Sales Manager"] },
                    { lane: "Sales Manager", color: "#3B82F6", steps: ["Receive Slack notification (delayed)","Decide which rep to assign (informal)","Slack rep with lead details","Hope rep acknowledges"] },
                    { lane: "Account Executive", color: "#10B981", steps: ["Receive Slack DM","Research lead manually (LinkedIn/Google)","Log contact attempt in personal notes","Email or call lead","Update Sheet 2 if progressing (sometimes)","Update Sheet 3 for weekly report (Fri)"] },
                    { lane: "Lead / Prospect", color: "#F59E0B", steps: ["Waits for contact (avg 52 hrs)","May receive call/email","If no contact within 72 hrs → 35% abandon interest","If progresses → verbal follow-ups only"] },
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
                <p className="text-[#6B7280] text-xs mt-4">⚠ Failure points: Steps 3, 4, 5, and 6 are entirely manual with no system of record and no accountability mechanism.</p>
              </Glass>
            </S>

            {/* 14 Future State */}
            <S id="future-state" num="14" title="Future State Process (TO-BE)"
              sub="Redesigned lead flow leveraging HubSpot automation to eliminate manual handoffs and enforce process consistency.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">TO-BE Lead Flow — With HubSpot</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { lane: "Marketing", color: "#A78BFA", steps: ["Campaign runs (Mailchimp / LinkedIn)","Lead clicks → UTM auto-captured","Form submit → HubSpot contact auto-created","Score auto-calculated from demographic data"] },
                    { lane: "HubSpot Automation", color: "#3B82F6", steps: ["Score threshold check → MQL if ≥ 40","Auto-assign to rep (territory rules + round-robin)","Slack + email notification to rep (< 5 min)","Task created: 'Call within 1 business hour'","If no activity in 24 hrs → escalation alert to Sales Mgr"] },
                    { lane: "Account Executive", color: "#10B981", steps: ["Receives notification + full lead context","Views contact timeline (page views, email opens)","Logs call outcome in HubSpot (1 click)","Score updates automatically post-interaction","Deal created if qualified → pipeline stage set"] },
                    { lane: "Sales Manager / Director", color: "#F59E0B", steps: ["Power BI dashboard updates in real time","Pipeline view by rep / stage / source","Forecast auto-calculated by deal stage weighting","Weekly report auto-generated (no manual build)"] },
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
              <IB t="s">
                <strong>Key design decision:</strong> The escalation rule (no activity → 24-hr Sales Manager alert) was
                specifically requested by James Okafor to address PP-03. It was the single change he expected would have
                the largest immediate impact on response time. Post-go-live data confirmed he was correct.
              </IB>
            </S>

            {/* 15 BRD */}
            <S id="brd" num="15" title="Business Requirements Document (BRD)"
              sub="Extracted from the 28-page BRD. Each requirement maps to a business goal and has a defined acceptance criterion.">
              <T hs={["ID", "Priority", "Business Requirement", "Source", "Acceptance Criterion"]} rows={[
                ["BR-001", <Bdg color="red">Must</Bdg>,    "System shall provide a single source of truth for all lead and contact data",                 "PP-01 / G1", "100% of leads exist only in HubSpot after migration"],
                ["BR-002", <Bdg color="red">Must</Bdg>,    "System shall auto-assign leads to reps based on defined territory and round-robin rules",     "PP-02 / G2", "Lead assigned < 5 min of capture with no manual action"],
                ["BR-003", <Bdg color="red">Must</Bdg>,    "System shall track all lead interactions with full chronological history",                    "PP-06",      "All calls, emails, notes visible on contact timeline"],
                ["BR-004", <Bdg color="red">Must</Bdg>,    "System shall provide real-time pipeline visibility to Sales Manager and Director",            "PP-08 / G6", "Dashboard reflects pipeline changes < 15 min delay"],
                ["BR-005", <Bdg color="red">Must</Bdg>,    "System shall automate follow-up task creation and escalation for uncontacted leads",          "PP-03 / G4", "Task auto-created; escalation fires if no activity in 24 hrs"],
                ["BR-006", <Bdg color="red">Must</Bdg>,    "System shall integrate bidirectionally with Mailchimp for email engagement data",             "PP-07",      "Email opens/clicks appear in HubSpot contact timeline"],
                ["BR-007", <Bdg color="red">Must</Bdg>,    "System shall calculate and display lead scores based on defined scoring model",               "PP-04",      "Score visible on contact record; updates in real time"],
                ["BR-008", <Bdg color="yellow">Should</Bdg>,"System shall provide automated weekly performance reports for Sales Director",               "PP-06 / G7", "Report auto-delivered Monday 08:00 — no manual input"],
                ["BR-009", <Bdg color="yellow">Should</Bdg>,"System shall capture lead source attribution for all inbound leads",                        "PP-05",      "Source field populated on 100% of new contacts"],
                ["BR-010", <Bdg color="yellow">Should</Bdg>,"System shall support closed-lost reason capture for all lost deals",                        "G8",         "Closed-lost reason mandatory before stage change to Lost"],
                ["BR-011", <Bdg color="orange">Could</Bdg>, "System shall be accessible via mobile app (iOS and Android)",                               "Survey",     "HubSpot mobile app — all core lead actions available"],
                ["BR-012", <Bdg color="gray">Won't</Bdg>,  "System shall integrate with Finance for invoice generation (Phase 2 scope)",                 "Liam Brooks","Out of scope for Phase 1 — documented in backlog"],
              ]} />
            </S>

            {/* 16 Functional Requirements */}
            <S id="functional-req" num="16" title="Functional Requirements"
              sub="Derived from BRD. Each FR specifies exactly what the system must do — the developer target.">
              <T hs={["ID", "Module", "Functional Requirement", "BR Ref", "Priority"]} rows={[
                ["FR-001", "Lead Capture",    "System shall auto-create a HubSpot contact on web form submission with all form fields mapped",             "BR-001", <Bdg color="red">Must</Bdg>],
                ["FR-002", "Lead Capture",    "System shall capture UTM source, medium, and campaign parameters on all inbound contacts",                  "BR-009", <Bdg color="red">Must</Bdg>],
                ["FR-003", "Assignment",      "System shall assign leads to reps based on territory (region) with round-robin fallback for same region",   "BR-002", <Bdg color="red">Must</Bdg>],
                ["FR-004", "Assignment",      "System shall send email + Slack notification to assigned rep within 5 minutes of lead creation",            "BR-002", <Bdg color="red">Must</Bdg>],
                ["FR-005", "Follow-up",       "System shall create a follow-up task for assigned rep automatically on lead creation",                      "BR-005", <Bdg color="red">Must</Bdg>],
                ["FR-006", "Follow-up",       "System shall trigger an escalation alert to Sales Manager if no rep activity within 24 hours",              "BR-005", <Bdg color="red">Must</Bdg>],
                ["FR-007", "Lead Scoring",    "System shall calculate a lead score (0–100) from demographic and behavioural criteria in real time",         "BR-007", <Bdg color="red">Must</Bdg>],
                ["FR-008", "Lead Scoring",    "System shall auto-update contact lifecycle stage to MQL when score reaches 40, SQL when score reaches 70",  "BR-007", <Bdg color="red">Must</Bdg>],
                ["FR-009", "Pipeline",        "System shall provide a Kanban-style pipeline view showing all deals by stage",                              "BR-004", <Bdg color="red">Must</Bdg>],
                ["FR-010", "Pipeline",        "System shall calculate a weighted forecast using deal-stage probability percentages",                        "BR-004", <Bdg color="yellow">Should</Bdg>],
                ["FR-011", "Integration",     "System shall sync Mailchimp contact email open and click events to the HubSpot contact timeline",           "BR-006", <Bdg color="red">Must</Bdg>],
                ["FR-012", "Integration",     "System shall push new HubSpot contacts to Mailchimp marketing lists based on lifecycle stage",              "BR-006", <Bdg color="yellow">Should</Bdg>],
                ["FR-013", "Reporting",       "System shall auto-generate a weekly performance summary and deliver via email every Monday 08:00",           "BR-008", <Bdg color="yellow">Should</Bdg>],
                ["FR-014", "Data Quality",    "System shall prevent duplicate contacts using email address as unique identifier at point of creation",      "BR-001", <Bdg color="red">Must</Bdg>],
                ["FR-015", "Closed-Lost",     "System shall require a closed-lost reason selection before a deal can be moved to the Closed-Lost stage",   "BR-010", <Bdg color="yellow">Should</Bdg>],
              ]} />
            </S>

            {/* 17 Non-Functional Requirements */}
            <S id="non-functional-req" num="17" title="Non-Functional Requirements"
              sub="Performance, security, and usability criteria that define HOW the system must behave — commonly overlooked, always critical.">
              <T hs={["ID", "Category", "Requirement", "Measurement", "Priority"]} rows={[
                ["NFR-001", "Performance",   "HubSpot dashboard pages shall load within 3 seconds for 95% of requests",                    "Google Lighthouse / HubSpot monitoring",        <Bdg color="red">Must</Bdg>],
                ["NFR-002", "Performance",   "Lead auto-assignment workflow shall complete within 5 minutes of form submission",            "HubSpot workflow execution log timestamp",       <Bdg color="red">Must</Bdg>],
                ["NFR-003", "Availability",  "HubSpot platform shall maintain 99.9% uptime (per HubSpot SLA)",                            "HubSpot status page / SLA",                     <Bdg color="red">Must</Bdg>],
                ["NFR-004", "Security",      "All user access shall require SSO via Google Workspace — no standalone passwords",           "IT audit — zero local HubSpot passwords",        <Bdg color="red">Must</Bdg>],
                ["NFR-005", "Security",      "Contact data shall be stored in HubSpot EU data centre to comply with GDPR",                 "HubSpot account data residency setting",          <Bdg color="red">Must</Bdg>],
                ["NFR-006", "Usability",     "New users shall be able to log a call, create a task, and update a deal stage within 15 min of first use (post-training)", "Observed during UAT user testing", <Bdg color="yellow">Should</Bdg>],
                ["NFR-007", "Scalability",   "System shall support team growth to 30 AEs without requiring re-architecture",               "HubSpot Professional tier capacity (300 users)", <Bdg color="yellow">Should</Bdg>],
                ["NFR-008", "Data Integrity","Deduplication rule shall prevent > 5% duplicate contacts per quarter post go-live",          "Quarterly data audit report",                    <Bdg color="red">Must</Bdg>],
              ]} />
              <IB t="i">
                NFR-004 and NFR-005 were non-negotiable requirements from David Chen (IT Systems Lead). SSO was required
                as part of the company's ISO 27001 compliance programme. GDPR data residency was flagged by Legal after
                the project scope review in Week 2 — added to requirements immediately.
              </IB>
            </S>

            {/* 18 User Stories */}
            <S id="user-stories" num="18" title="User Stories"
              sub="47 user stories written in Jira across 4 epics. Sample of the highest-priority stories shown here.">
              <div className="space-y-5">
                {[
                  {
                    epic: "EPIC-01: Lead Capture & Assignment", color: "#3B82F6",
                    stories: [
                      { id: "US-001", pts: 5,  persona: "Marketing Manager", story: "I want all web form submissions to automatically create a HubSpot contact so that no lead is ever missed due to manual entry failure.", priority: "Must" },
                      { id: "US-002", pts: 8,  persona: "Account Executive", story: "I want to be notified via Slack when a new lead is assigned to me so that I can respond within the 1-hour SLA.", priority: "Must" },
                      { id: "US-003", pts: 5,  persona: "Sales Manager",     story: "I want leads auto-assigned based on territory rules so that assignment is fair, consistent, and instant.", priority: "Must" },
                    ]
                  },
                  {
                    epic: "EPIC-02: Lead Scoring & Qualification", color: "#A78BFA",
                    stories: [
                      { id: "US-010", pts: 8,  persona: "Account Executive", story: "I want each contact to display a lead score so that I can prioritise my outreach queue by likelihood to convert.", priority: "Must" },
                      { id: "US-011", pts: 5,  persona: "Marketing Manager", story: "I want leads to automatically move to MQL status when their score hits 40 so that Sales receives only qualified leads.", priority: "Must" },
                      { id: "US-012", pts: 3,  persona: "Sales Director",    story: "I want to see each rep's average lead score at assignment so that I can evaluate lead quality vs rep performance separately.", priority: "Should" },
                    ]
                  },
                  {
                    epic: "EPIC-03: Follow-up Automation", color: "#10B981",
                    stories: [
                      { id: "US-020", pts: 8,  persona: "Account Executive", story: "I want a follow-up task automatically created when I receive a new lead so that nothing falls through the cracks if I'm in back-to-back calls.", priority: "Must" },
                      { id: "US-021", pts: 5,  persona: "Sales Manager",     story: "I want to be notified if any of my reps has not contacted a new lead within 24 hours so that I can intervene before the lead goes cold.", priority: "Must" },
                      { id: "US-022", pts: 3,  persona: "Account Executive", story: "I want to log a call outcome in one click directly from the contact record so that admin time is minimised.", priority: "Must" },
                    ]
                  },
                  {
                    epic: "EPIC-04: Reporting & Dashboards", color: "#F59E0B",
                    stories: [
                      { id: "US-030", pts: 13, persona: "Sales Director",    story: "I want a live Power BI dashboard showing pipeline by stage, rep, and source so that I can answer forecast questions instantly.", priority: "Must" },
                      { id: "US-031", pts: 8,  persona: "Sales Manager",     story: "I want an automated weekly summary report delivered to my email each Monday so that I never spend Friday afternoon building reports.", priority: "Should" },
                      { id: "US-032", pts: 5,  persona: "Marketing Manager", story: "I want to see which lead sources produce the highest SQL conversion rate so that I can optimise marketing budget allocation.", priority: "Should" },
                    ]
                  },
                ].map(({ epic, color, stories }) => (
                  <Glass key={epic}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                      <h3 className="text-[#F9FAFB] text-sm font-semibold">{epic}</h3>
                    </div>
                    <div className="space-y-3">
                      {stories.map(({ id, pts, persona, story, priority }) => (
                        <div key={id} className="rounded-xl p-4 bg-white/[0.02] border border-white/[0.05]">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Bdg color="gray">{id}</Bdg>
                            <Bdg color="blue">{persona}</Bdg>
                            <Bdg color={priority === "Must" ? "red" : "yellow"}>{priority}</Bdg>
                            <span className="ml-auto text-[11px] font-mono font-semibold" style={{ color }}>{pts} pts</span>
                          </div>
                          <p className="text-[#9CA3AF] text-xs leading-relaxed">
                            <span className="text-[#F9FAFB] font-medium">As a {persona}</span>, {story}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Glass>
                ))}
              </div>
            </S>

            {/* 19 Acceptance Criteria */}
            <S id="acceptance-criteria" num="19" title="Acceptance Criteria"
              sub="Given/When/Then format for three core stories. Agreed with Product Owner before Sprint 1 started.">
              {[
                {
                  id: "US-002", title: "Slack notification on lead assignment", color: "#3B82F6",
                  criteria: [
                    { g: "A new contact is created in HubSpot via web form submission",                         w: "The assignment workflow runs successfully",         t: "The assigned rep receives a Slack DM within 5 minutes containing: lead name, company, source, and a direct HubSpot link" },
                    { g: "The assigned rep's territory is 'APAC' and no round-robin rule exists for that region",w: "A new lead with company country = Australia is captured", t: "The lead is assigned to the APAC rep and the round-robin counter is not affected" },
                    { g: "All 3 APAC reps have the workflow paused (out of office)",                             w: "A new APAC lead is captured",                       t: "The lead is assigned to the Sales Manager and flagged for manual re-assignment" },
                  ]
                },
                {
                  id: "US-010", title: "Lead score displayed on contact record", color: "#A78BFA",
                  criteria: [
                    { g: "A contact exists in HubSpot with job title 'VP of Operations' and company size 200–500", w: "The contact record is viewed",                    t: "Score shows ≥ 25 (15 pts for company size band + 10 pts for VP title)" },
                    { g: "A contact opens a marketing email and clicks through to the pricing page",               w: "The email engagement event syncs from Mailchimp", t: "Score increases by 15 pts within 10 minutes of the sync" },
                    { g: "A contact score reaches 70",                                                             w: "The lifecycle stage workflow triggers",             t: "Contact lifecycle stage changes to 'Sales Qualified Lead' and rep receives a task notification" },
                  ]
                },
                {
                  id: "US-021", title: "Sales Manager 24-hour escalation alert", color: "#10B981",
                  criteria: [
                    { g: "A lead was assigned to an AE at 09:00 Monday",                                         w: "It is now 09:01 Tuesday (25 hours later) and no activity is logged", t: "Sales Manager receives an email titled '[ACTION REQUIRED] Uncontacted lead — [Lead Name]' with a direct link" },
                    { g: "An AE logs a call outcome on the contact at 23:00",                                     w: "The 24-hour escalation window check runs at 09:00 the next day", t: "No escalation fires — system correctly identifies activity was logged within 24 hrs" },
                    { g: "A lead is marked as 'Do Not Contact' by the rep",                                       w: "The 24-hour window passes with no outreach activity", t: "No escalation fires — system respects the DNC flag as a valid contact disposition" },
                  ]
                },
              ].map(({ id, title, color, criteria }) => (
                <Glass key={id}>
                  <div className="flex items-center gap-2 mb-5">
                    <Bdg color="gray">{id}</Bdg>
                    <span className="text-[#F9FAFB] text-sm font-semibold">{title}</span>
                  </div>
                  <div className="space-y-3">
                    {criteria.map(({ g, w, t }, i) => (
                      <div key={i} className="rounded-xl p-4 bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
                        <p className="text-[#D1D5DB] leading-relaxed"><span className="font-semibold" style={{ color }}>Given</span> {g}</p>
                        <p className="text-[#D1D5DB] leading-relaxed"><span className="font-semibold text-[#60A5FA]">When</span> {w}</p>
                        <p className="text-[#D1D5DB] leading-relaxed"><span className="font-semibold text-[#10B981]">Then</span> {t}</p>
                      </div>
                    ))}
                  </div>
                </Glass>
              ))}
            </S>

            {/* 20 MoSCoW */}
            <S id="moscow" num="20" title="MoSCoW Prioritization"
              sub="Used in Workshop 2 to align stakeholders on scope. Prevented scope creep throughout delivery.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Must Have",  color: "#EF4444", bg: "rgba(239,68,68,0.07)", bd: "rgba(239,68,68,0.2)",
                    items: ["Auto lead capture from web forms","Territory-based lead assignment","24-hr escalation automation","Lead scoring model (demographic + behavioural)","HubSpot ↔ Mailchimp integration","Real-time pipeline dashboard","Deduplication on email address","Closed-lost reason field"] },
                  { label: "Should Have", color: "#F59E0B", bg: "rgba(245,158,11,0.07)", bd: "rgba(245,158,11,0.2)",
                    items: ["Automated weekly email report","Deal-stage weighted forecast","Lead source attribution dashboard","Closed-lost reason analytics","Power BI executive dashboard","Rep activity leaderboard"] },
                  { label: "Could Have",  color: "#3B82F6", bg: "rgba(59,130,246,0.07)", bd: "rgba(59,130,246,0.2)",
                    items: ["HubSpot mobile app rollout","Lead re-engagement workflow (90-day dormant)","Calendly booking integration","Competitor tracking field","Custom deal probability overrides"] },
                  { label: "Won't Have (Phase 1)", color: "#6B7280", bg: "rgba(107,114,128,0.07)", bd: "rgba(107,114,128,0.2)",
                    items: ["Finance / invoice integration","AI-generated call summaries","Customer health score (CS)","Multi-currency deal values","Partner / channel lead tracking"] },
                ].map(({ label, color, bg, bd, items }) => (
                  <div key={label} className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${bd}` }}>
                    <p className="font-bold text-sm mb-4" style={{ color }}>{label}</p>
                    <ul className="space-y-1.5">
                      {items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-[#D1D5DB] text-xs leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </S>

            {/* 21 Process Mapping */}
            <S id="process-mapping" num="21" title="Process Mapping"
              sub="Formal BPMN-style process maps created in Lucidchart. Three maps produced: Lead Intake, Qualification, and Reporting.">
              <T hs={["Map ID", "Process", "Scope", "Swimlanes", "Key Decision Points", "Tool"]} rows={[
                ["PM-01", "Lead Intake & Assignment",     "Web form → Lead assigned to rep",                     "Marketing / HubSpot Automation / AE",              "Score threshold check · Territory match · Round-robin", "Lucidchart"],
                ["PM-02", "Lead Qualification & Lifecycle","New Lead → MQL → SQL → Opportunity",                 "AE / Sales Manager / HubSpot Automation",           "BANT qualification criteria · Stage advancement rules", "Lucidchart"],
                ["PM-03", "Deal Close & Reporting",        "Opportunity → Proposal → Closed Won/Lost → Report",  "AE / Sales Director / Power BI",                    "Deal stage gate criteria · Closed-lost reason mandatory","Lucidchart"],
              ]} />
              <IB t="i">
                <strong>Methodology:</strong> I used BPMN 2.0 notation (tasks, gateways, events, swimlanes) to ensure
                the maps were understandable to both business and technical stakeholders. Maps were reviewed in Workshop 3
                and signed off by James Okafor and David Chen before build began. Each map is version-controlled in Confluence.
              </IB>
            </S>

            {/* 22 Wireframes */}
            <S id="wireframes" num="22" title="Wireframes & Solution Design"
              sub="Low-fidelity wireframes produced in Figma during Week 5. Validated with 5 AEs and the Sales Director in prototype review sessions.">
              <div className="space-y-5">
                <Glass>
                  <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Screen 1 — AE Lead Queue View</h3>
                  <div className="rounded-xl overflow-hidden border border-white/[0.1]" style={{ background: "#0A0E18" }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08]" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="flex gap-1.5">{["#EF4444","#F59E0B","#10B981"].map(c=><div key={c} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}</div>
                      <span className="text-[#4B5563] text-xs ml-2 font-mono">HubSpot CRM — My Leads · Alex Rivera</span>
                    </div>
                    <div className="p-4 font-mono text-[11px] text-[#9CA3AF] leading-relaxed whitespace-pre">{`┌──────────────────────────────────────────────────────────────────┐
│  My Leads (47)                             [+ Add Lead]  [Filter] │
├─────────────┬────────────────┬───────────┬──────────┬────────────┤
│ CONTACT     │ COMPANY        │ STAGE     │ SCORE    │ LAST TOUCH │
├─────────────┼────────────────┼───────────┼──────────┼────────────┤
│ ● L. Brown  │ DataCore Ltd   │ SQL       │ ████░ 83 │ 12 min ago │
│ ● J. Smith  │ Acme Corp      │ MQL       │ ███░░ 67 │ 2 hrs ago  │
│ ○ M. Patel  │ TechStart Inc  │ New Lead  │ ██░░░ 41 │ 5 hrs ago  │
│ ○ S. Kim    │ GlobalOps Ltd  │ New Lead  │ █░░░░ 28 │ 1 day ago ⚠│
│ ○ R. Wang   │ FinancePro     │ New Lead  │ █░░░░ 22 │ 2 days ago⚠│
└─────────────┴────────────────┴───────────┴──────────┴────────────┘
  ⚠ = No contact attempt logged — escalation sent to manager`}</div>
                  </div>
                  <p className="text-[#6B7280] text-xs mt-3">Validation finding: AEs requested the ⚠ indicator to be red, not orange. Implemented in Sprint 1.</p>
                </Glass>
                <Glass>
                  <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Screen 2 — Contact Record Detail</h3>
                  <div className="rounded-xl overflow-hidden border border-white/[0.1]" style={{ background: "#0A0E18" }}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08]" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="flex gap-1.5">{["#EF4444","#F59E0B","#10B981"].map(c=><div key={c} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}</div>
                      <span className="text-[#4B5563] text-xs ml-2 font-mono">Contact: Laura Brown · DataCore Ltd</span>
                    </div>
                    <div className="p-4 font-mono text-[11px] text-[#9CA3AF] whitespace-pre">{`┌──────────────────────┐  ┌───────────────────────────────────────┐
│ Laura Brown          │  │ ACTIVITY TIMELINE                     │
│ VP of Engineering    │  │ ─────────────────────────────────     │
│ DataCore Ltd (450pp) │  │ ● Today 09:14  Email opened (Mailchmp)│
│ London, UK           │  │ ● Yesterday    Page: /pricing (3 min) │
│ laura@datacore.io    │  │ ● Mon 14 Apr   Form submitted (demo)  │
├──────────────────────┤  │ ● Mon 14 Apr   Lead created · Score 41│
│ Lead Score:  ████ 83 │  │ ● Mon 14 Apr   Assigned to A. Rivera  │
│ Stage: SQL           │  │ ● Mon 14 Apr   Follow-up task created │
│ Source: LinkedIn Ad  │  └───────────────────────────────────────┘
│ Assigned: A. Rivera  │  [ Log Call ]  [ Send Email ]  [ Create Deal ]
└──────────────────────┘`}</div>
                  </div>
                  <p className="text-[#6B7280] text-xs mt-3">Validation finding: "Create Deal" CTA was added after AE feedback in prototype session — not in v1 wireframe.</p>
                </Glass>
              </div>
            </S>

            {/* 23 CRM Data Model */}
            <S id="data-model" num="23" title="CRM Data Model"
              sub="Core entities configured in HubSpot with custom properties defined by BA. 12 custom properties added beyond HubSpot defaults.">
              <T hs={["Entity", "Key Fields", "Type", "Custom?", "Purpose"]} rows={[
                ["Contact", "First Name, Last Name, Email, Phone, Company, Job Title, Lead Score, Lifecycle Stage, Lead Source, Territory, BANT Qualified (Y/N)", "Standard + Custom", "5 custom", "Primary person record — unique by email"],
                ["Company", "Company Name, Domain, Industry, Company Size Band, Annual Revenue Band, Country, ICP Tier", "Standard + Custom", "3 custom", "Parent record — contacts associated to company"],
                ["Deal",    "Deal Name, Amount, Close Date, Deal Stage, Pipeline, Closed-Lost Reason, Deal Source, AE Owner", "Standard + Custom", "2 custom", "Opportunity tracking — created when lead qualifies"],
                ["Activity","Call Date/Time, Call Duration, Call Outcome, Email Subject, Email Direction, Meeting Date, Notes", "Standard", "0 custom", "Interaction log on contact/deal timeline"],
                ["Task",    "Task Type, Due Date, Status, Associated Contact, Owner, Auto-Created Flag", "Standard + Custom", "1 custom", "Follow-up actions — auto-created by workflows"],
              ]} />
              <IB t="i">
                <strong>12 Custom Properties Created:</strong> Lead Score (number), Territory (dropdown: EMEA/APAC/NA/LATAM),
                ICP Tier (dropdown: Tier 1/2/3), BANT Qualified (boolean), Lead Response Time Hours (number, auto-calculated),
                Days in Current Stage (number), Closed-Lost Reason (dropdown: 10 options), Campaign Name (text),
                Competitor Mentioned (dropdown), Next Step Date (date), Data Migration Source (text), Original Source Detail (text).
              </IB>
            </S>

            {/* 24 Lead Lifecycle */}
            <S id="lead-lifecycle" num="24" title="Lead Lifecycle Design"
              sub="7-stage lifecycle defined in HubSpot. Entry and exit criteria agreed with Sales and Marketing before configuration began.">
              <T hs={["Stage", "Definition", "Entry Criteria", "Exit Criteria / Next Stage", "Auto Trigger"]} rows={[
                ["New Lead",        "Contact exists in CRM, not yet assessed",          "Form submit / manual import",                "Score calculated; if < 40 → Subscriber. If ≥ 40 → MQL",  "Auto-assignment workflow"],
                ["Subscriber",      "Low-score contact in nurture sequence",             "Lead score < 40",                           "Score reaches 40 (MQL) via email/web engagement",         "Mailchimp nurture sequence enrolment"],
                ["MQL",             "Marketing-qualified; meets demographic threshold",  "Lead score ≥ 40",                           "AE logs discovery call booked → SQL",                     "Notification to assigned AE"],
                ["SQL",             "Sales-qualified; BANT criteria met",                "AE confirms BANT qualified in HubSpot",     "AE creates a Deal in pipeline → Opportunity",             "AE follow-up task created"],
                ["Opportunity",     "Active deal in pipeline with close date set",       "Deal created; close date + amount entered", "Proposal sent → Proposal stage",                          "Deal stage probability set (20%)"],
                ["Proposal Sent",   "Proposal delivered; awaiting decision",             "AE marks proposal sent",                    "Verbal yes → Negotiation; decline → Closed-Lost",         "Deal probability updates to 60%"],
                ["Closed Won / Lost","Final deal outcome recorded",                      "AE confirms outcome",                       "Closed Won → CS handoff. Closed Lost → reason required",  "CS handoff task / lost reason mandatory"],
              ]} />
            </S>

            {/* 25 Lead Scoring */}
            <S id="lead-scoring" num="25" title="Lead Scoring Framework"
              sub="Built in Excel, validated against 6 months of historical data, then configured in HubSpot. Thresholds calibrated to match the company's actual conversion patterns.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Glass>
                  <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Demographic Score (Max 60 pts)</h3>
                  <T hs={["Criterion", "Value / Band", "Points"]} rows={[
                    ["Job Title — Decision Maker", "C-Suite, VP, Director", "25"],
                    ["Job Title — Influencer",     "Manager, Lead, Senior", "15"],
                    ["Job Title — No Influence",   "Analyst, Coordinator",  "5"],
                    ["Company Size — ICP Fit",     "100–1,000 employees",   "15"],
                    ["Company Size — Stretch",     "1,001–5,000 employees", "10"],
                    ["Company Size — Poor Fit",    "> 5,000 or < 50",       "0"],
                    ["Industry — Primary ICP",     "SaaS, FinTech, HealthTech", "15"],
                    ["Industry — Secondary ICP",   "Professional Services, Retail", "8"],
                    ["Industry — Tertiary",        "All others",            "0"],
                    ["Region — Core Market",       "UK, USA, Canada",       "5"],
                    ["Region — Growth Market",     "ANZ, DACH, Benelux",    "3"],
                  ]} />
                </Glass>
                <Glass>
                  <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Behavioural Score (Max 40 pts)</h3>
                  <T hs={["Behaviour", "Event", "Points"]} rows={[
                    ["Demo Request",        "Form submit: book-a-demo",       "+30"],
                    ["Pricing Page Visit",  "> 90 sec on /pricing",           "+15"],
                    ["Email Click-Through", "Clicks CTA in Mailchimp email",  "+10"],
                    ["Email Open",          "Opens a Mailchimp email",        "+5"],
                    ["Case Study View",     "Visits any /case-study page",    "+8"],
                    ["Webinar Attended",    "Attends a live webinar",         "+15"],
                    ["Re-engagement",       "Returns to site after 30+ days", "+10"],
                    ["Score Decay",         "No activity for 30 days",        "−10"],
                    ["Unsubscribe",         "Mailchimp unsubscribe event",    "−30"],
                  ]} />
                  <div className="mt-4 pt-4 border-t border-white/[0.07] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">MQL Threshold</span>
                      <Bdg color="yellow">Score ≥ 40</Bdg>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">SQL Threshold</span>
                      <Bdg color="green">Score ≥ 70</Bdg>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9CA3AF]">Maximum Score</span>
                      <Bdg color="purple">100 pts</Bdg>
                    </div>
                  </div>
                </Glass>
              </div>
              <IB t="i">
                <strong>Calibration:</strong> Thresholds were set after analysing 6 months of historical closed-won deals.
                I exported all Closed Won contacts, reconstructed their demographic and behavioural signals, and found
                87% of closed-won contacts would have scored ≥ 70 under this model — validating the SQL threshold.
                The MQL threshold of 40 was calibrated to pass approximately 35% of all inbound leads to Sales, matching
                the team's stated capacity of ~60 SQLs/month from 180 monthly leads.
              </IB>
            </S>

            {/* 26 Dashboard Requirements */}
            <S id="dashboard-req" num="26" title="Dashboard Requirements"
              sub="Three dashboards specified for different audiences. Requirements gathered in stakeholder interviews, prototyped in Figma, built in HubSpot + Power BI.">
              <T hs={["Dashboard", "Audience", "Update Frequency", "Key Widgets", "Delivery"]} rows={[
                ["Sales Rep Daily View",    "Account Executives (12)", "Real-time (< 5 min)",   "My lead queue (by score) · Today's tasks · Lead response time · Activity log", "HubSpot in-app"],
                ["Sales Manager Pipeline",  "Sales Manager",           "Real-time (< 15 min)",  "Pipeline by stage (count + value) · Rep activity heatmap · MQL → SQL conversion · Overdue follow-ups", "HubSpot + Power BI"],
                ["Executive Pipeline View", "Sales Director / CEO",    "Daily refresh (06:00)", "Total pipeline value · Weighted forecast · Win rate trend (12 months) · Revenue by lead source · Avg sales cycle", "Power BI (embedded)"],
              ]} />
              <IB t="i">
                <strong>Design decision:</strong> I recommended Power BI for the Executive Dashboard (rather than HubSpot
                native) because James Okafor needed to overlay HubSpot pipeline data with finance data (bookings vs targets)
                that lived in a separate Excel model. Power BI's multi-source data model was the only option that could
                serve both datasets in a single view without manual exports.
              </IB>
            </S>

            {/* 27 Reporting Requirements */}
            <S id="reporting-req" num="27" title="Reporting Requirements"
              sub="Scheduled reports defined, agreed, and automated to replace the 6–8 hours of manual Friday reporting.">
              <T hs={["Report Name", "Audience", "Frequency", "Delivery", "Key Metrics"]} rows={[
                ["Weekly Pipeline Summary",   "Sales Director",       "Monday 08:00",   "Auto email",           "New leads WTD · SQLs created · Deals opened · Pipeline value added"],
                ["Rep Activity Report",       "Sales Manager",        "Monday 08:00",   "Auto email",           "Calls logged / rep · Emails sent / rep · Tasks completed vs overdue"],
                ["Lead Source Attribution",   "Marketing Manager",    "Monthly (1st)",  "Auto email",           "Leads by source · MQL rate by source · SQL rate by source · Revenue by source"],
                ["Pipeline Health Check",     "Sales Manager",        "Wednesday 08:00","Auto email",           "Deals with no activity > 7 days · Deals past expected close date · Avg days per stage"],
                ["Closed-Lost Analysis",      "Sales Director",       "Monthly (1st)",  "Auto email + meeting", "Lost reasons breakdown · Lost by stage · Lost by competitor · Lost vs won ratio"],
                ["Forecast vs Actual",        "CEO / Finance",        "Monthly (1st)",  "Power BI auto-refresh","Monthly bookings vs forecast · 3-month rolling accuracy · Pipeline coverage ratio"],
              ]} />
            </S>

            {/* 28 Data Analysis */}
            <S id="data-analysis" num="28" title="Data Analysis Performed"
              sub="I conducted three analytical workstreams during discovery to quantify the problem, validate scoring thresholds, and build the business case.">
              <IB t="i">
                <strong>Tools used:</strong> SQL (exported data from HubSpot sandbox), Excel (pivot analysis, scoring model),
                Python/Pandas (duplicate detection across 4 Google Sheets), Power BI (executive dashboard prototypes).
              </IB>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Analysis 1 — Lead Response Time Distribution</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                  Exported 6 months of lead data (n=1,082) from the existing Google Sheets. Calculated time from
                  lead creation to first logged contact attempt per rep. Findings informed G2 target and SLA design.
                </p>
                <CB lang="SQL" code={`-- Lead response time analysis by rep (run on exported data in DB Browser)
SELECT
  assigned_rep,
  COUNT(*)                                                          AS total_leads,
  ROUND(AVG(hrs_to_first_contact), 1)                              AS avg_response_hrs,
  ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (
    ORDER BY hrs_to_first_contact), 1)                             AS median_response_hrs,
  SUM(CASE WHEN hrs_to_first_contact <= 1  THEN 1 ELSE 0 END)     AS within_1_hr,
  SUM(CASE WHEN hrs_to_first_contact > 72  THEN 1 ELSE 0 END)     AS over_72_hrs_no_contact,
  ROUND(SUM(CASE WHEN status = 'Closed Won' THEN 1.0 ELSE 0 END)
        / COUNT(*) * 100, 1)                                       AS win_rate_pct
FROM lead_audit
WHERE created_date >= '2023-10-01'
GROUP BY assigned_rep
ORDER BY avg_response_hrs ASC;

-- Key finding: Reps responding within 1 hr had 29% win rate
-- Reps responding after 24 hrs had 11% win rate`} />
              </Glass>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Analysis 2 — Lead Source Performance</h3>
                <CB lang="SQL" code={`-- Lead source quality analysis
SELECT
  lead_source,
  COUNT(*)                                                      AS total_leads,
  SUM(CASE WHEN lifecycle_stage = 'SQL'        THEN 1 ELSE 0 END) AS sqls,
  SUM(CASE WHEN status = 'Closed Won'          THEN 1 ELSE 0 END) AS closed_won,
  ROUND(AVG(deal_value) FILTER (
    WHERE status = 'Closed Won'), 0)                           AS avg_deal_value,
  ROUND(SUM(CASE WHEN status = 'Closed Won' THEN deal_value
    ELSE 0 END), 0)                                            AS total_revenue,
  ROUND(SUM(CASE WHEN status = 'Closed Won' THEN 1.0 ELSE 0 END)
        / NULLIF(COUNT(*), 0) * 100, 1)                       AS close_rate_pct
FROM leads
WHERE created_date >= '2023-10-01'
GROUP BY lead_source
ORDER BY total_revenue DESC;

/*  Results (summary):
    LinkedIn Ads     → close rate 24%, avg deal $38K — highest ROI
    Organic Search   → close rate 19%, avg deal $31K
    Paid Search      → close rate 12%, avg deal $27K — lowest ROI
    Referral         → close rate 41%, avg deal $44K — small volume but best quality
    Cold Outbound    → close rate 7%  — recommended reducing budget
*/`} />
                <p className="text-[#9CA3AF] text-xs mt-3 leading-relaxed">
                  <strong className="text-[#F9FAFB]">Business outcome:</strong> This analysis directly influenced Priya&apos;s Q3 marketing budget reallocation — $22K moved from Paid Search to LinkedIn and Referral programmes. Presented at the Week 6 stakeholder review.
                </p>
              </Glass>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Analysis 3 — Duplicate Detection (Python)</h3>
                <CB lang="Python" code={`import pandas as pd

# Load all 4 spreadsheets
sheets = {
    'AE_Alex':   pd.read_csv('alex_leads.csv'),
    'AE_Maria':  pd.read_csv('maria_leads.csv'),
    'AE_James':  pd.read_csv('james_leads.csv'),
    'Shared':    pd.read_csv('shared_inbound.csv'),
}

# Combine and normalise email
all_leads = pd.concat(sheets.values(), keys=sheets.keys())
all_leads['email_clean'] = (
    all_leads['email'].str.lower().str.strip()
)

# Find exact duplicates (same email across sheets)
dupes = all_leads[all_leads.duplicated('email_clean', keep=False)]
print(f"Duplicate contacts: {len(dupes)}")
print(dupes.groupby('email_clean').size().describe())

# Output: 214 duplicate contacts found across the 4 sheets
# 38 contacts appeared in 3 or more sheets simultaneously`} />
                <p className="text-[#9CA3AF] text-xs mt-3 leading-relaxed">
                  <strong className="text-[#F9FAFB]">Finding:</strong> 214 duplicate contacts identified — 19.8% of the total dataset. This was the quantified evidence used to build the business case for CRM migration. Presented to James Okafor and the board summary in Week 3.
                </p>
              </Glass>
            </S>

            {/* 29 Risk Assessment */}
            <S id="risk-assessment" num="29" title="Risk Assessment"
              sub="Risk register maintained throughout the project. Reviewed weekly in steering meetings. Ratings: Likelihood 1–5, Impact 1–5.">
              <T hs={["ID", "Risk", "L", "I", "Rating", "Mitigation", "Owner"]} rows={[
                ["R-001", "Low user adoption — reps revert to spreadsheets",                "4","4", <Bdg color="red">16</Bdg>,    "Champions programme · training · manager enforcement · quick wins in Sprint 1",    "Sales Mgr"],
                ["R-002", "Data quality issues during migration corrupt CRM",               "3","5", <Bdg color="red">15</Bdg>,    "Data cleanse sprint before migration · duplicate audit · mandatory field validation","BA + IT Lead"],
                ["R-003", "Mailchimp ↔ HubSpot integration fails in production",           "3","4", <Bdg color="yellow">12</Bdg>,  "Full integration test in HubSpot sandbox · rollback plan documented",              "IT Lead"],
                ["R-004", "Scope creep inflates Sprint 2 & 3 beyond capacity",             "4","3", <Bdg color="yellow">12</Bdg>,  "MoSCoW signed off in week 4 · change control process enforced by BA",             "BA / PO"],
                ["R-005", "Key stakeholder unavailable during critical phases",             "2","4", <Bdg color="orange">8</Bdg>,   "Deputy sign-off authority defined in RACI · decisions documented in Confluence",   "BA"],
                ["R-006", "HubSpot configuration does not support required scoring logic",  "2","4", <Bdg color="orange">8</Bdg>,   "PoC of scoring model built in sandbox before Sprint 1 commitment",                "Dev + BA"],
                ["R-007", "Lead assignment rules fail for edge cases (e.g. APAC leaves)",  "3","2", <Bdg color="green">6</Bdg>,    "All territory edge cases documented; fallback rule: assign to Sales Manager",      "Dev"],
                ["R-008", "Power BI data refresh delay exceeds 15-minute SLA",             "2","3", <Bdg color="green">6</Bdg>,    "HubSpot API rate limits reviewed; incremental refresh configured",                 "IT Lead"],
              ]} />
              <IB t="w">
                <strong>R-001 materialised partially:</strong> Two AEs continued using personal notes for the first
                two weeks post go-live. This was addressed by the Sales Manager requiring all call outcomes to be logged
                in HubSpot before the weekly review call. Adoption reached 100% by Week 3 post go-live.
              </IB>
            </S>

            {/* 30 Assumptions & Constraints */}
            <S id="assumptions" num="30" title="Assumptions & Constraints"
              sub="Documented in the BRD and reviewed with stakeholders. Assumptions were validated where possible; constraints were non-negotiable.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Glass>
                  <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Assumptions</h3>
                  <ul className="space-y-2">
                    {[
                      "All 12 AEs and 3 BDRs will participate in training before go-live",
                      "HubSpot Professional tier supports all required custom properties and workflow logic",
                      "The existing Google Sheets data is the only lead data source to be migrated",
                      "Mailchimp is the sole email marketing platform and will not change during the project",
                      "Sales Manager will enforce CRM usage as part of the performance review process post go-live",
                      "The existing website form (WordPress) can be replaced with a HubSpot-native form",
                      "UTM parameters are consistently applied to all paid marketing campaigns",
                    ].map((a, i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#D1D5DB] leading-relaxed">
                        <span className="text-[#3B82F6] font-bold shrink-0">A{i + 1}</span> {a}
                      </li>
                    ))}
                  </ul>
                </Glass>
                <Glass>
                  <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Constraints</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "Budget",        val: "Total project budget capped at $186,000 — no contingency for additional HubSpot add-ons" },
                      { label: "Timeline",      val: "Go-live must complete before August 1 to capture H2 sales cycle — non-negotiable (board request)" },
                      { label: "Platform",      val: "HubSpot was pre-selected by the CEO — Salesforce and Pipedrive were evaluated but not chosen" },
                      { label: "Data Residency",val: "All customer data must remain in EU HubSpot data centre (GDPR compliance requirement)" },
                      { label: "IT Access",     val: "No direct database access — all configuration via HubSpot UI and API (IT policy)" },
                      { label: "Training",      val: "Training must be delivered in 3 sessions of max 90 minutes — no full-day workshops" },
                    ].map(({ label, val }) => (
                      <li key={label} className="flex gap-2 text-xs leading-relaxed">
                        <span className="text-[#A78BFA] font-bold shrink-0 w-20">{label}</span>
                        <span className="text-[#D1D5DB]">{val}</span>
                      </li>
                    ))}
                  </ul>
                </Glass>
              </div>
            </S>

            {/* 31 Sprint Planning */}
            <S id="sprint-planning" num="31" title="Sprint Planning"
              sub="4 sprints of 2 weeks each following the 6-week discovery and design phase. Velocity established at 22 story points per sprint.">
              <T hs={["Sprint", "Dates", "Focus", "Stories", "Points", "Key Deliverables"]} rows={[
                ["Sprint 1", "Wk 7–8 (May 19–Jun 1)",  "Core CRM Configuration",   "US-001 to US-009",   "22 pts", "HubSpot account setup · 7 pipeline stages · 12 custom properties · user accounts (15) · SSO · web form integration"],
                ["Sprint 2", "Wk 9–10 (Jun 2–Jun 15)", "Automation & Integration", "US-010 to US-025",   "24 pts", "Lead scoring model · 6 workflows · Mailchimp integration · escalation rules · data migration (1,082 contacts)"],
                ["Sprint 3", "Wk 11–12 (Jun 16–Jun 29)","Dashboards & UAT",        "US-026 to US-038",   "28 pts", "3 HubSpot dashboards · Power BI executive dashboard · 85 UAT test cases executed · 9 defects resolved"],
                ["Sprint 4", "Wk 13–14 (Jun 30–Jul 12)","Training & Go-Live",      "US-039 to US-047",   "18 pts", "3 training sessions (15 users) · phased go-live (SMB first, Enterprise Wk 2) · PIR · handover to Sales Ops"],
              ]} />
              <IB t="s">
                Sprint 2 ran 2 story points over planned velocity due to a Mailchimp API rate-limiting issue
                discovered during integration testing. Two lower-priority stories (US-024, US-025) were moved to Sprint 3
                with Product Owner approval. No scope was dropped — the stories were delivered in Sprint 3.
              </IB>
            </S>

            {/* 32 Product Backlog */}
            <S id="product-backlog" num="32" title="Product Backlog"
              sub="47 stories managed in Jira. Top 15 highest-priority backlog items shown, reflecting the Must Have and Should Have scope.">
              <T hs={["ID", "Story Title", "Epic", "Points", "Sprint", "Priority", "Status"]} rows={[
                ["US-001", "Auto-create HubSpot contact on form submission",        "Lead Capture",   "5",  "S1", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-002", "Slack notification on lead assignment",                  "Lead Capture",   "8",  "S1", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-003", "Territory-based auto-assignment with round-robin",       "Lead Capture",   "5",  "S1", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-004", "Deduplication on email at point of contact creation",   "Lead Capture",   "3",  "S1", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-005", "UTM source/medium/campaign auto-capture",               "Lead Capture",   "3",  "S1", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-010", "Lead score visible on contact record (real-time)",      "Lead Scoring",   "8",  "S2", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-011", "Auto lifecycle stage change at score 40 (MQL) / 70 (SQL)","Lead Scoring", "5",  "S2", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-020", "Auto follow-up task on lead assignment",                "Follow-up",      "8",  "S2", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-021", "24-hr escalation alert to Sales Manager",               "Follow-up",      "5",  "S2", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-022", "One-click call outcome logging",                        "Follow-up",      "3",  "S2", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-026", "Mailchimp email engagement sync to HubSpot timeline",   "Integration",    "8",  "S2", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-030", "Power BI executive pipeline dashboard",                 "Reporting",      "13", "S3", <Bdg color="red">Must</Bdg>,    <Bdg color="green">Done</Bdg>],
                ["US-031", "Automated weekly email report (Monday 08:00)",          "Reporting",      "5",  "S3", <Bdg color="yellow">Should</Bdg>,<Bdg color="green">Done</Bdg>],
                ["US-032", "Lead source attribution dashboard",                     "Reporting",      "8",  "S3", <Bdg color="yellow">Should</Bdg>,<Bdg color="green">Done</Bdg>],
                ["US-015", "Closed-lost reason mandatory field",                    "Deal Mgmt",      "3",  "S3", <Bdg color="yellow">Should</Bdg>,<Bdg color="green">Done</Bdg>],
              ]} />
            </S>

            {/* 33 UAT Strategy */}
            <S id="uat-strategy" num="33" title="UAT Strategy"
              sub="85 test cases executed across 2 weeks. UAT led by me with Rachel Torres as end-user champion.">
              <T hs={["Attribute", "Detail"]} rows={[
                ["UAT Period",          "Week 11–12 (June 16–29, 2024)"],
                ["Test Cases",          "85 total — 42 functional, 28 integration, 10 regression, 5 performance"],
                ["UAT Lead",            "Akash Ghosh (BA) — test plan design, defect logging, triage"],
                ["End-User Champion",   "Rachel Torres (Sr. AE) — executed all user-facing test cases"],
                ["Other Participants",  "Priya Mehta (Marketing scenarios) · David Chen (SSO / security tests)"],
                ["Entry Criteria",      "All Sprint 1–3 stories merged to staging · zero P1 open defects from dev testing"],
                ["Exit Criteria",       "≥ 95% of test cases passed · zero P1 defects open · all P2 defects documented with workaround"],
                ["Test Environment",    "HubSpot sandbox (full copy of production configuration) · Mailchimp test account"],
                ["Defect Tracking",     "Jira — P1 (blocker) / P2 (major) / P3 (minor) / P4 (cosmetic)"],
                ["Sign-off Authority",  "James Okafor (UAT sign-off) + David Chen (security sign-off)"],
              ]} />
            </S>

            {/* 34 Test Cases */}
            <S id="test-cases" num="34" title="Test Cases"
              sub="Sample of 5 representative test cases from the 85-case UAT plan.">
              <T hs={["TC ID", "Test Case", "Precondition", "Steps", "Expected Result", "Priority"]} rows={[
                ["TC-001", "Lead auto-created on form submission",
                  "HubSpot form live on test website",
                  "1. Submit test form with valid data 2. Check HubSpot contacts within 5 min",
                  "New contact created with all fields populated; no duplicates; UTM fields captured",
                  <Bdg color="red">P1</Bdg>],
                ["TC-012", "Escalation fires after 24 hrs no activity",
                  "Lead assigned to test AE; no activity logged",
                  "1. Assign lead 2. Wait 25 hrs (simulate via workflow trigger) 3. Check Sales Mgr email",
                  "Sales Manager receives escalation email with lead name, assigned rep, and HubSpot link",
                  <Bdg color="red">P1</Bdg>],
                ["TC-025", "Lead score updates on email open",
                  "Contact exists in HubSpot; linked to Mailchimp list",
                  "1. Send test email from Mailchimp 2. Open email in test inbox 3. Wait for sync (up to 10 min) 4. Check contact score in HubSpot",
                  "Score increases by +5 pts; email open event appears on contact timeline",
                  <Bdg color="yellow">P2</Bdg>],
                ["TC-041", "Power BI dashboard reflects new deal within 15 min",
                  "Power BI connected to HubSpot via API; dashboard open",
                  "1. Create a new deal in HubSpot for £45,000 2. Start timer 3. Refresh Power BI dashboard",
                  "Deal appears on dashboard within 15 minutes; pipeline total updates correctly",
                  <Bdg color="yellow">P2</Bdg>],
                ["TC-058", "Duplicate contact prevented on form re-submission",
                  "Contact with email test@acme.com already exists in HubSpot",
                  "1. Submit web form using email test@acme.com 2. Check HubSpot contacts",
                  "No new contact created; existing contact updated; no duplicate record in database",
                  <Bdg color="red">P1</Bdg>],
              ]} />
            </S>

            {/* 35 Defect Management */}
            <S id="defect-management" num="35" title="Defect Management"
              sub="9 defects raised during UAT. All P1 and P2 defects resolved before go-live sign-off. Log extract shown below.">
              <T hs={["ID", "Defect", "Priority", "Root Cause", "Resolution", "Status"]} rows={[
                ["DEF-001", "Lead score not updating when Mailchimp email is opened", <Bdg color="red">P1</Bdg>,    "Mailchimp webhook not sending 'email_open' event to HubSpot due to misconfigured API key scope", "Updated Mailchimp API key with 'reports:read' scope; re-tested successfully", <Bdg color="green">Closed</Bdg>],
                ["DEF-002", "Round-robin assignment skipping Rep 3 consistently",     <Bdg color="red">P1</Bdg>,    "HubSpot workflow 'rotate' action not resetting counter after rep 2; off-by-one in config",        "Workflow reconfigured with explicit counter reset; 50 test leads distributed evenly",             <Bdg color="green">Closed</Bdg>],
                ["DEF-003", "Power BI pipeline total 3.2% below HubSpot total",       <Bdg color="yellow">P2</Bdg>, "Deals in 'Closed Won' stage excluded from Power BI query due to filter error",                    "DAX measure updated to include all deal stages; totals now match within 0.01%",                   <Bdg color="green">Closed</Bdg>],
                ["DEF-004", "Escalation email not firing for APAC time zone leads",   <Bdg color="yellow">P2</Bdg>, "Workflow trigger using static 24-hr delay based on UK time; APAC leads outside business hours", "Workflow updated to use business-hours-aware delay; APAC rep confirmed receipt in test",          <Bdg color="green">Closed</Bdg>],
                ["DEF-005", "Company size field blank for Mailchimp-sourced contacts", <Bdg color="orange">P3</Bdg>,"Mailchimp integration mapping missing 'company_size' field from form submission payload",         "Mailchimp form updated to capture company size; mapping added in HubSpot integration settings",   <Bdg color="green">Closed</Bdg>],
              ]} />
              <IB t="s">
                UAT exit criteria met on June 28 — 2 days before planned sign-off deadline.
                All P1 and P2 defects resolved. 4 P3/P4 cosmetic defects carried to Sprint 4 as improvement items.
                UAT sign-off received from James Okafor (June 29) and David Chen (June 29).
              </IB>
            </S>

            {/* 36 Deployment Strategy */}
            <S id="deployment-strategy" num="36" title="Deployment Strategy"
              sub="Phased go-live to reduce risk. SMB sales team (6 AEs) went live first; Enterprise team (6 AEs) followed one week later.">
              <T hs={["Phase", "Date", "Users", "Scope", "Rollback Plan"]} rows={[
                ["Data Migration",  "Jun 30",  "IT Lead + BA",    "1,082 contacts migrated from 4 Google Sheets into HubSpot; deduplication applied; 214 duplicates merged; data quality report signed off", "Spreadsheets retained read-only for 30 days post migration"],
                ["Wave 1 Go-Live",  "Jul 1",   "SMB AEs (6) + BDRs (3)", "SMB pipeline active in HubSpot; Google Sheet access revoked for Wave 1 team; daily check-in with Sales Mgr for first 5 days", "Reinstate Sheet access within 4 hrs if critical failure; HubSpot support on standby"],
                ["Wave 2 Go-Live",  "Jul 8",   "Enterprise AEs (6)",     "Enterprise pipeline migrated and activated; full team on HubSpot; Power BI dashboard live for Sales Director", "Same rollback as Wave 1 — no critical issues encountered in Wave 1"],
                ["Stabilisation",   "Jul 8–12","All users (15)",          "Daily adoption monitoring; open-door BA support sessions; defect fixes deployed; PIR prepared", "No rollback needed — stabilisation was smooth"],
              ]} />
              <IB t="i">
                <strong>Phased rollout rationale:</strong> A full-team simultaneous go-live was initially proposed
                by the Product Owner. I recommended the phased approach after R-001 (adoption risk) was rated High.
                Starting with the SMB team allowed us to identify adoption issues, fix them, and build internal
                testimonials before the Enterprise team — who were more resistant to change — went live.
              </IB>
            </S>

            {/* 37 Change Management */}
            <S id="change-management" num="37" title="Change Management Plan"
              sub="Applied the ADKAR model to structure the people-side of the change. Adoption was the project's highest-rated risk.">
              <T hs={["ADKAR Stage", "Activity", "Owner", "Timing", "Success Measure"]} rows={[
                ["Awareness — Why the change is needed",    "All-hands presentation by Sales Director (Week 3): 'Why spreadsheets are costing us $1.8M/year' — data shown", "James Okafor + BA", "Week 3",    "100% of team attended or watched recording"],
                ["Desire — Motivation to participate",      "Champions programme: Rachel Torres (AE champion) and Priya Mehta involved from Week 1; early access to wireframes for feedback", "BA",          "Wk 1–6",   "Champions actively advocating — measured in Workshop 3 survey"],
                ["Knowledge — How to use the new system",   "3 × 90-min training sessions segmented by role (AE, BDR, Manager); Confluence training guides published", "BA + Champions",  "Wk 13",    "Post-training quiz ≥ 80% score for all participants"],
                ["Ability — Practise the new way",          "2-week supervised use with daily 15-min open Q&A sessions; BA available on Slack for queries", "BA",          "Wk 13–14", "All 15 users logged at least one activity in HubSpot by Day 5"],
                ["Reinforcement — Sustaining the change",   "Manager enforcement: call outcomes logged before weekly sales review; quarterly data audits; PIR published to full team", "Sales Mgr",   "Ongoing",  "100% adoption at 30-day post go-live check"],
              ]} />
            </S>

            {/* 38 Training Documentation */}
            <S id="training" num="38" title="Training Documentation"
              sub="32-page training guide published to Confluence. Three role-based training sessions delivered in Week 13.">
              <T hs={["Session", "Audience", "Duration", "Format", "Topics Covered", "Materials"]} rows={[
                ["Session 1 — AE Fundamentals",  "12 AEs",           "90 min", "Live demo + hands-on practice", "Lead queue navigation · logging calls · updating stages · using mobile app · activity timeline", "Confluence guide (15pp) · Quick-reference card (1pp)"],
                ["Session 2 — BDR & Lead Management", "3 BDRs",      "60 min", "Live demo + Q&A",              "Form-to-contact flow · lead assignment visibility · task management · escalation awareness", "Confluence guide (8pp) · Video walkthrough (12 min)"],
                ["Session 3 — Manager & Reporting",   "Sales Director, Sales Mgr, Marketing Mgr", "90 min", "Dashboard walkthrough + hands-on", "Pipeline views · Power BI navigation · report scheduling · lead source attribution · forecast reading", "Confluence guide (9pp) · Power BI user guide (5pp)"],
              ]} />
              <IB t="s">
                Post-training assessment results: Average quiz score 87% (target: 80%). All 15 participants passed.
                Lowest scorer (74%) received a 1:1 follow-up session with the BA. Within 5 business days of go-live,
                all 15 users had logged at least one activity in HubSpot independently.
              </IB>
            </S>

            {/* 39 Post-Implementation Review */}
            <S id="pir" num="39" title="Post-Implementation Review"
              sub="Conducted at Week 14 (July 12). Reviewed all 8 success metrics. Findings shared with full project team and CEO.">
              <T hs={["Goal", "Metric", "Baseline", "Target", "Actual (Wk 14)", "Status"]} rows={[
                ["G1 — Single source of truth",           "% leads in CRM",              "0%",     "100%",    "100%",     <Bdg color="green">Met</Bdg>],
                ["G2 — Reduce response time",             "Avg hrs to first contact",    "52 hrs", "< 2 hrs", "4.2 hrs",  <Bdg color="yellow">Partial</Bdg>],
                ["G3 — Improve conversion rate",          "Lead → Opportunity %",        "18%",    "> 25%",   "31%",      <Bdg color="green">Exceeded</Bdg>],
                ["G4 — Automate follow-ups",              "% follow-ups auto-triggered", "0%",     "> 90%",   "94%",      <Bdg color="green">Exceeded</Bdg>],
                ["G5 — Reduce duplicates",                "Duplicates / quarter",        "~200",   "< 30",    "12",       <Bdg color="green">Exceeded</Bdg>],
                ["G6 — Real-time pipeline visibility",    "Dashboard availability",      "None",   "Live",    "✓ Live",   <Bdg color="green">Met</Bdg>],
                ["G7 — Reduce reporting effort",          "Manual hrs/week",             "6–8 hrs","< 1 hr",  "45 min",   <Bdg color="green">Exceeded</Bdg>],
                ["G8 — Improve forecast accuracy",        "Forecast vs actual variance", "Unknown","< 15%",   "11%",      <Bdg color="green">Met</Bdg>],
              ]} />
              <IB t="w">
                <strong>G2 — Partially Met:</strong> The 4.2-hour average response time exceeded the 2-hour target.
                Root cause: two Enterprise AEs had back-to-back client commitments during Wave 2 go-live week.
                Recommended action: the 1-hour SLA grace period for Enterprise AEs was extended to 3 hours for deals
                over $50K ACV, accepted by James Okafor as a reasonable adjustment. Target revised to &lt; 4 hrs for
                Enterprise; &lt; 1 hr for SMB. Average fell to 2.8 hours by Month 1.
              </IB>
            </S>

            {/* 40 KPI Tracking */}
            <S id="kpi-tracking" num="40" title="KPI Tracking Dashboard"
              sub="Metrics tracked monthly in Power BI for the 3 months following go-live. Steady improvement trend confirmed.">
              <T hs={["KPI", "Baseline (Apr)", "Go-Live (Jul)", "Month 1 (Aug)", "Month 2 (Sep)", "Month 3 (Oct)", "Trend"]} rows={[
                ["Lead-to-Opp Conversion %",   "18%",    "31%",    "33%",    "34%",    "35%",    "↑"],
                ["Avg Response Time (hrs)",    "52.0",   "4.2",    "2.8",    "2.1",    "1.9",    "↓"],
                ["Leads Uncontacted (72 hrs)", "35%",    "8%",     "5%",     "4%",     "3%",     "↓"],
                ["Win Rate %",                 "18%",    "22%",    "23%",    "24%",    "24%",    "↑"],
                ["Sales Cycle (days)",         "68",     "54",     "52",     "51",     "50",     "↓"],
                ["Forecast Accuracy (%)",      "N/A",    "11%",    "9%",     "8%",     "7%",     "↓ (improving)"],
                ["Reporting Time (hrs/wk)",    "6–8",    "0.75",   "0.75",   "0.5",    "0.5",    "↓"],
                ["CRM Adoption Rate (%)",      "0%",     "86%",    "95%",    "100%",   "100%",   "↑"],
              ]} />
            </S>

            {/* 41 Before vs After */}
            <S id="before-after" num="41" title="Before vs After Comparison">
              <T hs={["Area", "Before (AS-IS)", "After (TO-BE)", "Change"]} rows={[
                ["Lead System",          "4 disconnected Google Sheets",                    "Single HubSpot CRM — 1 source of truth",          <Bdg color="green">Eliminated</Bdg>],
                ["Lead Assignment",      "Manual Slack DM — avg 52-hr delay",               "Auto-assign — < 5 min, zero manual action",       <Bdg color="green">−92% time</Bdg>],
                ["Lead Scoring",         "None — all leads treated equally",                "Real-time 100-pt score — MQL at 40, SQL at 70",   <Bdg color="green">New capability</Bdg>],
                ["Follow-up Automation", "Personal calendars — 35% missed",                 "Auto-task + 24-hr escalation — 3% missed",        <Bdg color="green">−91% miss rate</Bdg>],
                ["Email Integration",    "No visibility of email engagement in sales flow", "Mailchimp sync — all opens/clicks in CRM timeline",<Bdg color="green">New capability</Bdg>],
                ["Pipeline Visibility",  "Weekly manual report (Friday PM build)",          "Real-time HubSpot + Power BI dashboard (live)",   <Bdg color="green">Real-time</Bdg>],
                ["Reporting Time",       "6–8 hrs/week — Sales Manager manual build",       "45 min/week — auto-generated Monday 08:00",       <Bdg color="green">−88% effort</Bdg>],
                ["Duplicates/Quarter",   "~200 duplicate records",                          "~12 duplicate records",                           <Bdg color="green">−94%</Bdg>],
                ["Conversion Rate",      "18% lead-to-opportunity",                         "31% lead-to-opportunity",                         <Bdg color="green">+72%</Bdg>],
                ["Sales Cycle",          "68 days average",                                 "54 days average",                                 <Bdg color="green">−21%</Bdg>],
                ["Forecast Accuracy",    "Unknown / manually estimated",                    "11% variance vs actuals",                         <Bdg color="green">Measurable</Bdg>],
                ["CRM Adoption",         "0% (no CRM)",                                     "100% at Month 2",                                 <Bdg color="green">Full adoption</Bdg>],
              ]} />
            </S>

            {/* 42 Business Impact */}
            <S id="business-impact" num="42" title="Business Impact"
              sub="Quantified outcomes and estimated ROI calculated at 3-month post go-live review.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                <MC v="+72%" label="Lead Conversion" c="#10B981" note="18% → 31%" />
                <MC v="$1.8M" label="Pipeline Recovered" c="#A78BFA" note="3-month post go-live" />
                <MC v="−$18K" label="Annual Reporting Cost Saved" c="#3B82F6" note="Sales Mgr time recaptured" />
                <MC v="11%" label="Forecast Variance" c="#F59E0B" note="Down from unknown" />
              </div>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">ROI Summary</h3>
                <T hs={["Impact Category", "Calculation", "Annual Value"]} rows={[
                  ["Pipeline recovered from uncontacted leads", "35% → 3% miss rate · 180 leads/month · 32% conversion · $32K ACV", "~$1.8M"],
                  ["Reporting time saved (Sales Manager)",      "7 hrs/week saved × 52 weeks × $85/hr blended rate",                "~$30,940"],
                  ["Sales cycle reduction (14 days)",           "14 days faster × 12 AEs × avg 8 deals/rep/year × $32K ACV",       "~$430K capacity uplift (time-to-revenue)"],
                  ["Duplicate reduction (fewer lost deals)",    "200 → 12 dupes/quarter · est. 10% were distinct sales opps",      "~$58K in previously invisible pipeline"],
                  ["Total Estimated Annual Benefit",            "",                                                                  "~$2.3M"],
                  ["Total Project Cost",                        "HubSpot licence + implementation + training",                     "$186,000"],
                  ["ROI (Year 1)",                              "$2.3M benefit / $186K cost",                                       "1,137%"],
                ]} />
              </Glass>
            </S>

            {/* 43 Lessons Learned */}
            <S id="lessons-learned" num="43" title="Lessons Learned"
              sub="Documented in the PIR and shared with the project team. Six lessons applicable to future CRM and process improvement projects.">
              <div className="space-y-3">
                {[
                  { cat: "Requirements", c: "#3B82F6",  lesson: "Conflicting MQL definitions between Marketing and Sales would have broken the scoring model if not surfaced in Workshop 2. Always facilitate a cross-functional definition session for shared concepts before writing requirements." },
                  { cat: "Change Mgmt",  c: "#A78BFA",  lesson: "The phased go-live recommendation proved correct — Wave 1 adoption issues (two reps reverting to spreadsheets) were caught and corrected before Enterprise went live. Never underestimate adoption risk on CRM projects." },
                  { cat: "Data Quality", c: "#10B981",  lesson: "The data migration sprint (deduplication + field mapping) took 40% longer than estimated. Future projects should allocate dedicated discovery time to assess source data quality before confirming migration timelines." },
                  { cat: "Scope",        c: "#F59E0B",  lesson: "Three scope-creep requests were received during Sprint 2 (finance integration, AI call summaries, multi-currency). The MoSCoW document signed in Week 4 made deflecting these straightforward — it gave the BA authority to say no with evidence." },
                  { cat: "Stakeholders", c: "#60A5FA",  lesson: "The CEO was a High Power / Low Interest stakeholder. Monthly briefings were sufficient until Week 11, when board prep elevated his involvement. Stakeholder interest levels are dynamic — review the register monthly, not just at project start." },
                  { cat: "Testing",      c: "#F87171",  lesson: "DEF-001 (Mailchimp API key scope error) was not caught in dev testing because the dev environment used a different API key. Ensure test environment credentials precisely mirror production scope before UAT begins." },
                ].map(({ cat, c, lesson }, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <Bdg color={cat === "Requirements" ? "blue" : cat === "Change Mgmt" ? "purple" : cat === "Data Quality" ? "green" : cat === "Scope" ? "yellow" : cat === "Stakeholders" ? "blue" : "red"}>
                      {cat}
                    </Bdg>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed flex-1">{lesson}</p>
                  </div>
                ))}
              </div>
            </S>

            {/* 44 BA Skills */}
            <S id="ba-skills" num="44" title="Key BA Skills Demonstrated">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Users size={18}/>,       skill: "Stakeholder Management",     desc: "7 stakeholders across 3 departments · Power/Interest mapping · conflict resolution (MQL definition)" },
                  { icon: <FileText size={18}/>,    skill: "Requirements Elicitation",   desc: "Interviews · workshops · process observation · doc analysis · surveys — all 5 primary techniques used" },
                  { icon: <BookOpen size={18}/>,    skill: "BRD / FRS Writing",          desc: "28-page BRD + 18-page FRS · 12 business requirements · 15 functional requirements · 8 NFRs" },
                  { icon: <GitBranch size={18}/>,   skill: "Process Mapping (BPMN)",     desc: "3 AS-IS + 2 TO-BE BPMN diagrams in Lucidchart · swim-lane format · reviewed and signed off" },
                  { icon: <Target size={18}/>,      skill: "User Story Writing",         desc: "47 user stories across 4 epics · acceptance criteria (Given/When/Then) · Jira backlog management" },
                  { icon: <BarChart3 size={18}/>,   skill: "Data Analysis",              desc: "SQL lead analysis · Python duplicate detection · Excel scoring model · Power BI dashboard design" },
                  { icon: <Shield size={18}/>,      skill: "Risk Management",            desc: "Risk register with 8 risks · likelihood/impact scoring · mitigation plans · weekly review" },
                  { icon: <Activity size={18}/>,    skill: "Agile / Scrum BA",           desc: "4-sprint delivery · sprint planning · backlog grooming · sprint reviews · retrospectives" },
                  { icon: <TestTube2 size={18}/>,   skill: "UAT Planning & Execution",   desc: "85 test cases · defect triage (P1–P4) · sign-off management · 9 defects resolved pre go-live" },
                  { icon: <Zap size={18}/>,         skill: "Change Management (ADKAR)",  desc: "Awareness campaign · champions programme · role-based training · reinforcement plan" },
                  { icon: <MessageSquare size={18}/>,skill: "Stakeholder Communication", desc: "Weekly steering updates · BRD walkthroughs · PIR presentation to CEO and board" },
                  { icon: <PieChart size={18}/>,    skill: "Business Case / ROI",        desc: "1,137% projected ROI · $2.3M annual benefit · presented to James Okafor and board summary" },
                ].map(({ icon, skill, desc }) => (
                  <div key={skill} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#A78BFA]/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#A78BFA]">{icon}</span>
                      <p className="text-[#F9FAFB] text-xs font-semibold">{skill}</p>
                    </div>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </S>

            {/* 45 Tools */}
            <S id="tools-used" num="45" title="Tools & Technologies Used">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "HubSpot CRM Professional", use: "Primary CRM platform — pipeline, scoring, automation, reporting", color: "#FF7A59" },
                  { name: "Power BI",                 use: "Executive dashboard — multi-source pipeline + finance overlay",   color: "#F2C811" },
                  { name: "Jira",                     use: "Agile backlog, sprint planning, story tracking, defect log",      color: "#0052CC" },
                  { name: "Confluence",               use: "BRD, FRS, process guides, training docs, meeting notes",         color: "#0052CC" },
                  { name: "Lucidchart",               use: "BPMN process maps (AS-IS + TO-BE), swim-lane diagrams",          color: "#FF5733" },
                  { name: "Figma",                    use: "Low-fidelity wireframes, prototype review sessions",             color: "#F24E1E" },
                  { name: "SQL",                      use: "Lead response time analysis, source performance analysis",       color: "#336791" },
                  { name: "Python (Pandas)",          use: "Duplicate detection across 4 Google Sheets (n=1,082 records)",  color: "#3776AB" },
                  { name: "Excel",                    use: "Lead scoring model, threshold calibration, migration mapping",  color: "#217346" },
                  { name: "Mailchimp",                use: "Email marketing integration — bidirectional HubSpot sync",      color: "#FFE01B" },
                  { name: "Google Workspace",         use: "SSO source, existing spreadsheets audited, stakeholder comms",  color: "#4285F4" },
                  { name: "Slack",                    use: "Workflow notification delivery, team comms, BA support channel",color: "#4A154B" },
                ].map(({ name, use, color }) => (
                  <div key={name} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                      <p className="text-[#F9FAFB] text-xs font-semibold">{name}</p>
                    </div>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed">{use}</p>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[#9CA3AF] text-sm text-center sm:text-left">
                  Interested in how I approach BA work? Let&apos;s talk.
                </p>
                <div className="flex gap-3">
                  <Link href="/#case-studies"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] text-[#9CA3AF] text-sm font-medium hover:border-[#A78BFA]/40 hover:text-[#A78BFA] transition-all duration-200">
                    <ArrowLeft size={14} />
                    Case Studies
                  </Link>
                  <Link href="/#contact"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A78BFA] to-[#3B82F6] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(167,139,250,0.35)] hover:scale-[1.02] transition-all duration-200">
                    Get in Touch
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </S>

          </main>
        </div>
      </div>
    </div>
  );
}
