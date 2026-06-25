"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Info,
} from "lucide-react";

const toc = [
  { id: "executive-summary",  num: "01", title: "Executive Summary"          },
  { id: "project-overview",   num: "02", title: "Project Overview"           },
  { id: "business-problem",   num: "03", title: "Business Problem"           },
  { id: "stakeholders",       num: "04", title: "Stakeholder Analysis"       },
  { id: "req-gathering",      num: "05", title: "Requirement Gathering"      },
  { id: "as-is",              num: "06", title: "Current State (AS-IS)"      },
  { id: "root-cause",         num: "07", title: "Root Cause Analysis"        },
  { id: "gap-analysis",       num: "08", title: "Gap Analysis"               },
  { id: "to-be",              num: "09", title: "Future State (TO-BE)"       },
  { id: "brd",                num: "10", title: "Business Requirements"      },
  { id: "user-stories",       num: "11", title: "User Stories"               },
  { id: "process-design",     num: "12", title: "Process & Stage Design"     },
  { id: "uat",                num: "13", title: "UAT & Testing"              },
  { id: "go-live",            num: "14", title: "Deployment & Go-Live"       },
  { id: "impact",             num: "15", title: "Business Impact"            },
  { id: "ba-skills",          num: "16", title: "BA Skills Demonstrated"     },
];

const C = "#818CF8";
const CL = "#A5B4FC";

function S({ id, num, title, sub, children }: {
  id: string; num: string; title: string; sub?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-20">
      <div className="flex items-start gap-3 mb-7">
        <span className="font-mono text-xs font-bold shrink-0 mt-1 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.25)", color: CL }}>
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

