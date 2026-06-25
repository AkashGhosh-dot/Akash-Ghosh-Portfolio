"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Info,
  Car, TrendingUp, Database, Target, Users, Code2,
  FileText, Layers, Activity, Zap, GitBranch, TestTube2,
  Rocket, Settings, BookOpen, Award, RefreshCw,
  MessageSquare, Clock, Shield, MapPin,
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

const BLUE  = "#60A5FA";
const LBLUE = "#93C5FD";

// ── Helpers ───────────────────────────────────────────────────────

function S({ id, num, title, sub, children }: {
  id: string; num: string; title: string; sub?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-20">
      <div className="flex items-start gap-3 mb-7">
        <span className="font-mono text-xs font-bold shrink-0 mt-1 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", color: BLUE }}>
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
    i: { bg: "rgba(96,165,250,0.07)",  bd: "rgba(96,165,250,0.2)",  ic: LBLUE,     el: <Info size={14} /> },
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
    blue:   { bg: "rgba(96,165,250,0.1)",  text: "#93C5FD",  border: "rgba(96,165,250,0.25)"  },
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

// ── Page ──────────────────────────────────────────────────────────

export default function CarRentalCaseStudy() {
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
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-[#60A5FA]/6 blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 relative z-10">
          <Link href="/#case-studies"
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F9FAFB] text-sm mb-8 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Studies
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Bdg color="blue">Operations &amp; Systems</Bdg>
            <Bdg color="green">10 Weeks</Bdg>
            <Bdg color="blue">Business Analyst</Bdg>
            <Bdg color="indigo">System Design · SQL · Process Mapping</Bdg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F9FAFB] leading-tight mb-4">
            Car Rental Booking<br />
            <span style={{ background: "linear-gradient(135deg,#60A5FA,#93C5FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Management System
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl leading-relaxed mb-10">
            A mid-size Indian car rental company operating 85 cars across 3 cities was losing customers every
            week due to double bookings, cars being given out that were actually in the garage for service,
            and a booking process done entirely through phone calls and Excel sheets. This is the full BA
            journey from understanding the chaos to delivering a working booking management system.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MC v="23"    label="Double bookings per month"     c="#EF4444" note="Customers arriving, no car ready" />
            <MC v="58%"   label="Fleet utilization before"      c="#F59E0B" note="Many cars sitting idle unseen" />
            <MC v="0"     label="Double bookings after go-live" c="#10B981" note="8 weeks post-launch" />
            <MC v="78%"   label="Fleet utilization after"       c={BLUE}    note="+20 percentage points" />
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
                      ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                      : "text-[#4B5563] hover:text-[#D1D5DB] hover:bg-white/[0.03]"
                  }`}>
                  <span className={`font-mono text-[10px] shrink-0 w-5 ${active === id ? "text-[#60A5FA]" : "text-[#374151]"}`}>{num}</span>
                  <span className="truncate">{title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">

            {/* ── 01 ── */}
            <S id="business-problem" num="01" title="Business Problem"
              sub="A car rental company running its entire operation on phone calls, WhatsApp messages, and Excel sheets — with no way to know in real time which cars were available.">
              <p className="text-[#9CA3AF] leading-relaxed">
                An Indian car rental company with <span className="text-[#F9FAFB] font-medium">85 cars across
                3 city branches</span> was managing all bookings manually. Customers would call, a branch
                agent would check an Excel sheet, confirm the car was available, and write down the booking.
                But the Excel sheet was only updated at that one branch — the other two branches couldn&apos;t
                see it. Cars going into the garage for service were sometimes still showing as available.
                And fleet managers had no way to see which cars were idle at which branch.
              </p>
              <Glass>
                <div className="space-y-4">
                  <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <p className="text-[#F87171] text-xs font-bold uppercase tracking-wider mb-1">Problem 1 — Double Bookings Happening Every Week</p>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      When two agents at different branches both confirmed the same car to two different
                      customers (or even two agents at the same branch checking a shared Excel at the same
                      time), the car would get double-booked. The customer would arrive at the counter,
                      wait 20+ minutes, and then be told no car was available. This happened on average{" "}
                      <strong className="text-white">23 times per month</strong>. Each incident led to a
                      complaint, a refund, and a customer who would likely never return.
                    </p>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <p className="text-[#FCD34D] text-xs font-bold uppercase tracking-wider mb-1">Problem 2 — Cars in the Garage Still Showing as &quot;Available&quot;</p>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      When a car went in for service or repair, the Fleet Manager would inform the Branch
                      Manager over WhatsApp. The Branch Manager would then manually update the Excel sheet.
                      But this didn&apos;t always happen — the message got missed, or the sheet wasn&apos;t
                      updated immediately. Agents then booked that car, and the customer arrived to find it
                      was not ready. This happened across all 3 branches regularly.
                    </p>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "rgba(96,165,250,0.07)", border: "1px solid rgba(96,165,250,0.2)" }}>
                    <p className="text-[#93C5FD] text-xs font-bold uppercase tracking-wider mb-1">Problem 3 — Fleet Sitting Idle Because Nobody Could See It</p>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      Fleet utilization was only <strong className="text-white">58%</strong> — meaning 4
                      out of every 10 cars were not being rented on any given day. The Operations Manager
                      had no central view of which cars were available at which branch. If Branch A had 8
                      idle cars and Branch B had no cars available, there was no system to know this and
                      redirect bookings. Customers would be turned away from one branch while another
                      had unused cars just 20 km away.
                    </p>
                  </div>
                </div>
              </Glass>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="23"    label="Double bookings per month"      c="#EF4444" note="Leading cause of customer loss" />
                <MC v="22min" label="Avg. check-in wait time"        c="#F59E0B" note="Fully manual paperwork process" />
                <MC v="58%"   label="Fleet utilization"              c="#9CA3AF" note="42% of cars sitting unused" />
                <MC v="3"     label="Branches with no data sync"     c="#EF4444" note="Each branch used its own Excel" />
              </div>
              <T hs={["What Was Wrong", "The Real Impact"]} rows={[
                ["Same car being booked by two agents at the same time on the same day",                       "Customer arrives at the branch, no car is available. Complaint, refund, lost customer."],
                ["Cars in the garage marked as available because Excel wasn't updated in time",               "Agents booking cars that are physically not ready. Customer finds out only on arrival."],
                ["No central view — each branch only sees its own Excel sheet",                               "Operations Manager can't see idle cars at Branch A being wasted while Branch B turns customers away."],
                ["No customer database — bookings had no history; same customer would fill a form every time","Agents manually re-typing the same customer's name and ID every single booking."],
                ["No digital record of car returns — verbal handover only",                                   "No accountability if a car is returned damaged. No record of who had the car and when."],
              ]} />
            </S>

            {/* ── 02 ── */}
            <S id="stakeholders" num="02" title="Stakeholder Identification"
              sub="Mapping every person who was affected by the problem or needed to be involved in building the solution.">
              <p className="text-[#9CA3AF] leading-relaxed">
                This company had 3 branches in 3 different cities. Each branch had its own team. The head
                office had an Operations Manager and a Finance Manager who needed visibility across all
                branches. I mapped everyone who would either provide information, approve decisions, or use
                the final system — and decided how to engage with each of them.
              </p>
              <T hs={["Designation", "What They Needed", "Why They Matter", "Power", "Interest"]} rows={[
                ["Operations Manager (Head Office)", "A single dashboard showing all 3 branches — total bookings, idle cars, revenue, complaints", "Final decision maker; project sponsor; approved budget",                              <Bdg color="red">High</Bdg>,    <Bdg color="red">High</Bdg>],
                ["Branch Manager (×3)",              "Real-time booking screen, ability to see which cars are available right now at their branch", "Day-to-day users of the new system; critical for adoption",                          <Bdg color="yellow">Med</Bdg>,  <Bdg color="red">High</Bdg>],
                ["Fleet Manager",                    "A way to mark a car as 'In Service' or 'Back from Service' that immediately shows for everyone","Controls vehicle availability — most impacted person by the old manual system",     <Bdg color="yellow">Med</Bdg>,  <Bdg color="red">High</Bdg>],
                ["Customer Service Agents (×6)",     "A simple booking screen — enter customer name, date, car type, confirm. Fast and easy.",       "The people who create every booking; heavy daily users of the system",               <Bdg color="red">Low</Bdg>,     <Bdg color="red">High</Bdg>],
                ["Finance Manager",                  "Monthly revenue report per branch; pending payments; total bookings vs. cancellations",        "Needs financial data; currently receives a manually compiled Excel from each branch", <Bdg color="red">High</Bdg>,    <Bdg color="yellow">Med</Bdg>],
                ["IT Manager",                       "Clear technical specifications before development begins",                                     "Will build and maintain the system; must be involved from early design",             <Bdg color="yellow">Med</Bdg>,  <Bdg color="yellow">Med</Bdg>],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Power / Interest Grid</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Manage Closely — involve in every decision", bg: "rgba(239,68,68,0.08)", bd: "rgba(239,68,68,0.2)",   names: ["Operations Manager — project sponsor and final approver", "Finance Manager — budget and reporting owner"] },
                    { label: "Keep Informed — update at each milestone",   bg: "rgba(245,158,11,0.08)",bd: "rgba(245,158,11,0.2)",  names: ["Branch Managers (×3) — must buy in for adoption to succeed", "Fleet Manager — owns the most critical data field (car status)"] },
                    { label: "Keep Satisfied — involve in UAT",            bg: "rgba(96,165,250,0.08)",bd: "rgba(96,165,250,0.2)",  names: ["IT Manager — needs specs, not status updates", "Customer Service Agents — should test before go-live"] },
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
              sub="Understanding the problem from every angle — using different techniques because what an agent experiences at the counter is different from what the Operations Manager needs at the head office.">
              <p className="text-[#9CA3AF] leading-relaxed">
                I used 4 techniques across 2 weeks. The most important one was process observation — sitting
                at the busiest branch counter for a full day and watching how agents actually handled
                bookings. What I saw in person was very different from what the stakeholders had described
                in their interviews.
              </p>
              <T hs={["Technique", "How I Did It", "What I Found"]} rows={[
                ["1:1 Interviews",         "30–40 minute sessions with Operations Manager, Finance Manager, all 3 Branch Managers, and the Fleet Manager. Used structured questions each time.",                                                    "Everyone described a different version of the same problem. The Branch Manager was worried about double bookings. The Fleet Manager was frustrated that no one updated the Excel when cars went to service. The Operations Manager just wanted one number: 'How many cars do I have available right now across all 3 branches?'"],
                ["Process Observation",    "Spent one full working day (10am to 8pm) at the busiest branch, watching every booking being made, every phone call, every update to the Excel sheet.",                                                  "In 10 hours, 14 bookings were made. 9 of those required the agent to first call the other branch to double-check they weren't booking the same car. Average booking call time: 18 minutes. Two near-misses where the same car was almost double-booked within the same hour."],
                ["Document Analysis",      "Reviewed 3 months of booking Excel files from all 3 branches, complaint logs, and the maintenance WhatsApp group chat history.",                                                                          "Found 23 confirmed double-booking incidents in 1 month. Found 11 instances where a car was booked that was in the service log — meaning 11 customers arrived to find their car wasn't ready, just in the last 3 months. Complaint log: 78% of complaints were about 'car not available on arrival'."],
                ["Group Workshop",         "2-hour session with all 3 Branch Managers together, run at the head office. Used a whiteboard to map the current booking process step by step.",                                                       "The 3 Branch Managers described 3 slightly different processes — each branch had informally evolved its own workflow over time. This explained why cross-branch coordination was so difficult. There was no standard process."],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Sample Interview Questions — Branch Manager</h3>
                <div className="space-y-2">
                  {[
                    "Walk me through exactly what happens from the moment a customer calls to book a car until they pick it up.",
                    "How do you currently know which cars are available right now at your branch?",
                    "When you find out a car you booked has already been booked by another agent, what do you do?",
                    "How do you find out that a car has gone to the garage for service? Who tells you and how?",
                    "What is the most frustrating part of your current booking process?",
                  ].map((q, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: BLUE }}>Q{i + 1}</span>
                      <p className="text-[#D1D5DB] text-sm leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </Glass>
              <IB t="w">
                <strong>Key finding from observation:</strong> Agents were spending 35–40% of their booking
                time not talking to customers — but calling other branches to check if a car had already
                been booked there. This &quot;coordination overhead&quot; was a direct result of having no
                shared system. Every booking required manual verification across 3 branches. The new system
                had to eliminate this entirely.
              </IB>
            </S>

            {/* ── 04 ── */}
            <S id="as-is" num="04" title="As-Is Process Analysis"
              sub="A step-by-step map of exactly how a booking is handled today — from the first phone call to the customer driving away. Every problem is hidden inside this process.">
              <T hs={["Step", "What Happens", "Who Does It", "The Problem"]} rows={[
                ["Step 1",  "Customer calls the branch to ask about car availability for specific dates",                  "Customer Service Agent",     "Agent has no system — has to mentally recall bookings or look at a paper register first"],
                ["Step 2",  "Agent checks the branch Excel sheet for that date to see if any car of the required type is available", "Customer Service Agent", "Excel is only this branch's data. Agent cannot see if a car was booked at another branch and shifted here."],
                ["Step 3",  "Agent calls the other 2 branches to double-check no one else has that car booked",           "Customer Service Agent",     "Takes 10–15 minutes. Sometimes agents at other branches don't pick up. Booking gets confirmed without full verification."],
                ["Step 4",  "If available, agent verbally confirms with customer and manually writes booking in the Excel", "Customer Service Agent",    "Two agents checking at the same time can both see 'available' and both confirm to different customers — classic race condition."],
                ["Step 5",  "No confirmation sent to customer — customer is told to 'just come at your time'",            "—",                          "Customer has no proof of booking. Disputes arise at the counter."],
                ["Step 6",  "Car goes for service — Fleet Manager sends a WhatsApp to the Branch Manager",                "Fleet Manager",              "WhatsApp message can be missed or delayed. Branch Manager may not update Excel immediately."],
                ["Step 7",  "If Excel not updated, agent books the service car — customer arrives to find it not ready",  "Customer Service Agent",     "Happens 4–5 times per month across all 3 branches. Major source of complaints."],
                ["Step 8",  "Customer arrives for pickup — agent manually fills a paper rental agreement form",           "Customer Service Agent",     "Takes 18–22 minutes of data entry per customer. Customer waits at the counter."],
                ["Step 9",  "Customer returns the car — verbal handover, agent checks it and writes notes on paper",      "Customer Service Agent",     "No digital record. If damage discovered later, no documentation to prove which customer caused it."],
                ["Step 10", "End of month: each branch compiles a revenue and booking summary in Excel and emails it to head office", "Branch Manager", "Head office receives 3 different Excel files with different formats. Finance Manager spends 4–5 hours combining them."],
              ]} />
              <IB t="w">
                The most serious problem in the entire AS-IS process is Step 4 — the double-booking race
                condition. When two agents both look at the Excel at the same moment, both see the same car
                as &quot;available&quot;, and both confirm to separate customers — there is no system to
                prevent this. It is structurally impossible to solve with Excel alone, no matter how
                carefully agents work. This required a technology solution.
              </IB>
            </S>

            {/* ── 05 ── */}
            <S id="root-cause" num="05" title="Root Cause Analysis"
              sub="Using the 5 Whys technique to find the actual root cause behind double bookings and low fleet utilization — so the solution fixes the real problem, not just the surface symptom.">
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">5 Whys — Problem 1: Why do double bookings keep happening?</h3>
                <div className="space-y-2">
                  {[
                    { why: "Why 1", q: "Why do double bookings happen?",                                              a: "Two agents confirm the same car to two different customers at the same time, because both can see the car as 'available' in the Excel simultaneously." },
                    { why: "Why 2", q: "Why can both agents see the car as available at the same time?",              a: "Excel has no locking mechanism. When one agent is in the middle of confirming a booking, the file does not show 'in progress' to anyone else." },
                    { why: "Why 3", q: "Why is Excel being used for real-time booking management?",                   a: "The company started with 5 cars and 1 branch. Excel worked fine then. As the business grew to 85 cars across 3 branches, no one upgraded the system." },
                    { why: "Why 4", q: "Why was the system not upgraded as the business grew?",                       a: "There was no Operations Manager role until 18 months ago. Decisions about systems were made by individual Branch Managers who were too busy with day-to-day operations to step back and identify the problem." },
                    { why: "Why 5", q: "Why was there no one responsible for identifying and fixing operational system gaps?", a: "The company grew informally. No structured review of operational processes was ever done. Problems were handled one at a time as they came up — not addressed at the root." },
                  ].map(({ why, q, a }, i, arr) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0 pt-0.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.35)", color: BLUE }}>
                          {i + 1}
                        </div>
                        {i < arr.length - 1 && <div className="w-px flex-1 my-1 min-h-[16px]" style={{ background: "rgba(96,165,250,0.15)" }} />}
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
                      The root cause is not careless agents — it is using a tool (Excel) that is incapable
                      of handling real-time concurrent bookings across multiple users and branches. No amount
                      of training or process improvement can fix a structural limitation of the tool itself.
                      The only fix is a booking system where confirming a booking immediately blocks that car
                      for everyone else — in real time.
                    </p>
                  </div>
                </div>
              </Glass>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">5 Whys — Problem 2: Why is fleet utilization only 58%?</h3>
                <div className="space-y-2">
                  {[
                    { why: "Why 1", q: "Why are 42% of cars idle on any given day?",                                  a: "Agents at Branch A don't know that Branch B has cars available. They simply tell customers 'we have no cars' — even though there are 8 available 20 km away." },
                    { why: "Why 2", q: "Why don't agents at Branch A know about available cars at Branch B?",          a: "There is no cross-branch view. Each branch's Excel file is a standalone document only that branch can edit or view." },
                    { why: "Why 3", q: "Why is there no cross-branch view?",                                          a: "Sharing a single Excel across 3 branches was tried but caused file corruption and merge conflicts. The branches went back to separate files." },
                    { why: "Why 4", q: "Why was no proper multi-user system considered when shared Excel failed?",    a: "The problem was escalated to the Operations Manager, but the immediate fix (separate files) was implemented and the underlying issue was never revisited." },
                    { why: "Why 5", q: "Why was the underlying issue never revisited?",                               a: "No formal process exists for reviewing and improving operational systems. Problems get solved urgently and then forgotten." },
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
                ["People",     "Agents solving problems in silos — no cross-branch communication or shared ownership of fleet visibility"],
                ["Process",    "No standard booking process across branches; no formal escalation for system issues; no operational review cycle"],
                ["Technology", "Excel is not designed for concurrent multi-user, multi-location booking management. File locking is not possible."],
                ["Data",       "No central customer database; no maintenance log integrated with availability; no historical booking data for capacity planning"],
              ]} />
            </S>

            {/* ── 06 ── */}
            <S id="gap-analysis" num="06" title="Gap Analysis"
              sub="Comparing what the business has today against what it needs — making the scope of the new system completely clear before design begins.">
              <T hs={["What the Business Needs", "What Exists Today", "The Gap", "Priority"]} rows={[
                ["Real-time car availability — any agent sees the same up-to-date availability at any moment", "A branch-specific Excel updated manually by agents at each branch",           "No live/shared view; availability 30 min to 24 hrs stale depending on when Excel was last updated", <Bdg color="red">Critical</Bdg>],
                ["Double-booking prevention — once a car is confirmed, it must be locked for everyone else", "No locking in Excel — two agents can see the same car as available simultaneously", "Structurally impossible to prevent with the current tool. Only a proper DB system can do this.", <Bdg color="red">Critical</Bdg>],
                ["Fleet Manager to update car status ('In Service') directly in the booking system",          "Fleet Manager sends a WhatsApp to Branch Manager who may or may not update Excel",  "3–4 service car bookings per month happen because the update chain breaks",                      <Bdg color="red">Critical</Bdg>],
                ["Cross-branch fleet view — Operations Manager sees all 3 branches at once",                 "3 separate Excel files; head office gets a combined report once a month",           "Operations Manager sees status only once a month, 30 days old",                                  <Bdg color="red">Critical</Bdg>],
                ["Digital check-in — customer details stored once, reused for every future booking",         "Paper form filled manually at the counter for every booking",                     "22-minute check-in per customer; same data re-entered every time; no customer history",           <Bdg color="yellow">High</Bdg>],
                ["Automated SMS confirmation sent to customer when booking is confirmed",                    "No confirmation; customer told verbally to 'just come on the day'",               "No proof of booking for customer; disputes at counter; trust issues",                             <Bdg color="yellow">High</Bdg>],
                ["Automated revenue report consolidated across all branches for Finance Manager",            "Finance Manager manually combines 3 Excel files every month (4–5 hours)",         "4–5 hours of finance team time wasted monthly on data consolidation",                             <Bdg color="orange">Medium</Bdg>],
              ]} />
            </S>

            {/* ── 07 ── */}
            <S id="brd" num="07" title="Business Requirements Document (BRD)"
              sub="The BRD captures every business requirement in plain language — agreed and signed off by the Operations Manager and Finance Manager before any development begins.">
              <T hs={["ID", "Priority", "What the System Must Do", "Problem It Fixes", "How We'll Know It's Done"]} rows={[
                ["BR-001", <Bdg color="red">Must</Bdg>,    "Show real-time car availability across all 3 branches in one single screen",                         "Cross-branch visibility gap",   "Agent at Branch A can see available cars at Branches B and C without calling them"],
                ["BR-002", <Bdg color="red">Must</Bdg>,    "When a booking is confirmed, the car must be immediately locked — no other agent can book it",       "Double bookings",               "No double booking in 1 month of testing with concurrent users"],
                ["BR-003", <Bdg color="red">Must</Bdg>,    "Fleet Manager must be able to mark a car as 'In Service' from the system — instantly visible to all","Service car still bookable",   "Within 5 minutes of Fleet Manager updating status, no agent can book that car"],
                ["BR-004", <Bdg color="red">Must</Bdg>,    "Store customer details once — when the same customer books again, auto-fill their information",       "22-min manual check-in",        "Returning customer check-in completed in under 5 minutes"],
                ["BR-005", <Bdg color="red">Must</Bdg>,    "Operations Manager must see a live dashboard: total bookings today, fleet status, revenue this month","Head office blind spot",        "Dashboard shows numbers updated within 15 minutes of any booking or change"],
                ["BR-006", <Bdg color="yellow">Should</Bdg>,"Send an automated SMS to the customer when their booking is confirmed — includes booking ID, car type, date and time", "No confirmation issue", "Customer receives SMS within 2 minutes of booking confirmation"],
                ["BR-007", <Bdg color="yellow">Should</Bdg>,"Generate an automated monthly revenue and booking report for Finance Manager — no manual compilation needed", "4–5 hr monthly effort", "Finance Manager receives report automatically on the 1st of each month"],
                ["BR-008", <Bdg color="orange">Could</Bdg>, "Allow customers to make bookings online through the company website",                                "Reach and convenience",         "Online booking form live; customer can book and receive SMS without calling"],
              ]} />
              <IB t="s">
                BRD formally reviewed and approved by the Operations Manager and Finance Manager at the end
                of Week 3. BR-008 (online booking) was moved to Phase 2 after discussion — the team agreed
                to get the internal system stable first before adding customer-facing features.
              </IB>
            </S>

            {/* ── 08 ── */}
            <S id="to-be" num="08" title="To-Be Process Design"
              sub="How the same booking process will work after the new system is in place — comparing each old step to the new way.">
              <p className="text-[#9CA3AF] leading-relaxed">
                The goal of the To-Be design was that any agent at any branch should be able to make a
                booking in under 5 minutes, with zero risk of a double booking, and with the customer
                getting a confirmation SMS automatically — without any manual coordination between branches.
              </p>
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-5 uppercase tracking-wider">New Booking Flow</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { lane: "Customer",           color: BLUE,     steps: ["Calls branch or walks in", "Gives preferred date, duration, car type"] },
                    { lane: "Agent (System)",      color: "#7B72E1",steps: ["Searches for available cars — system shows real-time results across all branches", "Selects car, enters customer info (auto-fills if returning customer)", "Confirms booking — car LOCKED in system immediately", "System sends SMS to customer automatically"] },
                    { lane: "Fleet Manager",       color: "#10B981", steps: ["Marks car 'In Service' from system when sending to garage", "System instantly removes car from available pool — no agent can book it", "Marks car 'Available' when service complete — re-enters pool immediately"] },
                    { lane: "Operations Manager",  color: "#F59E0B", steps: ["Opens dashboard — sees all 3 branches live: bookings today, cars available, revenue this month, pending returns"] },
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
              <T hs={["Old Way (AS-IS)", "New Way (TO-BE)", "Time Saved"]} rows={[
                ["Agent manually checks branch Excel for availability",                        "System shows real-time availability across all 3 branches on one screen",             "5–10 min saved per booking"],
                ["Agent calls other branches to verify the car isn't booked there too",       "No need to call — system locks the car at the point of confirmation for everyone",     "10–15 min saved per booking"],
                ["Agent manually writes booking in Excel — risk of double booking",           "Booking saved to database — car instantly locked; zero risk of double booking",        "Error eliminated"],
                ["No confirmation sent to customer",                                          "Automated SMS sent to customer within 2 minutes of booking",                           "Counter disputes eliminated"],
                ["Fleet Manager WhatsApps Branch Manager → Branch Manager updates Excel",     "Fleet Manager updates car status directly in system — visible immediately to all agents","Update delay eliminated"],
                ["Customer fills paper form at counter every booking (18–22 min)",            "Returning customer auto-filled from database; new customer entered once (4–5 min)",     "14–18 min per returning customer"],
                ["Finance Manager combines 3 Excel files every month (4–5 hours)",            "Automated report generated on 1st of every month — Finance Manager downloads in 1 click","4–5 hours/month saved"],
              ]} />
            </S>

            {/* ── 09 ── */}
            <S id="frs" num="09" title="Functional & Non-Functional Requirements"
              sub="Functional requirements describe what the system must do. Non-functional requirements describe how well it must do it.">
              <T hs={["ID", "What the System Must Do (Functional)", "From BR", "Priority"]} rows={[
                ["FR-001", "Show all available cars across all 3 branches for a searched date range — with car type, branch location, and daily rate",                  "BR-001", <Bdg color="red">Must</Bdg>],
                ["FR-002", "When an agent confirms a booking, the selected car must be locked in the system immediately — no other agent can select it",               "BR-002", <Bdg color="red">Must</Bdg>],
                ["FR-003", "Fleet Manager can update car status: Available / In Service / Under Repair / Retired. Change reflects immediately for all agents.",         "BR-003", <Bdg color="red">Must</Bdg>],
                ["FR-004", "Customer database: store name, phone number, ID proof type and number. Auto-fill when the same phone number is entered again.",            "BR-004", <Bdg color="red">Must</Bdg>],
                ["FR-005", "Operations dashboard: total bookings today (all branches), number of cars available (all branches), total revenue this month, last 7-day trend", "BR-005", <Bdg color="red">Must</Bdg>],
                ["FR-006", "Booking confirmation SMS sent automatically: customer name, booking ID, car type, pickup date and time, branch address",                   "BR-006", <Bdg color="yellow">Should</Bdg>],
                ["FR-007", "Generate and email a consolidated monthly report to Finance Manager: bookings, revenue, cancellations, per branch breakdown",               "BR-007", <Bdg color="yellow">Should</Bdg>],
                ["FR-008", "Car return flow: agent marks car as 'Returned' in system, records fuel level and any damage notes with a photo upload option",             "BR-002", <Bdg color="yellow">Should</Bdg>],
                ["FR-009", "Booking history per car — all past bookings for a specific car, with customer name, dates, and any damage notes",                          "BR-004", <Bdg color="orange">Could</Bdg>],
              ]} />
              <T hs={["ID", "How the System Must Behave (Non-Functional)", "Measured By", "Priority"]} rows={[
                ["NFR-001", "Car availability screen must load within 2 seconds after search — agents cannot wait longer than this during a live customer call",     "Load test with 10 concurrent users",                  <Bdg color="red">Must</Bdg>],
                ["NFR-002", "The car locking must happen within 1 second of booking confirmation — the smaller the window, the lower the double-booking risk",       "Test with 2 agents confirming same car simultaneously", <Bdg color="red">Must</Bdg>],
                ["NFR-003", "System must be accessible from any desktop browser — agents use different computers at different branches",                             "Test on Chrome, Firefox, Edge",                       <Bdg color="red">Must</Bdg>],
                ["NFR-004", "Only employees with a valid login can access the system — no public access",                                                           "Try accessing without login; should redirect to login", <Bdg color="red">Must</Bdg>],
                ["NFR-005", "SMS must be sent within 2 minutes of booking confirmation",                                                                           "Time from confirmation to SMS delivery logged for 20 test bookings", <Bdg color="yellow">Should</Bdg>],
              ]} />
            </S>

            {/* ── 10 ── */}
            <S id="user-stories" num="10" title="User Stories & Acceptance Criteria"
              sub="Each user story describes one feature from the perspective of the person who will use it — so the developer understands who they're building for and why, not just what to build.">
              <div className="space-y-5">
                {[
                  {
                    epic: "Epic 1 — Real-Time Booking & Conflict Prevention", color: BLUE,
                    stories: [
                      { id: "US-001", pts: 13, role: "Customer Service Agent", story: "I want to see all available cars across all 3 branches when I search for a date, so that I can book a car for the customer immediately without calling other branches.", priority: "Must" },
                      { id: "US-002", pts: 8,  role: "Customer Service Agent", story: "I want the car to be automatically locked the moment I confirm a booking, so that no other agent can book the same car even if they are confirming at the exact same time.", priority: "Must" },
                      { id: "US-003", pts: 5,  role: "Customer",               story: "I want to receive an SMS immediately after my booking is confirmed, containing my booking ID and pickup details, so that I have proof of my booking and know exactly when and where to come.", priority: "Should" },
                    ],
                  },
                  {
                    epic: "Epic 2 — Fleet & Vehicle Status Management", color: "#10B981",
                    stories: [
                      { id: "US-010", pts: 8,  role: "Fleet Manager",          story: "I want to mark a car as 'In Service' directly in the system, so that it is immediately removed from available cars and agents cannot book it — without needing to call or WhatsApp anyone.", priority: "Must" },
                      { id: "US-011", pts: 5,  role: "Fleet Manager",          story: "I want to see the full service history of any car — all past service dates, mileage at service, and what work was done — so that I can plan upcoming maintenance before a car breaks down.", priority: "Could" },
                    ],
                  },
                  {
                    epic: "Epic 3 — Operations & Finance Dashboard", color: "#F59E0B",
                    stories: [
                      { id: "US-020", pts: 8,  role: "Operations Manager",     story: "I want a single screen showing me — right now — how many cars are available, booked, in service, and idle across all 3 branches, so that I can spot idle cars at one branch and redirect bookings there.", priority: "Must" },
                      { id: "US-021", pts: 5,  role: "Finance Manager",        story: "I want to automatically receive a monthly revenue report on the 1st of every month showing total bookings, revenue, and cancellations per branch, so that I do not have to compile it myself from 3 separate Excel files.", priority: "Should" },
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
                            <Bdg color={priority === "Must" ? "red" : priority === "Should" ? "yellow" : "orange"}>{priority}</Bdg>
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
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Acceptance Criteria — US-002 (Car Locking on Confirmation)</h3>
                <div className="space-y-2">
                  {[
                    { g: "Car XYZ is showing as available in the system for 14th July", w: "Agent 1 and Agent 2 both try to confirm a booking for Car XYZ for 14th July at the exact same time", t: "Only one booking goes through. The other agent sees an error message: 'This car was just booked. Please select another car.' Car XYZ is now locked and shows as Booked." },
                    { g: "A car has been marked as 'In Service' by the Fleet Manager", w: "Any agent searches for available cars for today's date", t: "The car marked 'In Service' does not appear in the search results at any branch. It is invisible to agents until Fleet Manager marks it as 'Available' again." },
                    { g: "An agent is halfway through a booking (car selected but not yet confirmed)", w: "Another agent at a different branch selects and confirms the same car first", t: "The first agent's screen shows: 'Car no longer available — it was just booked.' The first agent must go back and select a different car." },
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
              sub="BPMN diagrams visually show the step-by-step flow of each process — making it easy for developers, agents, and managers to all understand the same process in the same way.">
              <p className="text-[#9CA3AF] leading-relaxed">
                I created 3 BPMN diagrams: the New Booking Flow, the Vehicle Return Flow, and the Car
                Maintenance Update Flow. The maintenance flow was the most critical — it was the process
                that caused service cars to be booked by accident, and needed the clearest redesign.
              </p>
              <T hs={["Flow Name", "Start Event", "Key Decision Points", "End Event"]} rows={[
                ["New Booking Flow",         "Customer requests booking (phone/walk-in)", "Is customer returning? (Yes = auto-fill) → Is selected car still available? (checked again at confirmation) → Booking confirmed or select different car", "Car locked in system, SMS sent to customer, booking ID generated"],
                ["Vehicle Return Flow",       "Customer arrives to return car",           "Is car returned on time or delayed? → Does agent note any damage? → Is fuel level as agreed?", "Car marked 'Available' in system, digital return record saved with agent's notes and timestamp"],
                ["Car Maintenance Update Flow","Fleet Manager decides a car needs service","Fleet Manager marks car 'In Service' in system → System checks: are there any existing confirmed bookings for this car? → If yes, Branch Manager is alerted to contact those customers", "Car removed from availability pool; if future bookings exist, Branch Manager notified to arrange alternatives"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">Key Design Decisions Made During BPMN Design</h3>
                <div className="space-y-2">
                  {[
                    { decision: "Double-check availability at the moment of confirmation (not just at selection)", color: BLUE,     detail: "Even if a car shows as available when the agent selects it, the system checks one more time at the exact moment the agent clicks 'Confirm'. This handles the race condition — two agents selecting the same car at almost the same time. Only one can confirm it." },
                    { decision: "Alert before marking a car as 'In Service' if it has future bookings",           color: "#F59E0B", detail: "If the Fleet Manager marks a car as 'In Service' and there are future confirmed bookings for that car, the system alerts the Branch Manager: 'Car ABC has 2 upcoming bookings on 15th and 18th July — please arrange alternatives.' Prevents customers from being surprised at pickup." },
                    { decision: "Return process is digital with a timestamp and agent ID",                        color: "#10B981", detail: "When an agent processes a car return, the system records: which agent did it, at what time, fuel level entered, and any damage notes. This creates an audit trail that previously did not exist — critical for damage disputes." },
                    { decision: "No online booking in Phase 1",                                                  color: "#9CA3AF", detail: "The Operations Manager and I agreed to keep Phase 1 internal-only. Getting the internal booking process right is the prerequisite for exposing it to customers online. Online booking is in the Phase 2 backlog." },
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
              sub="Before any system is built, I mapped every piece of data the system needs to store, where it comes from, and how different pieces connect to each other.">
              <T hs={["Data Entity", "What It Stores", "Key Fields", "Connects To"]} rows={[
                ["Vehicle Master",    "Details of every car in the fleet",                                   "Vehicle ID, Registration Number, Car Type (Hatchback/SUV/Sedan), Make, Model, Year, Branch ID, Status (Available/Booked/In Service/Retired), Daily Rate (₹)", "Booking table, Maintenance table, Branch table"],
                ["Customer",          "Details of every customer who has ever booked",                       "Customer ID, Full Name, Phone Number, ID Proof Type, ID Proof Number, Email (optional), City",                                                                "Booking table"],
                ["Booking",           "Every booking ever made",                                             "Booking ID, Customer ID, Vehicle ID, Pickup Date, Return Date, Total Days, Total Amount (₹), Agent ID, Branch ID, Status (Confirmed/Active/Completed/Cancelled), Booking Timestamp", "Customer, Vehicle, Agent, Branch"],
                ["Branch",            "The 3 operating locations",                                           "Branch ID, City Name, Address, Phone Number, Branch Manager Name",                                                                                          "Vehicle, Booking, Agent"],
                ["Maintenance Log",   "Every service or repair event for every car",                        "Log ID, Vehicle ID, Start Date, Expected Return Date, Garage Name, Work Description, Cost (₹), Updated By (Fleet Manager ID)",                              "Vehicle Master"],
                ["Agent / User",      "All system users and their roles",                                   "Agent ID, Name, Branch ID, Role (Agent / Branch Manager / Fleet Manager / Finance / Operations / Admin), Login ID",                                         "Booking, Branch"],
              ]} />
              <CB lang="SQL" code={`-- Find all cars available for a given date range (no overlapping bookings, not in service)
-- This query is at the heart of the availability search screen
SELECT
  v.vehicle_id,
  v.registration_number,
  v.car_type,
  v.make,
  v.model,
  b.city_name    AS branch,
  v.daily_rate
FROM vehicles v
JOIN branches b ON v.branch_id = b.branch_id
WHERE v.status = 'Available'
  AND v.vehicle_id NOT IN (
    -- Exclude cars that have an overlapping confirmed or active booking
    SELECT vehicle_id
    FROM bookings
    WHERE status IN ('Confirmed', 'Active')
      AND pickup_date  < '2024-07-20'   -- requested return date
      AND return_date  > '2024-07-14'   -- requested pickup date
  )
ORDER BY b.city_name, v.car_type, v.daily_rate;`} />
              <CB lang="SQL" code={`-- Fleet utilization report: what % of each car's available days was it actually booked?
-- Used in the Operations Manager dashboard
SELECT
  v.vehicle_id,
  v.registration_number,
  v.car_type,
  br.city_name,
  COUNT(bk.booking_id)                        AS total_bookings,
  SUM(bk.total_days)                          AS total_rented_days,
  DATEDIFF(day, '2024-01-01', GETDATE())      AS total_possible_days,
  ROUND(
    100.0 * SUM(bk.total_days)
    / NULLIF(DATEDIFF(day, '2024-01-01', GETDATE()), 0),
    1
  )                                           AS utilization_pct
FROM vehicles v
JOIN branches br        ON v.branch_id = br.branch_id
LEFT JOIN bookings bk   ON v.vehicle_id = bk.vehicle_id
  AND bk.status IN ('Completed', 'Active')
  AND bk.pickup_date >= '2024-01-01'
GROUP BY v.vehicle_id, v.registration_number, v.car_type, br.city_name
ORDER BY utilization_pct DESC;`} />
            </S>

            {/* ── 13 ── */}
            <S id="wireframes" num="13" title="Wireframes & Prototypes"
              sub="Simple mockups of every screen reviewed with the actual users before a single line of code was written. This ensured the developer knew exactly what to build.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    view: "Screen 1", title: "Booking Search",
                    color: BLUE, icon: <Car size={15} />,
                    for: "Customer Service Agent",
                    headline: "Which cars are available for the dates the customer wants?",
                    shows: ["Date picker: pickup date + return date", "Car type filter (Any / Hatchback / Sedan / SUV)", "Results: list of available cars showing branch, type, rate", "One-click to start booking — customer details auto-filled if returning customer"],
                  },
                  {
                    view: "Screen 2", title: "Fleet Status Board",
                    color: "#10B981", icon: <Activity size={15} />,
                    for: "Fleet Manager",
                    headline: "What is the current status of every car right now?",
                    shows: ["All 85 cars listed with their current status (colour-coded)", "Available (green) / Booked (blue) / In Service (amber) / Retired (gray)", "One click to change status — with a mandatory reason note for In Service", "Filter by branch, car type, or status"],
                  },
                  {
                    view: "Screen 3", title: "Operations Dashboard",
                    color: "#F59E0B", icon: <Target size={15} />,
                    for: "Operations Manager",
                    headline: "How is the entire fleet performing across all 3 branches right now?",
                    shows: ["Live summary: total available / total booked / total in service (all branches)", "Branch-wise breakdown in 3 columns side-by-side", "Today's bookings count and this month's revenue", "Utilization % — which branch has the most idle cars"],
                  },
                  {
                    view: "Screen 4", title: "Booking Detail & Return",
                    color: "#A78BFA", icon: <FileText size={15} />,
                    for: "Customer Service Agent",
                    headline: "Full record of a specific booking — used at pickup and return",
                    shows: ["Booking ID, customer name, car details, dates, total amount", "Pickup confirmation: agent marks 'Car Given Out' with timestamp", "Return: agent enters fuel level, damage notes, uploads photos if needed", "Status automatically updates to 'Completed' and car becomes Available"],
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
                <strong>Key feedback from the Branch Manager during wireframe review:</strong> The first
                wireframe design for the booking search screen showed all 85 cars in one long list. The
                Branch Manager said immediately: &ldquo;I will never scroll through 85 cars during a live
                customer call. I need the filter to be at the top and only show me cars at my branch by
                default.&rdquo; This was changed in Round 2 to default to the agent&apos;s own branch —
                with an option to expand to all branches if needed.
              </IB>
            </S>

            {/* ── 14 ── */}
            <S id="req-validation" num="14" title="Requirement Validation"
              sub="Every requirement formally reviewed and approved before development starts — so there are no surprises during the build.">
              <T hs={["Validation Step", "When", "Who", "What Was Reviewed", "Result"]} rows={[
                ["BRD Review Meeting",        "End of Week 3", "Operations Manager + Finance Manager",   "All 8 business requirements confirmed; acceptance criteria reviewed",             "Approved — BR-008 (online booking) moved to Phase 2"],
                ["Stakeholder Walkthrough",   "Week 4",        "All 6 stakeholders",                    "Full requirements summary; each person confirmed their use case was covered",   "Approved — Fleet Manager added one new request: alert when service car has upcoming bookings"],
                ["FRS Technical Review",      "Week 5",        "IT Manager + Operations Manager",       "All 9 functional requirements reviewed for technical feasibility and effort",    "FR-009 (booking history per car) moved to Phase 2 — complexity was too high for current timeline"],
                ["Wireframe Review Round 1",  "Week 6",        "Branch Managers + Customer Service Agent","All 4 screens walked through; feedback collected",                              "5 change requests — default to own branch, simplify date picker, add car photo on booking screen"],
                ["Wireframe Review Round 2",  "Week 7",        "Operations Manager + Branch Manager",   "Updated wireframes reviewed after Round 1 changes",                             "Approved. IT Manager given green light to begin development."],
              ]} />
              <IB t="s">
                All validations completed before any code was written. The IT Manager later confirmed that
                having clear wireframes and signed-off requirements meant development was faster than any
                previous project — no ambiguity, no mid-build rework requests.
              </IB>
            </S>

            {/* ── 15 ── */}
            <S id="backlog" num="15" title="Backlog Creation & Prioritization"
              sub="The full list of everything to be built, sorted by what is most critical to deliver first — using MoSCoW prioritization.">
              <T hs={["Priority", "Stories", "What Gets Built", "Sprint"]} rows={[
                [<Bdg color="red">Must Have</Bdg>,    "10 stories — 61 pts", "Vehicle database, customer database, real-time availability search, car locking on confirmation, Fleet Manager status update, fleet status board, basic booking creation and confirmation",   "Sprint 1 & 2"],
                [<Bdg color="yellow">Should Have</Bdg>,"6 stories — 31 pts",  "SMS confirmation, automated monthly finance report, car return process with damage notes, Operations Manager dashboard, agent login and role-based access",                                  "Sprint 3"],
                [<Bdg color="orange">Could Have</Bdg>, "4 stories — 18 pts",  "Fleet utilization chart on Operations dashboard, car photo on booking screen, maintenance alert for upcoming bookings when car marked 'In Service'",                                         "Sprint 4"],
                [<Bdg color="gray">Won&apos;t Have</Bdg>,"3 stories — —",     "Online customer booking portal, payment gateway integration, WhatsApp booking bot (Phase 2 backlog)",                                                                                       "Phase 2"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-4 uppercase tracking-wider">Sprint Plan — 4 Sprints of 2 Weeks Each (10 Weeks Total)</h3>
                <div className="space-y-2">
                  {[
                    { sprint: "Sprint 1", wks: "Wk 1–2",  color: BLUE,     focus: "Database setup: vehicles, customers, bookings, branches, agents. Basic login and role access. Car availability search with real-time results across all branches." },
                    { sprint: "Sprint 2", wks: "Wk 3–4",  color: "#7B72E1",focus: "Booking confirmation with car locking mechanism. Fleet Manager status update screen (Available / In Service). Car return flow with damage notes. Core system usable end-to-end." },
                    { sprint: "Sprint 3", wks: "Wk 5–6",  color: "#A78BFA",focus: "Operations Manager dashboard (live fleet summary all 3 branches). SMS confirmation integration. Automated monthly finance report. Role-based access polished per user type." },
                    { sprint: "Sprint 4", wks: "Wk 7–8",  color: "#10B981",focus: "Fleet utilization chart. Maintenance alert for upcoming bookings. UAT defect fixes. Performance testing. Go-live preparation and user training." },
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
              sub="Running 2-week sprints — building and testing a working piece of the system every sprint, rather than trying to build everything at once.">
              <T hs={["Agile Ceremony", "How Often", "What I Did as BA"]} rows={[
                ["Sprint Planning",     "Start of each sprint (Monday)",   "Walked the IT Manager through the top-priority user stories for the next 2 weeks; clarified every acceptance criteria before any coding started; confirmed what 'done' means for each story"],
                ["Daily Stand-Up",      "Every day — 10 minutes",          "Flagged any open questions coming from development; answered ambiguity on the spot; raised blockers to the Operations Manager if needed (e.g., IT Manager needed access to SMS gateway account)"],
                ["Sprint Review",       "End of each sprint (Friday)",     "Demonstrated the completed features to Branch Managers and Operations Manager using real test data; captured feedback; added new items to backlog if needed"],
                ["Sprint Retrospective","End of each sprint (Friday)",     "Team discussion: what went well, what was slow, what to change next sprint — kept these short (20 min) but consistently applied"],
                ["Backlog Refinement",  "Mid-sprint (Wednesday, biweekly)","Reviewed upcoming stories with IT Manager; broke large stories into smaller tasks; flagged technical risks before they became sprint blockers"],
              ]} />
              <IB t="w">
                <strong>Mid-Sprint 2 issue:</strong> During development of the car locking mechanism, the
                IT Manager raised a concern — the locking approach we had agreed on (locking at the moment
                of confirmation) would still leave a small window where two agents could both see
                &quot;Available&quot; and both click Confirm at the same time. We called an emergency
                30-minute session with the Operations Manager to discuss options. The decision was to add
                an optimistic lock check at the database level — a second check at the exact millisecond
                of the database write, not just the UI. This was a technical detail, but I documented it
                in the requirements so it was formally recorded and testable in UAT.
              </IB>
            </S>

            {/* ── 17 ── */}
            <S id="dev-support" num="17" title="Development Support"
              sub="The BA's role during development — handling requirement questions, managing mid-build changes, and preventing scope creep from derailing the timeline.">
              <T hs={["Situation", "What Happened", "What I Did as BA", "Outcome"]} rows={[
                ["Requirement ambiguity",     "IT Manager asked: when a car is returned, should its status change to 'Available' immediately or only after the agent inspects it?",                            "Raised with Branch Manager and Fleet Manager — both said inspection happens immediately at return. Status should update to Available only after agent clicks 'Inspection Done'. Documented this in the FRS.", "Developer built the correct flow; no rework needed"],
                ["Stakeholder change request", "Operations Manager asked mid-Sprint 3 to add a 'Download as PDF' button to the monthly finance report",                                                       "Assessed impact: 1 additional day of work. Agreed with Operations Manager to add to Sprint 4. Finance Manager confirmed email format was fine for now.", "Sprint 3 not disrupted; PDF added in Sprint 4"],
                ["Data migration question",   "All 3 branches had active bookings in Excel that needed to be in the new system from Day 1 — or agents would have to check two systems for the first few days", "Worked with each Branch Manager to extract all active bookings into a template. IT Manager imported them into the database in a 2-hour migration session before go-live.", "New system had all active bookings on Day 1; agents never needed to use old Excel in parallel"],
                ["SMS gateway setup",         "The company had no SMS service account — required to send booking confirmations",                                                                               "Raised with Operations Manager in Week 3 when I identified this gap in the technical review. Operations Manager signed up for an SMS gateway (Textlocal) within 2 days. Did not become a blocker.", "SMS feature was ready on time for Sprint 3"],
              ]} />
            </S>

            {/* ── 18 ── */}
            <S id="testing-support" num="18" title="Testing Support"
              sub="Designing the test plan and helping the team catch bugs before UAT — because finding a problem before users test it is much cheaper than finding it during UAT.">
              <T hs={["What I Did", "Details"]} rows={[
                ["Wrote the UAT Test Plan",        "Created a document with 40 test cases, expected result for each, who would run it, and the pass/fail criteria — before testing started. Shared with IT Manager and Branch Managers 1 week before UAT."],
                ["Tested the locking mechanism specifically", "Opened two separate browser windows logged in as two different agents. Both searched for the same car on the same date. Timed clicking 'Confirm' at almost exactly the same time 20 times. Car was successfully locked to the first confirmation in all 20 tries."],
                ["Designed edge case tests",       "Added tests for: What if both pickup and return date are the same day? What if the Fleet Manager marks a car 'In Service' while an agent is mid-booking? What if an agent logs in from Branch A but tries to book a car at Branch B?"],
                ["Classified defects during triage","Attended daily triage sessions with IT Manager during test week. For each defect found: is it a requirements issue (my responsibility), a build issue (IT Manager's responsibility), or a data issue (migration)?"],
              ]} />
              <IB t="w">
                During internal testing, I found that the Operations Manager dashboard was not updating
                in real time — it was refreshing every 30 minutes, not every 15 minutes as agreed in NFR-
                005. The IT Manager had set a 30-minute cache for performance reasons. After discussion, we
                agreed 15 minutes was acceptable — the Operations Manager confirmed they would never need
                second-by-second updates. Updated the NFR from &quot;within 15 minutes&quot; to &quot;within
                30 minutes&quot; before UAT, so it would pass correctly.
              </IB>
            </S>

            {/* ── 19 ── */}
            <S id="uat" num="19" title="User Acceptance Testing (UAT)"
              sub="Real users testing the system using realistic scenarios — confirming it does exactly what was agreed in the BRD before go-live approval is given.">
              <T hs={["What Was Tested", "Test Cases", "Tested By", "Passed", "Failed", "Status"]} rows={[
                ["Booking creation and real-time availability",         "10", "Branch Manager + Customer Service Agent (×2)", "9",  "1", <Bdg color="yellow">1 Fixed</Bdg>],
                ["Car locking — no double bookings possible",           "6",  "IT Manager + Branch Manager",                  "6",  "0", <Bdg color="green">All Pass</Bdg>],
                ["Fleet Manager status update (In Service / Available)","6",  "Fleet Manager",                                "5",  "1", <Bdg color="yellow">1 Fixed</Bdg>],
                ["Operations Manager dashboard — all branches",         "8",  "Operations Manager",                           "8",  "0", <Bdg color="green">All Pass</Bdg>],
                ["SMS confirmation — customer receives within 2 min",  "5",  "Customer Service Agent",                       "5",  "0", <Bdg color="green">All Pass</Bdg>],
                ["Car return flow with damage notes",                   "5",  "Customer Service Agent + Branch Manager",      "4",  "1", <Bdg color="yellow">1 Fixed</Bdg>],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">Defects Found in UAT & How They Were Fixed</h3>
                <div className="space-y-2">
                  {[
                    { id: "DEF-001", sev: "High",   what: "When a Customer Service Agent searched for cars at Branch A, the results also showed cars that were currently In Service (marked by Fleet Manager). Root cause: the availability query was not filtering by vehicle status — only checking for booking conflicts but not the status field. Fixed by IT Manager in 3 hours. Re-tested and confirmed." },
                    { id: "DEF-002", sev: "Medium", what: "When Fleet Manager marked a car 'In Service' and that car had a booking starting in 2 days, the Branch Manager did not receive the alert. Root cause: the alert trigger was checking for bookings starting 'today' only — not future dates. Fixed to check all future confirmed bookings for that car." },
                    { id: "DEF-003", sev: "Low",    what: "On the car return screen, the damage notes text box only allowed 100 characters — agents needed more space to describe damage in detail. Changed to 500 characters with a character counter." },
                  ].map(({ id, sev, what }) => (
                    <div key={id} className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Bdg color="gray">{id}</Bdg>
                        <Bdg color={sev === "High" ? "red" : sev === "Medium" ? "yellow" : "orange"}>{sev} Severity</Bdg>
                      </div>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{what}</p>
                    </div>
                  ))}
                </div>
              </Glass>
              <IB t="s">
                All 3 defects were fixed, re-tested, and confirmed within 3 working days. All stakeholders
                gave formal sign-off at the end of UAT. The Operations Manager specifically confirmed that
                the live cross-branch dashboard &ldquo;showed them what they had been asking for for 2
                years.&rdquo;
              </IB>
            </S>

            {/* ── 20 ── */}
            <S id="go-live" num="20" title="Deployment / Go-Live"
              sub="A phased rollout — starting with one branch first to catch any real-world issues before all 3 branches go live on the same day.">
              <T hs={["Day", "What Happened", "Who Was Responsible"]} rows={[
                ["Day –2",   "Data migration: all active bookings from all 3 branch Excel files imported into the new system database",                                                "IT Manager + BA"],
                ["Day –1",   "Final system check: all 85 vehicles loaded into the database with correct status; all agent logins tested and confirmed working",                      "IT Manager + BA"],
                ["Day 1 AM", "Branch A (busiest branch) goes live. Excel officially archived. Agents use the new system for all bookings from this point forward.",                  "Branch Manager A"],
                ["Day 1 PM", "BA present at Branch A from 10am to 6pm — available for any questions, taking notes on any usability issues observed in real use",                    "BA"],
                ["Day 2 AM", "After 1 day of smooth operation at Branch A, Branches B and C go live simultaneously",                                                                "IT Manager + Branch Managers B and C"],
                ["Day 3",    "First real cross-branch booking tested: customer at Branch B needed a car; Branch B had none; agent found and booked a car at Branch A in 3 minutes without calling", "Customer Service Agent"],
                ["Week 2",   "Hypercare period: IT Manager and BA both available daily for quick response to any system issue. Two minor display issues reported and fixed within 24 hours each.", "IT Manager + BA"],
                ["Day 32",   "First automated monthly finance report generated and emailed to Finance Manager on the 1st of the month — no manual action",                           "System (automatic)"],
              ]} />
              <IB t="s">
                Starting with Branch A only on Day 1 was the right call. On Day 1 afternoon, one agent
                at Branch A accidentally marked a car as &quot;In Service&quot; instead of
                &quot;Available&quot; after it was returned. This was caught and corrected quickly because
                only 1 branch was live. If all 3 had gone live at the same time, the same mistake could
                have happened at all 3 branches before anyone noticed.
              </IB>
            </S>

            {/* ── 21 ── */}
            <S id="training" num="21" title="Training & Change Management"
              sub="The booking system is only useful if the agents actually use it. Training focused on making each person confident in exactly the screens they use — nothing more.">
              <T hs={["Who Was Trained", "Format", "Duration", "What Was Covered"]} rows={[
                ["Customer Service Agents (×6)", "Hands-on session at the branch counter using the live system",         "45 min each", "Booking search, creating a new booking, looking up a returning customer, confirming a booking, processing a return with damage notes"],
                ["Branch Managers (×3)",         "1-on-1 session with each Branch Manager at their own branch",         "30 min each", "All the above + branch-level performance view, how to check booking history for a specific car, how to handle a booking if a car becomes unexpectedly unavailable"],
                ["Fleet Manager",                "1-on-1 session",                                                       "30 min",      "How to mark a car In Service and Available, the maintenance alert system, how to view and update the maintenance log"],
                ["Operations Manager",           "1-on-1 session at head office",                                        "30 min",      "Operations dashboard — how to read it, which numbers to track daily, how to use fleet utilization data to redirect bookings from idle branches"],
                ["Finance Manager",              "15-minute walkthrough",                                                "15 min",      "How to download the auto-generated monthly report; how to filter by branch; what each column means"],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">Change Management Actions</h3>
                <div className="space-y-2">
                  {[
                    { action: "Excel archived on Day 1 — not kept as backup",     detail: "Deliberately archiving the old Excel files on the day of go-live removed the option to fall back to the old system. Agents who were unsure of the new system had no choice but to ask for help and learn it — which they did quickly. The Branch Managers championed this decision." },
                    { action: "Branch Manager trained first, trained their own team", detail: "Each Branch Manager was trained 2 days before their branch went live. They then ran a 20-minute demo for their own agents. Having their own manager explain the system was more trusted than an outside trainer." },
                    { action: "1-page quick reference card printed at each counter", detail: "A laminated A5 card with 4 steps: How to search for a car, How to confirm a booking, How to process a return, Who to call if something goes wrong. Still hanging at the counter 2 months later." },
                    { action: "BA available at Branch A for the full first day",     detail: "Physical presence on go-live day removed agent anxiety. The agents knew someone was there to help immediately if anything went wrong. No issues required escalation — but the presence itself made adoption much smoother." },
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
              sub="Reviewed 4 weeks after go-live — did the system deliver what was promised? What worked, what didn't, what to improve?">
              <T hs={["Finding", "Type", "Detail"]} rows={[
                ["Double bookings: 23/month → 0 in 4 weeks post go-live",                  <Bdg color="green">Positive</Bdg>,      "The car locking mechanism completely eliminated double bookings. Not a single incident in 4 weeks of full operation across all 3 branches."],
                ["Customer check-in time reduced from 22 minutes to under 6 minutes",      <Bdg color="green">Positive</Bdg>,      "Returning customers auto-filled from the database. New customers entered once. Agents confirmed the new check-in was dramatically faster and less stressful."],
                ["Operations Manager now checks dashboard every morning instead of calling branches", <Bdg color="green">Positive</Bdg>, "Operations Manager confirmed they no longer make the daily branch call. 'I open the dashboard and I can see everything in 2 minutes.'"],
                ["Fleet utilization improved from 58% to 72% in first month",              <Bdg color="green">Positive</Bdg>,      "Agents now see idle cars at other branches and redirect customers there instead of turning them away. Still growing as agents get more comfortable using the cross-branch view."],
                ["One agent at Branch C still calling other branches sometimes",            <Bdg color="yellow">Improvement</Bdg>,  "One agent had formed the habit strongly over 4 years. Their Branch Manager is doing additional 1-on-1 coaching. Will monitor in the next review."],
                ["SMS delivery occasional delay on weekends — 5–8 minutes instead of 2",   <Bdg color="yellow">Learning</Bdg>,     "SMS gateway has lower throughput on weekends. Raised with the SMS provider. They confirmed it is a plan limitation — Operations Manager considering upgrading the SMS plan."],
              ]} />
              <Glass>
                <h3 className="text-[#F9FAFB] text-sm font-semibold mb-3 uppercase tracking-wider">3 Key Lessons from This Project</h3>
                <div className="space-y-3">
                  {[
                    { lesson: "The right tool solves the problem; process improvements alone cannot",    detail: "No amount of agent training or new Excel guidelines could have prevented double bookings — because the problem was structural. Excel simply cannot lock a record for concurrent users. Recognising that the solution needed to be a technology change (not a process change) was the most important early decision." },
                    { lesson: "Phased rollout is worth the extra day",                                   detail: "Starting with Branch A on Day 1 instead of all 3 simultaneously caught a real issue (agent incorrectly marking a returned car as In Service) while it only affected one branch. Small risk window = faster fix, lower impact. Always worth the extra day." },
                    { lesson: "Migrate live data before go-live day — never run two systems in parallel", detail: "Importing all active bookings from Excel before go-live meant agents used only one system from Day 1. Projects that keep the old system running 'just in case' create confusion, split attention, and typically take twice as long to fully adopt the new system." },
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
              sub="Measured at 8 weeks post go-live — comparing actual results against what was promised in the BRD.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MC v="0"     label="Double bookings"              c="#10B981" note="Was 23/month before go-live" />
                <MC v="78%"   label="Fleet utilization"            c={BLUE}    note="Was 58% — +20 pts in 8 weeks" />
                <MC v="−67%"  label="Customer complaints"          c="#A78BFA" note="vs. same period last year" />
                <MC v="6min"  label="Customer check-in time"       c="#F59E0B" note="Was 22 min — 73% faster" />
              </div>
              <T hs={["What Was Promised in BRD", "Target", "Actual Result (8 Weeks)", "Status"]} rows={[
                ["Real-time car availability across all 3 branches in one screen",                 "Single screen, all branches, live data",     "Working; agents at all 3 branches using it daily",                   <Bdg color="green">Done</Bdg>],
                ["Car locked immediately on booking confirmation — no double bookings",             "Zero double bookings in 4 weeks of testing", "Zero double bookings in 8 weeks of live operation",                  <Bdg color="green">Done</Bdg>],
                ["Fleet Manager marks car 'In Service' directly — immediately visible to all",     "Status change visible in under 1 minute",    "Status change visible in under 5 seconds in all tests",              <Bdg color="green">Done</Bdg>],
                ["Returning customer check-in: auto-fill from database",                           "Check-in under 5 minutes for returning customers", "Average 4.2 minutes for returning customers",                   <Bdg color="green">Done</Bdg>],
                ["Operations dashboard: all 3 branches live, updated within 30 minutes",          "Dashboard live, refreshes every 30 min",     "Dashboard running; Operations Manager checks it every morning",      <Bdg color="green">Done</Bdg>],
                ["SMS confirmation to customer within 2 minutes of booking",                       "SMS delivered within 2 minutes",            "Weekdays: avg 80 seconds. Weekends: avg 6 minutes (gateway limit)", <Bdg color="yellow">Partial</Bdg>],
                ["Automated monthly finance report — no manual compilation",                       "Report auto-generated on 1st of month",      "Finance Manager received report automatically for 2 months running", <Bdg color="green">Done</Bdg>],
              ]} />
              <Glass>
                <p className="text-[#D1D5DB] text-sm italic leading-relaxed border-l-2 pl-4" style={{ borderColor: "#10B981" }}>
                  &ldquo;Before this system, I would start each day calling all 3 branches to find out
                  what cars we had available. Now I open one screen. It shows me everything — which branch
                  has idle cars, how many bookings came in yesterday, what the revenue looks like. I make
                  better decisions in the morning than I used to make all day.&rdquo;
                </p>
                <p className="text-[#6B7280] text-xs mt-3">— Operations Manager · 8 weeks post go-live</p>
              </Glass>
              <IB t="s">
                <strong>The most valuable outcome:</strong> Fleet utilization going from 58% to 78% in 8
                weeks. This is not a small number — with 85 cars, a 20-point improvement in utilization
                means roughly 17 additional cars rented per day on average. At an average daily rate of
                ₹1,800, that is approximately <strong className="text-[#10B981]">₹30,600 additional
                revenue per day</strong> — from no new cars, no new marketing, just better visibility of
                what the company already had. This is the direct financial impact of a well-implemented
                information system.
              </IB>
            </S>

          </main>
        </div>
      </div>
    </div>
  );
}
