"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Info,
  Bot, Users, Target, BarChart3, MessageSquare, Zap,
  FileText, TestTube2, Rocket, Clock, Shield, RefreshCw, Award,
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
  { id: "automation-scope",   num: "10", title: "Automation Scope"           },
  { id: "brd",                num: "11", title: "Business Requirements"      },
  { id: "user-stories",       num: "12", title: "User Stories"               },
  { id: "uat",                num: "13", title: "UAT & Testing"              },
  { id: "go-live",            num: "14", title: "Deployment & Go-Live"       },
  { id: "impact",             num: "15", title: "Business Impact"            },
  { id: "ba-skills",          num: "16", title: "BA Skills Demonstrated"     },
];

const C = "#7B72E1";
const CL = "#A78BFA";

function S({ id, num, title, sub, children }: {
  id: string; num: string; title: string; sub?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-20">
      <div className="flex items-start gap-3 mb-7">
        <span className="font-mono text-xs font-bold shrink-0 mt-1 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(123,114,225,0.1)", border: "1px solid rgba(123,114,225,0.25)", color: CL }}>
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
    i: { bg: "rgba(123,114,225,0.07)", bd: "rgba(123,114,225,0.2)", ic: CL, el: <Info size={14} /> },
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

function Bdg({ children, color = "purple" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    blue:   { bg: "rgba(59,130,246,0.1)",  text: "#60A5FA",  border: "rgba(59,130,246,0.25)"  },
    purple: { bg: "rgba(123,114,225,0.1)", text: "#A78BFA",  border: "rgba(123,114,225,0.25)" },
    green:  { bg: "rgba(16,185,129,0.1)",  text: "#34D399",  border: "rgba(16,185,129,0.25)"  },
    yellow: { bg: "rgba(245,158,11,0.1)",  text: "#FCD34D",  border: "rgba(245,158,11,0.25)"  },
    red:    { bg: "rgba(239,68,68,0.1)",   text: "#F87171",  border: "rgba(239,68,68,0.25)"   },
    orange: { bg: "rgba(249,115,22,0.1)",  text: "#FB923C",  border: "rgba(249,115,22,0.25)"  },
    gray:   { bg: "rgba(107,114,128,0.1)", text: "#9CA3AF",  border: "rgba(107,114,128,0.25)" },
    indigo: { bg: "rgba(99,102,241,0.1)",  text: "#818CF8",  border: "rgba(99,102,241,0.25)"  },
  };
  const s = map[color] ?? map.purple;
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

export default function AISupportCaseStudy() {
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
            <Bdg color="purple">AI & Automation</Bdg>
            <Bdg color="green">10 Weeks</Bdg>
            <Bdg color="blue">Lead Business Analyst</Bdg>
            <Bdg color="indigo">Zendesk · AI Chatbot · Jira</Bdg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F9FAFB] leading-tight mb-4">
            AI Customer Support<br />
            <span style={{ background: `linear-gradient(135deg,${C},${CL})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Automation
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed mb-10">
            End-to-end requirements and process design for an AI-powered support automation project —
            scoping chatbot boundaries, defining escalation rules, and delivering a 67% ticket automation
            rate across 10 weeks.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MC v="67%" label="Tickets Auto-Resolved" c="#10B981" note="No agent needed" />
            <MC v="-64%" label="Human Ticket Volume" c={CL} note="2,400 → 860/month" />
            <MC v="18→2hrs" label="First Response Time" c="#3B82F6" note="For human-handled" />
            <MC v="+21pts" label="CSAT Improvement" c="#F59E0B" note="61% → 82%" />
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
                    active === id ? "text-[#A78BFA]" : "text-[#4B5563] hover:text-[#D1D5DB] hover:bg-white/[0.03]"
                  }`}
                  style={active === id ? { background: "rgba(123,114,225,0.1)" } : {}}>
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
                UrbanCart, a B2C e-commerce platform processing <span className="text-[#F9FAFB] font-medium">50,000 orders per month</span>,
                was struggling with a support operation that couldn't scale. Five agents were handling 2,400 tickets per month —
                68% of which were identical, low-complexity queries (order status, returns, password resets). Average first response
                time had reached 18 hours, and CSAT had dropped to 61%.
              </p>
              <p className="text-[#9CA3AF] leading-relaxed">
                As Lead Business Analyst, I was brought in to scope, define, and oversee the delivery of an AI-powered support
                automation solution using Zendesk Suite and Answer Bot. My work spanned 10 weeks — from discovery and process
                mapping through to UAT sign-off and go-live — resulting in 67% of Tier-1 tickets being fully resolved by
                automation, with no agent involvement.
              </p>
              <Glass>
                <h3 className="text-[#F9FAFB] font-semibold text-sm mb-5 uppercase tracking-wider">Key Outcomes at a Glance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Ticket Auto-Resolution Rate",     before: "0%",          after: "67%",           change: "+67%",  c: "#10B981" },
                    { label: "Human Ticket Volume per Month",   before: "2,400",       after: "860",           change: "−64%",  c: CL },
                    { label: "First Response Time (human)",     before: "18 hours",    after: "2 hours",       change: "−89%",  c: "#3B82F6" },
                    { label: "Customer CSAT Score",             before: "61%",         after: "82%",           change: "+21pts",c: "#F59E0B" },
                    { label: "Cost per Ticket",                 before: "£12.00",      after: "£4.20",         change: "−65%",  c: "#10B981" },
                    { label: "Agent Overtime Hours per Month",  before: "48 hrs",      after: "0 hrs",         change: "Eliminated", c: CL },
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
                ["Client",           "UrbanCart — B2C e-commerce platform (fashion & lifestyle)"],
                ["Company Size",     "120 employees · 5 support agents · 50,000 orders/month"],
                ["Project Duration", "10 weeks — January 13 to March 21, 2025"],
                ["My Role",          "Lead Business Analyst — discovery, requirements, conversation design, UAT"],
                ["Team",             "BA, Product Owner, 2 Zendesk developers, 1 QA Analyst, Support Team Lead"],
                ["Platform",         "Zendesk Suite Professional + Zendesk Answer Bot (AI)"],
                ["Methodology",      "Agile — 3-week discovery/design + 3 × 2-week delivery sprints + 1-week go-live"],
                ["Key Deliverables", "AS-IS process map · Bot conversation flows (18 intents) · BRD · 32 UAT test cases · Training docs"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Delivery Timeline</h3>
                <div className="space-y-2">
                  {[
                    { phase: "Phase 1", wks: "Wk 1–3",  color: C,        title: "Discovery & Analysis",   desc: "Agent interviews, ticket data audit, category analysis, AS-IS process mapping" },
                    { phase: "Phase 2", wks: "Wk 4–5",  color: CL,       title: "Requirements & Design",  desc: "18 bot intents defined, escalation rules, BRD, conversation flow wireframes, stakeholder sign-off" },
                    { phase: "Phase 3", wks: "Wk 6–9",  color: "#60A5FA",title: "Build & Configure",      desc: "Sprints 1–3: Zendesk bot build, knowledge base articles, routing rules, integration testing" },
                    { phase: "Phase 4", wks: "Wk 10",   color: "#10B981", title: "UAT, Training & Go-Live",desc: "32 UAT test cases executed, agent training (5 sessions), phased bot activation" },
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
              sub="What was breaking, why it mattered commercially, and what the cost of inaction was.">
              <p className="text-[#9CA3AF] leading-relaxed">
                UrbanCart's support team was receiving <span className="text-[#F9FAFB] font-medium">2,400 tickets per month</span> — a
                volume that had grown 80% over 18 months as the platform scaled, but headcount had only grown from 3 to 5 agents.
                After auditing 3 months of ticket data, I found that <strong className="text-[#F9FAFB]">68% of all tickets fell into
                just 6 repeatable categories</strong> that required no judgment: order status, return initiation, refund tracking,
                password reset, discount code issues, and delivery address changes.
              </p>
              <p className="text-[#9CA3AF] leading-relaxed">
                Despite being simple queries, each took an average of 8 minutes of agent time to resolve — because agents had to
                manually look up order data, copy-paste responses, and close the ticket. At 2,400 tickets per month and a fully
                loaded agent cost of £28/hour, the company was spending <span className="text-[#F9FAFB] font-medium">~£10,700/month
                on queries that a bot could resolve in seconds</span>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="2,400" label="Tickets per Month" c="#EF4444" note="Growing 80% in 18 months" />
                <MC v="68%" label="Tickets = Tier-1 (automatable)" c="#F59E0B" note="6 repeatable categories" />
                <MC v="18 hrs" label="Avg First Response Time" c="#EF4444" note="Industry benchmark: 4 hrs" />
                <MC v="61%" label="CSAT Score" c="#EF4444" note="Down from 74% 12 months prior" />
              </div>
              <IB t="w">
                <strong>Commercial trigger:</strong> UrbanCart's Head of Operations flagged support costs at a quarterly board review.
                The CFO calculated that at the current growth trajectory, a 6th agent would need to be hired within 3 months — costing
                £38K/year — unless a scalable solution was found. This project was approved within two weeks of that meeting.
              </IB>
            </S>

            {/* 04 Stakeholder Analysis */}
            <S id="stakeholders" num="04" title="Stakeholder Analysis"
              sub="Who I engaged, their stake in the outcome, and how I managed each relationship.">
              <T hs={["Name / Role", "Power", "Interest", "Primary Concern", "My Engagement Approach"]} rows={[
                ["Sarah Yates — Head of Operations",    <Bdg color="red">High</Bdg>,    <Bdg color="red">High</Bdg>,    "Cost reduction + scalability",              "Weekly steering meetings; project sponsor; sign-off authority"],
                ["Dev Patel — Support Team Lead",       <Bdg color="yellow">Med</Bdg>,  <Bdg color="red">High</Bdg>,    "Agents losing their jobs to automation",    "Involved from Day 1; co-designed escalation rules; UAT champion"],
                ["3 Support Agents (interviewed)",      <Bdg color="green">Low</Bdg>,   <Bdg color="red">High</Bdg>,    "Job security, ease of use post-go-live",    "Individual interviews; daily stand-ups during UAT"],
                ["Raj Nair — CTO",                      <Bdg color="red">High</Bdg>,    <Bdg color="yellow">Med</Bdg>,  "Data security, Zendesk integration quality","Architecture review in Wk 2; monthly update"],
                ["Amit Shah — CFO",                     <Bdg color="red">High</Bdg>,    <Bdg color="green">Low</Bdg>,   "ROI justification, cost per ticket",        "ROI model shared in Wk 1; monthly exec briefing"],
              ]} />
              <IB t="i">
                <strong>Resistance risk managed early:</strong> Dev Patel (Support Team Lead) was initially resistant — fearing
                automation would reduce the team. I reframed the project as &quot;handling the tedious work so agents can focus on
                complex and high-value queries&quot; and made him co-owner of the escalation design. His buy-in was the single
                biggest factor in smooth adoption at go-live.
              </IB>
            </S>

            {/* 05 Requirement Gathering */}
            <S id="req-gathering" num="05" title="Requirement Gathering"
              sub="Techniques I used to understand the problem before proposing a solution.">
              <T hs={["Technique", "When", "Participants", "Output", "Key Finding"]} rows={[
                ["Ticket Data Analysis",        "Wk 1",     "BA + Zendesk export",         "Category breakdown of 3 months of tickets",       "68% of volume = 6 repeatable categories"],
                ["Agent Shadowing",             "Wk 1",     "3 agents (2 hrs each)",        "Time-per-ticket by category, copy-paste patterns", "Agents spent 40% of time on templated responses"],
                ["Structured Interviews",       "Wk 1–2",   "5 stakeholders (1:1)",         "Pain points, non-negotiable escalation rules",     "Agents insisted: billing disputes must ALWAYS reach a human"],
                ["Customer Survey",             "Wk 2",     "200 recent customers (email)", "What customers actually want from support",        "73% preferred instant self-service over waiting for a human"],
                ["Competitor Benchmarking",     "Wk 2",     "BA (desk research)",           "Bot scope and conversation flow patterns",         "Best-in-class: respond in < 30 sec, escalate cleanly in 1 click"],
                ["Requirements Workshop",       "Wk 3",     "Ops Head + Support Lead + CTO","Agreed bot scope, escalation logic, success KPIs", "Defined 18 bot intents and 4 hard escalation triggers"],
              ]} />
            </S>

            {/* 06 Current State */}
            <S id="as-is" num="06" title="Current State (AS-IS)"
              sub="How support actually worked before this project — the reality on the ground, not the assumption.">
              <T hs={["Step", "Activity", "Tool", "Owner", "Problem"]} rows={[
                ["1", "Customer submits query",                  "Email / website contact form",      "Customer",       "No acknowledgement; customer doesn't know if query was received"],
                ["2", "Ticket lands in shared Zendesk inbox",   "Zendesk (basic)",                   "All agents",     "No routing rules; agents manually pick tickets from the queue"],
                ["3", "Agent reads ticket and looks up order",   "Zendesk + Shopify admin panel",     "Agent",          "Avg 3 min of tab-switching before agent can respond"],
                ["4", "Agent writes manual response",            "Zendesk compose",                   "Agent",          "For 68% of queries, the response is nearly identical every time"],
                ["5", "Customer responds asking a follow-up",    "Email thread",                      "Customer/Agent", "Simple queries generate 1.4 additional replies on average"],
                ["6", "Ticket closed manually by agent",         "Zendesk",                           "Agent",          "Agents have to remember to close; 12% of resolved tickets sit open"],
                ["7", "Weekly manual CSAT report built by lead", "Excel + Zendesk export",            "Dev Patel",      "3 hrs of manual work every Friday; always a week behind"],
              ]} />
              <IB t="w">
                <strong>Key observation from shadowing:</strong> For a standard &quot;where is my order?&quot; query, an agent spent
                an average of 8 minutes — 3 minutes looking up the order, 2 minutes writing the response, and 3 minutes on
                admin and ticket closure. A bot can resolve the same query in under 30 seconds with zero agent involvement.
              </IB>
            </S>

            {/* 07 Root Cause */}
            <S id="root-cause" num="07" title="Root Cause Analysis"
              sub="5 Whys applied to the core problem — high response times despite a functional support tool.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">5 Whys — Why is first response time 18 hours?</h3>
                <div className="space-y-2">
                  {[
                    { why: "Why 1", q: "Why does first response take 18 hours?",                              a: "Agents are handling 480 tickets per month each — at the limit of human capacity." },
                    { why: "Why 2", q: "Why are agents at capacity?",                                         a: "Total ticket volume has grown 80% in 18 months; headcount has not kept pace." },
                    { why: "Why 3", q: "Why hasn't headcount kept pace?",                                     a: "Budget was not approved because leadership didn't have visibility on volume trends until Q4 board review." },
                    { why: "Why 4", q: "Why wasn't volume growth visible earlier?",                           a: "No reporting automation — the CSAT/volume report was manually built weekly, giving only lagging indicators." },
                    { why: "Why 5", q: "Why is the report manual?",                                           a: "Zendesk was configured as a basic ticketing tool only — routing, automation, and reporting features were never set up." },
                  ].map(({ why, q, a }, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(123,114,225,0.15)", border: "1px solid rgba(123,114,225,0.35)", color: CL }}>
                          {i + 1}
                        </div>
                        {i < 4 && <div className="w-px flex-1 my-1 min-h-[20px]" style={{ background: "rgba(123,114,225,0.15)" }} />}
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
                    The root cause was not &quot;not enough agents&quot; — it was that <em>Zendesk was being used as a basic inbox
                    when it had the capability to route, automate, and self-serve most of the volume</em>. Hiring more agents
                    would have treated the symptom. The fix was to unlock automation and AI capabilities the company already owned
                    but had never configured.
                  </p>
                </div>
              </Glass>
            </S>

            {/* 08 Gap Analysis */}
            <S id="gap-analysis" num="08" title="Gap Analysis"
              sub="Current capability vs required capability — used to define the project scope precisely.">
              <T hs={["Capability", "Current State", "Required State", "Gap", "Priority"]} rows={[
                ["Tier-1 Query Resolution",  "Manual agent response",               "Bot auto-resolves with order data lookup",    "Critical", <Bdg color="red">Must</Bdg>],
                ["Ticket Routing",           "Manual (agents pick from queue)",      "Rules-based auto-routing by category",        "High",     <Bdg color="red">Must</Bdg>],
                ["First Response",           "18-hour average wait",                 "Bot instant reply < 30 seconds",             "Critical", <Bdg color="red">Must</Bdg>],
                ["Escalation to Human",      "Customer replies repeatedly until seen","One-click escalation from bot to live agent","High",     <Bdg color="red">Must</Bdg>],
                ["Knowledge Base",           "None — all in agents' heads",          "18 structured FAQ articles powering the bot","High",     <Bdg color="red">Must</Bdg>],
                ["CSAT Reporting",           "Manual weekly export (3 hrs)",          "Live Zendesk dashboard (automated)",         "Medium",   <Bdg color="yellow">Should</Bdg>],
                ["Shopify Order Integration","Manual agent lookup in separate tab",   "Order data surfaced in Zendesk sidebar",     "High",     <Bdg color="red">Must</Bdg>],
                ["Out-of-Hours Coverage",    "0% — tickets queue until next morning", "Bot handles Tier-1 24/7 including weekends", "High",     <Bdg color="red">Must</Bdg>],
              ]} />
            </S>

            {/* 09 Future State */}
            <S id="to-be" num="09" title="Future State (TO-BE)"
              sub="How every support query flows through the system post go-live.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">TO-BE Support Flow</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { lane: "Customer", color: CL, steps: ["Submits query (web chat / email)","Receives instant bot greeting (< 5 sec)","Selects category or types query","Bot resolves (67% of cases) OR hands off seamlessly to agent"] },
                    { lane: "Zendesk Bot (AI)", color: "#3B82F6", steps: ["Detects intent from message","Looks up order data via Shopify API","Generates personalised response","If resolved → closes ticket automatically","If not → creates routed ticket + full context for agent"] },
                    { lane: "Support Agent", color: "#10B981", steps: ["Receives only complex / escalated tickets","Full bot transcript visible — no re-reading context","Focuses on billing disputes, complaints, exceptions","Logs resolution — bot learns from outcomes"] },
                    { lane: "Support Lead / Ops", color: "#F59E0B", steps: ["Live Zendesk dashboard — volume, CSAT, automation rate","Weekly report auto-generated Monday 08:00","Bot performance reviewed monthly — intents updated as needed"] },
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

            {/* 10 Automation Scope */}
            <S id="automation-scope" num="10" title="Automation Scope & Intent Design"
              sub="Deciding WHAT the bot handles — the most critical BA decision in any automation project.">
              <p className="text-[#9CA3AF] leading-relaxed">
                The most important requirement in this project was not what to automate — it was <em>what not to automate</em>.
                I led a scoping workshop with the Support Lead, Head of Operations, and CTO to define hard boundaries. Four
                categories were designated as <strong className="text-[#F9FAFB]">human-only</strong> regardless of volume, based
                on customer impact risk and complaint escalation history.
              </p>
              <T hs={["Intent / Category", "Bot Handles?", "Reasoning", "Volume Share"]} rows={[
                ["Order status & tracking",          <Bdg color="green">✓ Automated</Bdg>,  "Fully formulaic — pull from Shopify, reply with status + tracking link",         "28%"],
                ["Return initiation",                <Bdg color="green">✓ Automated</Bdg>,  "Rule-based eligibility check + generate return label",                           "14%"],
                ["Refund status update",             <Bdg color="green">✓ Automated</Bdg>,  "Look up refund record, return status + estimated date",                          "11%"],
                ["Password reset",                   <Bdg color="green">✓ Automated</Bdg>,  "Trigger account reset email via Shopify API",                                    "8%"],
                ["Discount code issues",             <Bdg color="green">✓ Automated</Bdg>,  "Validate code, identify reason for failure, offer resolution options",           "5%"],
                ["Address change (pre-dispatch)",    <Bdg color="green">✓ Automated</Bdg>,  "Check dispatch status; update if pre-dispatch, escalate if dispatched",          "2%"],
                ["Billing disputes",                 <Bdg color="red">✗ Human only</Bdg>,   "Risk of incorrect resolution causing chargebacks — needs human judgment",         "14%"],
                ["Complaints / negative sentiment",  <Bdg color="red">✗ Human only</Bdg>,   "Bot escalation trigger: keywords detected (angry, terrible, complaint etc.)",     "10%"],
                ["Complex order issues (multi-item)",<Bdg color="red">✗ Human only</Bdg>,   "Too many edge cases; wrong resolution more damaging than a 2-hr wait",           "5%"],
                ["Account suspension / fraud flags", <Bdg color="red">✗ Human only</Bdg>,   "Legal and security sensitivity; zero tolerance for automated error",              "3%"],
              ]} />
              <IB t="s">
                <strong>Design principle I established:</strong> &quot;If getting this wrong costs more than the delay of waiting
                for a human, a human must handle it.&quot; This framing resolved all ambiguous scoping debates in the workshop.
              </IB>
            </S>

            {/* 11 BRD */}
            <S id="brd" num="11" title="Business Requirements"
              sub="Core requirements from the BRD — agreed and signed off by Head of Operations and CTO before build began.">
              <T hs={["ID", "Priority", "Requirement", "Acceptance Criterion"]} rows={[
                ["BR-001", <Bdg color="red">Must</Bdg>,    "Bot shall automatically resolve Tier-1 queries (6 defined intents) without agent involvement",        "≥ 65% of all tickets closed by bot; zero agent action required"],
                ["BR-002", <Bdg color="red">Must</Bdg>,    "Bot shall respond to any inbound customer message within 30 seconds, 24 hours a day, 7 days a week",  "Response timestamp < 30 sec from ticket creation across all hours"],
                ["BR-003", <Bdg color="red">Must</Bdg>,    "Bot shall surface Shopify order data in responses without the customer needing to repeat order details","Order number, status, and tracking link present in bot reply"],
                ["BR-004", <Bdg color="red">Must</Bdg>,    "Bot shall detect negative sentiment and escalate to a human agent within 1 message",                   "Sentiment keywords trigger immediate human routing — tested in UAT"],
                ["BR-005", <Bdg color="red">Must</Bdg>,    "Customer shall be able to reach a human agent in 1 click at any point in a bot conversation",          "Escalation option visible in every bot message; tested in UAT"],
                ["BR-006", <Bdg color="red">Must</Bdg>,    "When escalating, bot shall pass full conversation transcript and order context to the agent",           "Agent receives complete context before sending first reply"],
                ["BR-007", <Bdg color="yellow">Should</Bdg>,"Zendesk dashboard shall display live automation rate, CSAT, and ticket volume — updated in real time", "Dashboard loads in < 3 seconds; CSAT data < 1 hr lag"],
                ["BR-008", <Bdg color="yellow">Should</Bdg>,"Bot shall support self-service return label generation with eligibility check (within return window)",  "Return label emailed to customer within 2 minutes of request"],
                ["BR-009", <Bdg color="orange">Could</Bdg>, "Bot shall identify and suggest upsell or replacement products where relevant (Phase 2)",               "Out of scope Phase 1 — documented in backlog for Phase 2"],
              ]} />
            </S>

            {/* 12 User Stories */}
            <S id="user-stories" num="12" title="User Stories"
              sub="Sample stories from the 28-story Jira backlog, covering the three primary user types.">
              <div className="space-y-5">
                {[
                  {
                    epic: "EPIC-01: Bot Resolution (Customer)", color: CL,
                    stories: [
                      { id: "US-001", pts: 8,  persona: "Customer", story: "I want to check my order status instantly via chat so that I don't have to wait 18 hours for a reply when I just need a tracking number.", priority: "Must" },
                      { id: "US-002", pts: 5,  persona: "Customer", story: "I want to initiate a return through the chat bot so that I don't have to call or email and wait for manual processing.", priority: "Must" },
                      { id: "US-003", pts: 3,  persona: "Customer", story: "I want to be connected to a real person immediately if I'm unhappy with the bot's response so that I don't feel stuck in an automated loop.", priority: "Must" },
                    ]
                  },
                  {
                    epic: "EPIC-02: Agent Efficiency (Support Agent)", color: "#3B82F6",
                    stories: [
                      { id: "US-010", pts: 5,  persona: "Support Agent", story: "I want to see the full bot conversation and order details before I respond so that I don't have to ask the customer to repeat themselves.", priority: "Must" },
                      { id: "US-011", pts: 3,  persona: "Support Agent", story: "I want the bot to handle all password resets and order tracking queries so that I can spend my time on queries that actually need my judgment.", priority: "Must" },
                    ]
                  },
                  {
                    epic: "EPIC-03: Visibility (Operations)", color: "#F59E0B",
                    stories: [
                      { id: "US-020", pts: 8,  persona: "Head of Operations", story: "I want a live dashboard showing ticket volume, automation rate, and CSAT in real time so that I can monitor support health without waiting for a Friday report.", priority: "Should" },
                      { id: "US-021", pts: 5,  persona: "Support Lead", story: "I want a weekly automated CSAT summary emailed to me every Monday so that I don't spend 3 hours building it manually each Friday.", priority: "Should" },
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
                            <Bdg color="purple">{persona}</Bdg>
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

            {/* 13 UAT */}
            <S id="uat" num="13" title="UAT & Testing"
              sub="How I validated the solution against requirements before go-live.">
              <T hs={["Test Case", "Scenario", "Expected Result", "Actual Result", "Status"]} rows={[
                ["TC-001", "Customer types 'where is my order' — valid order number on file",    "Bot returns order status + tracking link within 30 sec",              "Resolved in 12 sec",              <Bdg color="green">Pass</Bdg>],
                ["TC-002", "Customer initiates return for 8-day-old order (within 14-day policy)","Bot confirms eligibility, generates return label, emails to customer", "Label emailed in 78 sec",         <Bdg color="green">Pass</Bdg>],
                ["TC-003", "Customer types 'I am furious' mid-conversation",                     "Bot detects negative sentiment; routes to human agent immediately",    "Routed in 1 message",             <Bdg color="green">Pass</Bdg>],
                ["TC-004", "Customer clicks 'Talk to a person' button at any point",             "Ticket routed to human agent; full transcript attached",               "Context passed correctly",        <Bdg color="green">Pass</Bdg>],
                ["TC-005", "Customer contacts outside business hours (Sunday 2am)",              "Bot responds instantly; resolves Tier-1 without agent",               "Responded in 8 sec",              <Bdg color="green">Pass</Bdg>],
                ["TC-006", "Customer asks about a billing dispute",                              "Bot recognises billing intent; routes to human with context",          "Routed correctly",                <Bdg color="green">Pass</Bdg>],
                ["TC-007", "Customer submits query with no clear intent",                        "Bot asks clarifying question with category options",                   "Clarification sent",              <Bdg color="green">Pass</Bdg>],
                ["TC-008", "Customer types profanity in first message",                          "Bot flags as escalation; routes to agent with sensitivity note",       "FAIL — routed but no note",       <Bdg color="red">Fail → Fixed</Bdg>],
              ]} />
              <IB t="s">
                <strong>Defect found and fixed:</strong> TC-008 revealed that the sentiment flag was routing the ticket correctly
                but not appending the sensitivity note to the agent view. Fixed by the dev team within 4 hours. Retested and
                passed on the same day. Go-live was not delayed.
              </IB>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">UAT Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MC v="32" label="Test Cases Executed" c={CL} />
                  <MC v="31" label="Passed on First Run" c="#10B981" />
                  <MC v="1" label="Defect Found & Fixed" c="#F59E0B" note="P2 severity" />
                  <MC v="0" label="Critical Defects at Go-Live" c="#10B981" />
                </div>
              </Glass>
            </S>

            {/* 14 Go-Live */}
            <S id="go-live" num="14" title="Deployment & Go-Live"
              sub="How I managed the rollout to minimise risk and ensure adoption.">
              <div className="space-y-3">
                {[
                  { step: "Week 9", title: "Soft Launch (Email Channel Only)", color: C, desc: "Bot activated on email channel only. Web chat remained human-handled. This allowed us to monitor bot responses in a lower-stakes channel and build confidence before expanding." },
                  { step: "Day 4", title: "First 48-hour Review", color: CL, desc: "Reviewed all 94 bot interactions in the first 48 hours. 81% resolved without agent. Two intents were underperforming — 'order not arrived' and 'wrong item received' — and were retuned." },
                  { step: "Week 10", title: "Full Go-Live (All Channels)", color: "#3B82F6", desc: "Bot activated on web chat and email. All 5 agents trained in two 45-minute sessions covering: how to read the bot transcript, how escalations arrive, and how to update the bot's knowledge base." },
                  { step: "Week 10+", title: "Post-Go-Live Monitoring", color: "#10B981", desc: "Reviewed automation rate, escalation rate, and CSAT daily for the first 2 weeks. Flagged any bot responses that generated immediate negative feedback for retraining. Results confirmed stable by end of Week 12." },
                ].map(({ step, title, color, desc }, i, arr) => (
                  <div key={step} className="flex gap-4">
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
              sub="Measured outcomes against targets, tracked 4 weeks post go-live.">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                <MC v="67%" label="Ticket Auto-Resolution Rate" c="#10B981" note="Target was 60%" />
                <MC v="−64%" label="Human Ticket Volume" c={CL} note="2,400 → 860/month" />
                <MC v="2 hrs" label="First Response Time" c="#3B82F6" note="Down from 18 hours" />
                <MC v="82%" label="CSAT Score" c="#F59E0B" note="Up from 61% (+21pts)" />
                <MC v="£76K" label="Est. Annual Cost Saving" c="#10B981" note="vs. hiring a 6th agent" />
                <MC v="0 hrs" label="Agent Overtime" c={CL} note="Was 48 hrs/month" />
              </div>
              <T hs={["Metric", "Before", "After", "Change", "vs Target"]} rows={[
                ["Ticket auto-resolution rate",     "0%",          "67%",        "+67%",   <Bdg color="green">Exceeded (target: 60%)</Bdg>],
                ["Human ticket volume / month",     "2,400",       "860",        "−64%",   <Bdg color="green">Exceeded (target: −50%)</Bdg>],
                ["First response time (human)",     "18 hours",    "2 hours",    "−89%",   <Bdg color="green">Exceeded (target: &lt; 4 hrs)</Bdg>],
                ["CSAT score",                      "61%",         "82%",        "+21pts", <Bdg color="green">Exceeded (target: 72%)</Bdg>],
                ["Cost per ticket",                 "£12.00",      "£4.20",      "−65%",   <Bdg color="green">Exceeded</Bdg>],
                ["Agent overtime hours",            "48 hrs/month","0",          "−100%",  <Bdg color="green">Achieved</Bdg>],
                ["Out-of-hours resolution coverage","0%",          "67% of OOH", "New capability", <Bdg color="green">Achieved</Bdg>],
              ]} />
              <IB t="s">
                <strong>Head of Operations (Sarah Yates) at 4-week review:</strong> &ldquo;We didn&apos;t hire the sixth agent.
                The team is less stressed, customers are happier, and I have a dashboard I can actually look at. This is exactly
                what we needed — and it was delivered in 10 weeks.&rdquo;
              </IB>
            </S>

            {/* 16 BA Skills */}
            <S id="ba-skills" num="16" title="BA Skills Demonstrated"
              sub="A summary of the core business analysis competencies this project exercised.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { skill: "Ticket Data Analysis",        detail: "Audited 3 months of Zendesk data to classify 2,400 tickets into 12 categories — revealing the 68% automatable finding that justified the entire project.",   color: CL },
                  { skill: "Stakeholder Management",       detail: "Turned a resistant Support Team Lead into a co-designer and UAT champion by addressing job-security concerns early and making him part of the solution.",     color: "#3B82F6" },
                  { skill: "Scope Definition",             detail: "Defined the automation boundary (what the bot handles vs. what it must not) — the most consequential BA decision in any AI project.",                         color: "#10B981" },
                  { skill: "Requirements Documentation",   detail: "Produced BRD with 9 traceable requirements, 28 Jira user stories, and 18 conversation flow specs — all approved before build started.",                       color: "#F59E0B" },
                  { skill: "Process Mapping (AS-IS/TO-BE)","detail": "Documented the 7-step current-state support flow and redesigned it with automation touchpoints — giving the dev team a blueprint, not just a wish list.",   color: CL },
                  { skill: "UAT Design & Execution",       detail: "Designed 32 test cases covering happy path, edge cases, and failure modes. Found 1 defect in testing (not in production). Go-live with zero critical issues.", color: "#3B82F6" },
                  { skill: "Phased Rollout Planning",      detail: "Recommended a soft launch on email-only before full go-live — a risk mitigation call that let us retune 2 underperforming intents before customers noticed.", color: "#10B981" },
                  { skill: "ROI Articulation",             detail: "Quantified the cost of inaction (£10,700/month in automatable agent time) to build the business case, and tracked actual savings post go-live.",              color: "#F59E0B" },
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
                {["Zendesk","AI Chatbot Design","Process Mapping","Stakeholder Management","BRD","User Stories","UAT","Data Analysis","Requirements Elicitation","Agile / Scrum"].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full border"
                    style={{ background: "rgba(123,114,225,0.08)", borderColor: "rgba(123,114,225,0.2)", color: CL }}>
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