function MC({ v, label, c = C, note }: { v: string; label: string; c?: string; note?: string }) {
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
    i: { bg: "rgba(129,140,248,0.07)", bd: "rgba(129,140,248,0.2)", ic: CL, el: <Info size={14} /> },
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

function Bdg({ children, color = "indigo" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    blue:   { bg: "rgba(59,130,246,0.1)",  text: "#60A5FA",  border: "rgba(59,130,246,0.25)"  },
    purple: { bg: "rgba(167,139,250,0.1)", text: "#A78BFA",  border: "rgba(167,139,250,0.25)" },
    green:  { bg: "rgba(16,185,129,0.1)",  text: "#34D399",  border: "rgba(16,185,129,0.25)"  },
    yellow: { bg: "rgba(245,158,11,0.1)",  text: "#FCD34D",  border: "rgba(245,158,11,0.25)"  },
    red:    { bg: "rgba(239,68,68,0.1)",   text: "#F87171",  border: "rgba(239,68,68,0.25)"   },
    orange: { bg: "rgba(249,115,22,0.1)",  text: "#FB923C",  border: "rgba(249,115,22,0.25)"  },
    gray:   { bg: "rgba(107,114,128,0.1)", text: "#9CA3AF",  border: "rgba(107,114,128,0.25)" },
    indigo: { bg: "rgba(129,140,248,0.1)", text: "#A5B4FC",  border: "rgba(129,140,248,0.25)" },
  };
  const s = map[color] ?? map.indigo;
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

export default function RecruitmentCaseStudy() {
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

      {/* HERO */}
      <div className="relative overflow-hidden bg-[#080C14] border-b border-white/[0.05]">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: `${C}08` }} />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 relative z-10">
          <Link href="/#case-studies"
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F9FAFB] text-sm mb-8 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Bdg color="indigo">HR & Process Improvement</Bdg>
            <Bdg color="green">12 Weeks</Bdg>
            <Bdg color="blue">Lead Business Analyst</Bdg>
            <Bdg color="purple">Lever ATS · Process Mapping · Jira</Bdg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F9FAFB] leading-tight mb-4">
            Recruitment Process<br />
            <span style={{ background: `linear-gradient(135deg,${C},${CL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Optimization
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed mb-10">
            End-to-end process redesign and ATS implementation for a 280-person consulting firm — eliminating
            spreadsheet-driven hiring, standardising the interview process across 4 departments, and cutting
            time-to-hire from 47 days to 26 days.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MC v="-45%" label="Time-to-Hire" c="#10B981" note="47 → 26 days" />
            <MC v="-61%" label="Candidate Drop-Off" c={CL} note="41% → 16%" />
            <MC v="+16pts" label="Offer Acceptance Rate" c="#3B82F6" note="68% → 84%" />
            <MC v="4 hrs" label="Interview Scheduling" c="#F59E0B" note="Down from 4.5 days" />
          </div>
        </div>
      </div>

      {/* BODY */}
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
                    active === id ? "text-[#A5B4FC]" : "text-[#4B5563] hover:text-[#D1D5DB] hover:bg-white/[0.03]"
                  }`}
                  style={active === id ? { background: "rgba(129,140,248,0.1)" } : {}}>
                  <span className={`font-mono text-[10px] shrink-0 w-5 ${active === id ? "text-[#A5B4FC]" : "text-[#374151]"}`}>{num}</span>
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
                NovaBridge Consulting, a <span className="text-[#F9FAFB] font-medium">280-person professional services firm</span>,
                was losing strong candidates before making offers — not because of poor pay or culture, but because
                their hiring process was slow, inconsistent, and opaque. Time-to-hire sat at 47 days (industry benchmark: 22 days),
                41% of candidates dropped out during the interview stage, and 4 departments each ran their own
                entirely different recruitment process, with no shared standards and no central tracking.
              </p>
              <p className="text-[#9CA3AF] leading-relaxed">
                As Lead Business Analyst, I was engaged to map the current state, define requirements for an ATS implementation,
                and redesign the end-to-end recruitment process across all departments. Over 12 weeks I delivered a standardised,
                5-stage hiring process, configured in Lever ATS with automated scheduling and structured scorecards — reducing
                time-to-hire by 45% and cutting candidate drop-off from 41% to 16%.
              </p>
              <Glass>
                <h3 className="text-[#F9FAFB] font-semibold text-sm mb-5 uppercase tracking-wider">Key Outcomes at a Glance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Time-to-Hire (avg)",                before: "47 days",    after: "26 days",   change: "−45%",  c: "#10B981" },
                    { label: "Candidate Drop-Off Rate",           before: "41%",        after: "16%",       change: "−61%",  c: CL },
                    { label: "Offer Acceptance Rate",             before: "68%",        after: "84%",       change: "+16pts",c: "#3B82F6" },
                    { label: "Interview Scheduling Time",         before: "4.5 days",   after: "4 hours",   change: "−96%",  c: "#F59E0B" },
                    { label: "Hiring Manager Admin Time per Hire",before: "8 hours",    after: "2.5 hours", change: "−69%",  c: "#10B981" },
                    { label: "Roles with Standardised Process",   before: "0 of 4 depts","after": "4 of 4 depts", change: "100%", c: CL },
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
              sub="Context, team, and delivery phases at a glance.">
              <T hs={["Attribute", "Detail"]} rows={[
                ["Client",           "NovaBridge Consulting — professional services (strategy & operations consulting)"],
                ["Company Size",     "280 employees · 4 departments · 35–40 open roles per year"],
                ["Project Duration", "12 weeks — September 8 to November 28, 2024"],
                ["My Role",          "Lead Business Analyst — discovery, requirements, process design, ATS config spec, UAT"],
                ["Team",             "BA, HRBP, 1 Lever ATS implementation consultant, 1 IT Lead, 4 departmental hiring managers"],
                ["Platform",         "Lever ATS + Calendly (automated scheduling) + LinkedIn Recruiter (integration)"],
                ["Methodology",      "Waterfall discovery/design (Wks 1–5) + Agile delivery sprints (Wks 6–11) + Go-live (Wk 12)"],
                ["Key Deliverables", "AS-IS process maps (4 depts) · Standardised TO-BE process · BRD · 36 UAT test cases · Training materials"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Delivery Timeline</h3>
                <div className="space-y-2">
                  {[
                    { phase: "Phase 1", wks: "Wk 1–3",  color: C,        title: "Discovery",             desc: "11 stakeholder interviews, 4 departmental AS-IS process maps, candidate drop-off analysis" },
                    { phase: "Phase 2", wks: "Wk 4–5",  color: CL,       title: "Requirements & Design", desc: "Standardised 5-stage process design, BRD sign-off, ATS configuration specification" },
                    { phase: "Phase 3", wks: "Wk 6–10", color: "#60A5FA",title: "Build & Configure",     desc: "Lever ATS setup, scorecard templates, Calendly integration, LinkedIn sync, email automation" },
                    { phase: "Phase 4", wks: "Wk 11–12",color: "#10B981", title: "UAT, Training & Go-Live","desc": "36 UAT test cases, training for 12 hiring managers + HR team, phased department rollout" },
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
              sub="What was happening, why it hurt the business, and how I quantified it.">
              <p className="text-[#9CA3AF] leading-relaxed">
                NovaBridge was hiring 35–40 people per year, but the process looked different in every department.
                The Strategy team used a 6-stage interview process with a case study presentation. Operations used 3 stages.
                Technology had no formal stages at all — it varied by hiring manager. HR had no central view, no tracking tool,
                and no way to identify where candidates were dropping out.
              </p>
              <p className="text-[#9CA3AF] leading-relaxed">
                After analysing 12 months of hiring data (reconstructed from email chains and calendar invites — there was no
                ATS), I found that <strong className="text-[#F9FAFB]">41% of candidates dropped out at the interview scheduling
                stage</strong> — not because they withdrew, but because scheduling took an average of 4.5 days of back-and-forth
                emails. Several candidates accepted competitor offers while waiting for NovaBridge to confirm an interview slot.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="47 days" label="Average Time-to-Hire" c="#EF4444" note="Benchmark: 22 days" />
                <MC v="41%" label="Candidate Drop-Off Rate" c="#EF4444" note="At scheduling stage" />
                <MC v="4" label="Different Hiring Processes" c="#F59E0B" note="One per department" />
                <MC v="68%" label="Offer Acceptance Rate" c="#EF4444" note="Industry avg: 80%+" />
              </div>
              <IB t="w">
                <strong>Commercial trigger:</strong> The CFO escalated the problem after two senior consultant offers were declined
                in Q3 2024 — both candidates cited &quot;slow and confusing process&quot; in exit surveys. With a fully-loaded annual
                salary of £65K per consultant, losing two offers to process failures represented a significant re-hire cost.
                The HRBP was mandated to fix the process before the next hiring cycle in January 2025.
              </IB>
            </S>

            {/* 04 Stakeholders */}
            <S id="stakeholders" num="04" title="Stakeholder Analysis"
              sub="Who I engaged, their stake in the project, and how I managed resistance.">
              <T hs={["Name / Role", "Power", "Interest", "Primary Concern", "My Engagement Approach"]} rows={[
                ["Claire Moss — HR Business Partner",        bd("red","High"),    bd("red","High"),    "End-to-end process ownership post go-live",       "Project co-lead; daily collaboration; process co-designer"],
                ["Michael Torres — CFO",                     bd("red","High"),    bd("yellow","Med"),  "ROI justification; cost of bad hires",            "Monthly exec briefing; ROI model shared in Wk 1"],
                ["4 Departmental Hiring Managers",           bd("yellow","Med"),  bd("red","High"),    "Losing control of their own process",             "Individual 1:1 interviews; included in process design workshop"],
                ["Layla Chen — Head of Technology",          bd("yellow","Med"),  bd("red","High"),    "Feared over-formalisation of tech hiring",        "Specifically co-designed the tech scorecard with her"],
                ["IT Lead",                                  bd("yellow","Med"),  bd("yellow","Med"),  "SSO, data security, GDPR compliance",             "Technical design review in Wk 3; sign-off before build"],
                ["12 Hiring Managers (wider)",               bd("green","Low"),   bd("red","High"),    "Learning a new tool; extra workload perception",  "UAT participation; 4 training sessions; named as champions"],
              ]} />
              <IB t="i">
                <strong>Key resistance managed:</strong> Layla Chen (Head of Technology) pushed back on a standardised scorecard,
                arguing that &quot;tech hiring is different.&quot; I ran a dedicated 90-minute co-design session with her to build a
                tech-specific scorecard variant. Her buy-in converted her into the most vocal internal champion for the project.
              </IB>
            </S>

            {/* 05 Requirement Gathering */}
            <S id="req-gathering" num="05" title="Requirement Gathering"
              sub="How I gathered requirements from 4 departments with 4 different processes.">
              <T hs={["Technique", "When", "Participants", "Output", "Key Finding"]} rows={[
                ["Hiring Manager Interviews",     "Wk 1",   "4 hiring managers (1:1)",         "4 AS-IS process maps, pain point list",          "No two departments ran the same process"],
                ["Candidate Exit Survey Analysis","Wk 1",   "BA + 24 months of exit data",     "Top 5 drop-off reasons with frequency",          "41% drop-off at scheduling; 'slow' cited in 67% of exits"],
                ["HRBP Workshop",                 "Wk 2",   "HR team (3 people)",               "Wish list, non-negotiables, compliance constraints","GDPR data retention — 12 months max for rejected candidates"],
                ["Process Observation",           "Wk 2",   "BA shadowing 2 live hiring rounds","Real scheduling pain — 14 emails per interview slot","Avg 4.5 days just to confirm one interview time"],
                ["Benchmarking Research",         "Wk 2",   "BA (desk research)",               "Best-practice ATS setup patterns",               "Lever ATS + Calendly integration = < 4 hr scheduling"],
                ["Requirements Workshop",         "Wk 4",   "HRBP + 4 hiring managers + IT",   "BRD drafted; 5-stage process agreed in principle", "Consensus on standard stages; dept-specific scorecards accepted"],
              ]} />
            </S>

            {/* 06 Current State */}
            <S id="as-is" num="06" title="Current State (AS-IS)"
              sub="Documenting the actual process — reconstructed from email chains, calendar exports, and stakeholder interviews.">
              <T hs={["Step", "Activity", "Tool", "Owner", "Problem"]} rows={[
                ["1", "Role approved by budget holder",                  "Email chain",                          "Hiring Manager",  "No standard brief; JD written differently per manager"],
                ["2", "JD posted on LinkedIn / job board",               "LinkedIn (manually)",                  "HR",              "No ATS — candidates apply by emailing HR directly"],
                ["3", "CVs received into shared HR inbox",               "Gmail shared inbox",                   "HR",              "No tracking; CVs lost or duplicated; no acknowledgement sent"],
                ["4", "HR sends CVs to hiring manager for review",       "Email attachment",                     "HR → HM",         "No structured review criteria; subjective decisions"],
                ["5", "Hiring manager replies with shortlist decision",  "Email reply (sometimes takes 1 week)", "Hiring Manager",  "No SLA; candidates waiting 5–10 days with no status update"],
                ["6", "Interview scheduling — back-and-forth by email",  "Gmail",                                "HR",              "Avg 14 emails per interview; 4.5 days per slot confirmation"],
                ["7", "Interview takes place",                           "In person / video",                    "HM + candidate",  "No structured scorecard; feedback verbal or not documented"],
                ["8", "Hiring decision made informally",                 "Phone call / hallway conversation",    "HM",              "No paper trail; HR not always informed of decision rationale"],
                ["9", "Offer letter sent",                               "Email (custom written each time)",     "HR",              "No template; takes 1–2 days to write and approve each offer"],
                ["10","Accepted / declined — outcome tracked in Excel",  "Google Sheets (one per department)",   "HR",              "4 different spreadsheets; no cross-department view"],
              ]} />
              <IB t="w">
                <strong>Most damaging finding:</strong> Because there was no acknowledgement automation, shortlisted candidates who
                had not heard back after a week were emailing competitors. I found 7 cases in 12 months where a candidate accepted
                another offer while still waiting on NovaBridge&apos;s scheduling email.
              </IB>
            </S>

            {/* 07 Root Cause */}
            <S id="root-cause" num="07" title="Root Cause Analysis"
              sub="Why a 47-day time-to-hire persisted despite everyone agreeing it was a problem.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">5 Whys — Why does time-to-hire average 47 days?</h3>
                <div className="space-y-2">
                  {[
                    { why: "Why 1", q: "Why does it take 47 days to hire someone?",                                a: "Interview scheduling takes 4.5 days per round, and most roles have 3–5 rounds of interviews." },
                    { why: "Why 2", q: "Why does scheduling take 4.5 days per round?",                             a: "Scheduling is done manually by email with no shared calendar view — HR has to find slots by asking each participant." },
                    { why: "Why 3", q: "Why is scheduling manual?",                                                a: "There is no ATS or scheduling tool — the process was designed when the company had 50 people and 5 hires per year." },
                    { why: "Why 4", q: "Why hasn't a scheduling tool been adopted as the company scaled?",         a: "No one owned the recruitment process centrally — HR was executing, not designing. No BA or process owner existed." },
                    { why: "Why 5", q: "Why was there no central process owner?",                                  a: "HR was structured as a support function, not a business function. Process improvement was not in anyone's job description." },
                  ].map(({ why, q, a }, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.35)", color: CL }}>
                          {i + 1}
                        </div>
                        {i < 4 && <div className="w-px flex-1 my-1 min-h-[20px]" style={{ background: "rgba(129,140,248,0.15)" }} />}
                      </div>
                      <div className="pb-4">
                        <p className="text-[11px] font-semibold mb-0.5 uppercase tracking-wider" style={{ color: CL }}>{why}</p>
                        <p className="text-[#F9FAFB] text-sm font-medium mb-0.5">{q}</p>
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{a}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-[#10B981] text-sm font-semibold mb-1">Root Cause</p>
                  <p className="text-[#D1D5DB] text-sm leading-relaxed">
                    The root cause was <em>process designed for a company a quarter of the current size, never revisited</em>.
                    The fix required both an ATS implementation and a formal process redesign — without the process redesign,
                    an ATS alone would have automated the same broken workflow.
                  </p>
                </div>
              </Glass>
            </S>

            {/* 08 Gap Analysis */}
            <S id="gap-analysis" num="08" title="Gap Analysis"
              sub="Current capability vs required capability across every step of the hiring lifecycle.">
              <T hs={["Capability", "Current State", "Required State", "Gap", "Priority"]} rows={[
                ["Application Tracking",        "Shared Gmail inbox",                   "Lever ATS — all applicants in one place",           "Critical", bd("red","Must")],
                ["Candidate Communication",     "Manual emails, no template, no SLA",   "Automated acknowledgements within 24 hrs",          "Critical", bd("red","Must")],
                ["Interview Scheduling",        "14-email back-and-forth (4.5 days)",   "Calendly integration — self-book in < 4 hrs",       "Critical", bd("red","Must")],
                ["Interview Scorecards",        "None — verbal feedback only",           "Structured Lever scorecards per role type",         "High",     bd("red","Must")],
                ["Pipeline Visibility (HR)",    "4 separate Excel sheets",              "Live Lever dashboard — all depts in one view",      "High",     bd("red","Must")],
                ["Process Standardisation",     "4 different processes (1 per dept)",   "Single 5-stage process with dept-specific variants","High",     bd("red","Must")],
                ["Offer Letter Generation",     "Written from scratch each time (1–2 days)","Lever offer templates — generated in < 1 hr",   "Medium",   bd("yellow","Should")],
                ["Reporting (time-to-hire etc)","No reporting — reconstructed from email","Lever auto-reports: time-to-hire, source, stage", "Medium",   bd("yellow","Should")],
                ["LinkedIn Integration",        "Manual posting",                       "Lever ↔ LinkedIn Recruiter sync",                  "Low",      bd("orange","Could")],
              ]} />
            </S>

            {/* 09 Future State */}
            <S id="to-be" num="09" title="Future State (TO-BE)"
              sub="How the redesigned recruitment process flows — from job approval to offer accepted.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">TO-BE Recruitment Flow</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { lane: "Hiring Manager", color: C, steps: ["Raises role in Lever (structured brief template)","Reviews shortlisted CVs in Lever (scored by HR)","Selects candidates for interview (1 click)","Completes structured scorecard after each interview","Makes hire/no-hire decision in Lever (documented)"] },
                    { lane: "HR / HRBP", color: CL, steps: ["Posts role from Lever to LinkedIn + boards (1 click)","All applications centralised in Lever automatically","Shortlists CVs using Lever review panel","Calendly link auto-sent to candidates on shortlist","Tracks all candidates in one pipeline view","Auto-generates offer letter from Lever template"] },
                    { lane: "Candidate", color: "#3B82F6", steps: ["Applies → receives auto-acknowledgement (< 24 hrs)","If shortlisted → receives Calendly link to self-book interview (same day)","Completes interview → automated status update sent","Receives offer letter within 48 hrs of decision"] },
                    { lane: "Leadership / Analytics", color: "#10B981", steps: ["Live Lever dashboard: open roles, pipeline stage, time-to-hire","Monthly HR report auto-generated: source effectiveness, stage drop-off","Data used to improve JD quality and targeting over time"] },
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
            </S>

            {/* 10 BRD */}
            <S id="brd" num="10" title="Business Requirements"
              sub="Requirements agreed with HRBP and hiring managers before ATS configuration began.">
              <T hs={["ID", "Priority", "Requirement", "Acceptance Criterion"]} rows={[
                ["BR-001", bd("red","Must"),    "System shall provide a single pipeline view of all open roles and candidates across all departments",                   "All depts visible in Lever; zero separate spreadsheets post go-live"],
                ["BR-002", bd("red","Must"),    "System shall auto-send a candidate acknowledgement email within 24 hours of application submission",                   "Acknowledgement timestamp within 24 hrs — verified in UAT"],
                ["BR-003", bd("red","Must"),    "System shall enable candidates to self-book interview slots via Calendly without HR email involvement",                "Scheduling completed in < 4 hours; confirmed via UAT scenario"],
                ["BR-004", bd("red","Must"),    "System shall provide structured interview scorecards for each role type — completed by all interviewers",             "Scorecard mandatory before candidate progresses in Lever"],
                ["BR-005", bd("red","Must"),    "System shall enforce a standardised 5-stage hiring process across all departments",                                   "All active roles use the agreed stage structure in Lever"],
                ["BR-006", bd("red","Must"),    "System shall retain candidate data for a maximum of 12 months in compliance with GDPR Article 17",                   "Auto-delete rule configured; confirmed with IT Lead and Legal"],
                ["BR-007", bd("yellow","Should"),"System shall auto-generate offer letters from templates when a hire decision is made in Lever",                      "Offer letter generated in < 1 hr of hire decision — no manual drafting"],
                ["BR-008", bd("yellow","Should"),"System shall produce a monthly HR report showing time-to-hire, stage drop-off, and offer acceptance by department",  "Report auto-delivered to HRBP on 1st of each month"],
                ["BR-009", bd("orange","Could"), "System shall sync open roles to LinkedIn Recruiter to surface passive candidates (Phase 2)",                        "Out of Phase 1 scope — documented in backlog"],
              ]} />
            </S>

            {/* 11 User Stories */}
            <S id="user-stories" num="11" title="User Stories"
              sub="Sample from the 30-story Jira backlog, grouped by persona.">
              <div className="space-y-5">
                {[
                  {
                    epic: "EPIC-01: Candidate Experience", color: CL,
                    stories: [
                      { id: "US-001", pts: 5,  persona: "Candidate", story: "I want to receive an acknowledgement within 24 hours of applying so that I know my application was received and I don't have to chase.", priority: "Must" },
                      { id: "US-002", pts: 8,  persona: "Candidate", story: "I want to self-book my interview slot via a link so that I don't have to go back and forth by email for 5 days to agree on a time.", priority: "Must" },
                      { id: "US-003", pts: 3,  persona: "Candidate", story: "I want to receive a clear status update after each interview stage so that I'm not left in silence wondering if I've been rejected.", priority: "Should" },
                    ]
                  },
                  {
                    epic: "EPIC-02: Hiring Manager Efficiency", color: "#3B82F6",
                    stories: [
                      { id: "US-010", pts: 5,  persona: "Hiring Manager", story: "I want to review CVs and record my shortlist decisions in one place so that I don't have to manage email attachments and remember to reply to HR.", priority: "Must" },
                      { id: "US-011", pts: 5,  persona: "Hiring Manager", story: "I want a structured scorecard to complete after each interview so that my feedback is documented and comparable across candidates.", priority: "Must" },
                      { id: "US-012", pts: 3,  persona: "Hiring Manager", story: "I want to see all candidates for my open role in one pipeline view so that I always know where each person is in the process.", priority: "Must" },
                    ]
                  },
                  {
                    epic: "EPIC-03: HR Visibility & Reporting", color: "#10B981",
                    stories: [
                      { id: "US-020", pts: 8,  persona: "HR Business Partner", story: "I want a live dashboard showing all open roles and candidate pipeline stages across every department so that I don't have to chase 4 managers for updates.", priority: "Must" },
                      { id: "US-021", pts: 5,  persona: "HR Business Partner", story: "I want a monthly automated report showing time-to-hire and offer acceptance by department so that I can identify bottlenecks without manual analysis.", priority: "Should" },
                      { id: "US-022", pts: 3,  persona: "HR Business Partner", story: "I want offer letters auto-generated from templates so that I can send an offer within 48 hours of a hire decision instead of writing it from scratch.", priority: "Should" },
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
                            <Bdg color="indigo">{persona}</Bdg>
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

            {/* 12 Process Design */}
            <S id="process-design" num="12" title="Process & Stage Design"
              sub="The standardised 5-stage process I designed — the core deliverable that made the ATS configuration meaningful.">
              <p className="text-[#9CA3AF] leading-relaxed">
                The most complex design challenge was not the ATS configuration — it was getting 4 departments to agree on a
                shared process. I facilitated a 3-hour workshop with all 4 hiring managers and the HRBP, using the AS-IS maps
                as the baseline and a &quot;what&apos;s non-negotiable vs what&apos;s flexible&quot; framework to drive consensus.
              </p>
              <T hs={["Stage", "Name", "What Happens", "Owner", "Lever Status", "SLA"]} rows={[
                ["Stage 1", "Applied",        "CV received; auto-acknowledgement sent to candidate within 24 hrs",              "System (auto)",  "Applied",         "24 hrs"],
                ["Stage 2", "HR Screen",      "HR reviews CV against role brief; shortlist decision recorded in Lever",         "HRBP / HR",      "Reviewing",       "3 business days"],
                ["Stage 3", "1st Interview",  "Hiring manager interview; Calendly link sent; structured scorecard completed",   "Hiring Manager", "First Interview",  "Self-booked; interview within 5 days of shortlist"],
                ["Stage 4", "2nd Interview",  "Panel / technical interview (role-specific variant); second scorecard",          "Dept Lead",      "Second Interview", "Within 5 days of stage 3 outcome"],
                ["Stage 5", "Offer",          "Hire decision logged; offer letter auto-generated; sent within 48 hrs",          "HR",             "Offer",           "Offer within 48 hrs of hire decision"],
                ["—",       "No Offer",       "Candidate moved to Rejected; automated decline email sent within 24 hrs",        "System (auto)",  "Rejected",        "24 hrs from decision"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Department-Specific Scorecard Variants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { dept: "Strategy", color: C,        fields: ["Problem-structuring ability", "Communication clarity", "Commercial awareness", "Case study presentation score"] },
                    { dept: "Operations",color: CL,      fields: ["Process analysis skills", "Stakeholder management", "Delivery track record", "Quantified impact examples"] },
                    { dept: "Technology",color: "#3B82F6",fields: ["Technical competency (role-specific)", "Code / system design review score", "Problem-solving approach", "Collaboration style"] },
                    { dept: "Finance",   color: "#F59E0B",fields: ["Analytical rigour", "Excel / modelling skills test", "Attention to detail", "Communication to non-finance stakeholders"] },
                  ].map(({ dept, color, fields }) => (
                    <div key={dept} className="rounded-xl p-4 bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <span className="text-[#F9FAFB] text-sm font-semibold">{dept}</span>
                      </div>
                      {fields.map(f => (
                        <p key={f} className="text-[#9CA3AF] text-xs leading-relaxed flex gap-1.5 mb-1">
                          <span style={{ color }} className="shrink-0">·</span>{f}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <IB t="i" >
                  <strong>Design principle:</strong> Standard stages, department-specific scorecards. This was the compromise
                  that resolved all objections. Hiring managers kept the ability to assess candidates on role-relevant criteria;
                  HR gained the standardised pipeline and tracking they needed.
                </IB>
              </Glass>
            </S>

            {/* 13 UAT */}
            <S id="uat" num="13" title="UAT & Testing"
              sub="How I validated the configured ATS against requirements — including edge cases and GDPR compliance.">
              <T hs={["Test Case", "Scenario", "Expected Result", "Actual Result", "Status"]} rows={[
                ["TC-001", "New application submitted for open role",                       "Candidate receives auto-acknowledgement within 24 hrs",               "Received in 6 minutes",          bd("green","Pass")],
                ["TC-002", "HR marks candidate as shortlisted in Lever",                   "Candidate receives Calendly booking link automatically",              "Link sent immediately",           bd("green","Pass")],
                ["TC-003", "Candidate books interview via Calendly",                       "Event auto-created in HM calendar; Lever stage updates",             "Confirmed correctly",             bd("green","Pass")],
                ["TC-004", "Interviewer completes scorecard after interview",               "Scorecard saved in Lever; HM can view before decision",              "Saved and visible",               bd("green","Pass")],
                ["TC-005", "Hire decision made in Lever",                                  "Offer letter auto-generated from template with candidate details", "FAIL — name field blank",     bd("red","Fail → Fixed")],
                ["TC-006", "Candidate rejected at any stage",                              "Auto-decline email sent within 24 hrs; candidate exits pipeline",   "Sent within 3 minutes",           bd("green","Pass")],
                ["TC-007", "Candidate record reaches 12-month age threshold",              "Auto-delete rule fires; data removed from Lever",                    "Confirmed via Lever audit log",   bd("green","Pass")],
                ["TC-008", "Hiring manager tries to advance candidate without scorecard",  "System blocks progression until scorecard is submitted",             "Blocked as required",             bd("green","Pass")],
              ]} />
              <IB t="s">
                <strong>Defect found:</strong> TC-005 revealed the offer letter template had a broken merge field for the candidate
                name variable. Fixed by the Lever implementation consultant within 2 hours. Retested same day and passed.
                Zero defects at go-live.
              </IB>
              <Glass>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MC v="36" label="UAT Test Cases" c={C} />
                  <MC v="35" label="Passed First Run" c="#10B981" />
                  <MC v="1" label="Defect Found & Fixed" c="#F59E0B" note="P2 severity" />
                  <MC v="0" label="Critical Defects at Go-Live" c="#10B981" />
                </div>
              </Glass>
            </S>

            {/* 14 Go-Live */}
            <S id="go-live" num="14" title="Deployment & Go-Live"
              sub="How I managed the rollout to minimise disruption during an active hiring period.">
              <div className="space-y-3">
                {[
                  { step: "Week 11", title: "Training — HR Team (2 sessions)", color: C, desc: "Two 1-hour sessions with the full HR team covering: posting roles, managing the pipeline, running reports, and the GDPR deletion rule. I wrote a 6-page quick-reference guide used in both sessions." },
                  { step: "Week 11", title: "Training — Hiring Managers (2 sessions)", color: CL, desc: "Two 45-minute sessions with all 12 hiring managers focused on: reviewing CVs in Lever, completing scorecards, and reading the pipeline view. Kept it practical — each manager completed a scorecard on a test candidate during the session." },
                  { step: "Week 12", title: "Phased Go-Live (Strategy dept first)", color: "#3B82F6", desc: "Strategy department went live first — they had the most active pipeline and the most willing hiring manager. This gave us a real-world test environment with low downside risk. One process issue surfaced (Calendly timezone mismatch) and was fixed within 6 hours." },
                  { step: "Week 12+", title: "Full Rollout (All Departments)", color: "#10B981", desc: "All 4 departments live by end of Week 12. I stayed on as support for 2 weeks post go-live, reviewing all edge cases and responding to hiring manager questions. No critical issues. Time-to-hire improvement visible in the first hiring cycle within 3 weeks." },
                ].map(({ step, title, color, desc }, i, arr) => (
                  <div key={`${step}-${i}`} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0 pt-0.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: `${color}15`, border: `1.5px solid ${color}40`, color }}>
                        {i + 1}
                      </div>
                      {i < arr.length - 1 && <div className="w-px flex-1 my-1 min-h-[20px]" style={{ background: `${color}20` }} />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[#F9FAFB] text-sm font-semibold">{title}</span>
                        <Bdg color="gray">{step}</Bdg>
                      </div>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </S>

            {/* 15 Business Impact */}
            <S id="impact" num="15" title="Business Impact"
              sub="Measured outcomes tracked across the first full hiring cycle after go-live.">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                <MC v="26 days" label="New Time-to-Hire" c="#10B981" note="Down from 47 days (−45%)" />
                <MC v="16%" label="Candidate Drop-Off" c={CL} note="Down from 41% (−61%)" />
                <MC v="84%" label="Offer Acceptance Rate" c="#3B82F6" note="Up from 68% (+16pts)" />
                <MC v="4 hrs" label="Interview Scheduling Time" c="#F59E0B" note="Down from 4.5 days (−96%)" />
                <MC v="2.5 hrs" label="HM Admin Time per Hire" c="#10B981" note="Down from 8 hrs (−69%)" />
                <MC v="100%" label="Depts on Structured Process" c={CL} note="Was 0 of 4" />
              </div>
              <T hs={["Metric", "Before", "After", "Change", "vs Target"]} rows={[
                ["Time-to-hire",                     "47 days",    "26 days",   "−45%",   bd("green","Exceeded (target: < 30 days)")],
                ["Candidate drop-off rate",          "41%",        "16%",       "−61%",   bd("green","Exceeded (target: < 25%)")],
                ["Offer acceptance rate",            "68%",        "84%",       "+16pts", bd("green","Exceeded (target: 75%)")],
                ["Interview scheduling time",        "4.5 days",   "4 hours",   "−96%",   bd("green","Exceeded (target: < 1 day)")],
                ["Hiring manager admin per hire",    "8 hours",    "2.5 hours", "−69%",   bd("green","Exceeded")],
                ["Departments on standard process",  "0 of 4",     "4 of 4",    "100%",   bd("green","Achieved")],
                ["Structured scorecard completion",  "0%",         "100%",      "+100%",  bd("green","Achieved (BR-004)")],
              ]} />
              <IB t="s">
                <strong>Claire Moss (HRBP) at post-implementation review:</strong> &ldquo;We&apos;ve already had two senior hires
                complete in under 25 days — that has never happened here before. The scorecards have changed the quality of
                hiring conversations. And I haven&apos;t built a single spreadsheet in 6 weeks.&rdquo;
              </IB>
            </S>

            {/* 16 BA Skills */}
            <S id="ba-skills" num="16" title="BA Skills Demonstrated"
              sub="The core business analysis competencies this project exercised — and how each one showed up in practice.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { skill: "Process Mapping (AS-IS)",      detail: "Reconstructed 4 departmental hiring processes from email chains and interviews — no documentation existed. The resulting maps gave the project its single most important data point: 41% drop-off at scheduling.",                     color: CL },
                  { skill: "Stakeholder Facilitation",     detail: "Ran a 3-hour cross-departmental workshop to get 4 hiring managers to agree on a shared process — navigating competing interests without executive escalation. Result: consensus-built 5-stage process.",                            color: "#3B82F6" },
                  { skill: "Requirements Documentation",   detail: "Produced a BRD with 9 traceable requirements, all with measurable acceptance criteria. Every requirement mapped directly to a business pain point — no gold-plating.",                                                                color: "#10B981" },
                  { skill: "Data Analysis",                detail: "Reconstructed 12 months of hiring data from emails and calendar exports. Quantified time-per-step, drop-off rate, and offer acceptance rate — turning anecdote into evidence for the business case.",                               color: "#F59E0B" },
                  { skill: "Process Design (TO-BE)",       detail: "Designed a standardised 5-stage process with department-specific scorecard variants — the key compromise that resolved all stakeholder objections and made adoption possible.",                                                       color: CL },
                  { skill: "Change Management",            detail: "Addressed the 'tech hiring is different' objection proactively by co-designing the tech scorecard with the Head of Technology. Turned a detractor into a champion before the project was half-done.",                              color: "#3B82F6" },
                  { skill: "UAT Design",                   detail: "Designed 36 test cases covering functional flows, edge cases, and GDPR compliance. Found 1 defect pre-go-live. Delivered with zero critical issues at launch.",                                                                       color: "#10B981" },
                  { skill: "Training Delivery",            detail: "Designed and delivered 4 training sessions for 15 people (HR team + hiring managers) — tailored separately for each group. Produced a 6-page quick-reference guide that became the ongoing onboarding tool.",                     color: "#F59E0B" },
                ].map(({ skill, detail, color }) => (
                  <div key={skill} className="glass rounded-xl p-4 flex gap-3">
                    <div className="w-1.5 rounded-full shrink-0 mt-1" style={{ background: color, minHeight: "24px" }} />
                    <div>
                      <p className="text-[#F9FAFB] text-sm font-semibold mb-1">{skill}</p>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Lever ATS","Process Mapping","Stakeholder Management","Requirements Gathering","BRD","User Stories","UAT","Data Analysis","Change Management","Training Delivery","GDPR Compliance","Agile"].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full border"
                    style={{ background: "rgba(129,140,248,0.08)", borderColor: "rgba(129,140,248,0.2)", color: CL }}>
                    {tag}
                  </span>
                ))}
              </div>
            </S>

          </main>
        </div>
      </div>
    </div>
  );
}
