import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-business-analysis",
    title: "What Is Business Analysis? A Practitioner's Perspective",
    excerpt:
      "Business Analysis is more than gathering requirements — it's about understanding the gap between where a business is and where it needs to be.",
    category: "Business Analysis",
    date: "2024-12-01",
    readTime: "5 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        content:
          "Most people, when they hear 'Business Analyst', picture someone in a meeting room transcribing what stakeholders say into a requirements document. That's a narrow — and ultimately misleading — view of the role. The real work of a BA is far more strategic, and far more interesting.",
      },
      {
        type: "heading",
        content: "The Gap No One Talks About",
      },
      {
        type: "paragraph",
        content:
          "Every organisation has a gap. On one side sits the current state — the messy, inefficient, sometimes broken reality of how things actually work. On the other side sits the desired state — the goal, the vision, the outcome leadership is trying to reach. Business Analysis lives entirely in that gap.",
      },
      {
        type: "paragraph",
        content:
          "A BA's core job is to map that gap precisely: understand what's causing it, identify what's needed to close it, and translate that understanding into something delivery teams can actually act on. The requirement document is a by-product of that thinking — not the thinking itself.",
      },
      {
        type: "quote",
        content:
          "A good Business Analyst doesn't just document what stakeholders ask for. They find the business problem behind the business problem.",
      },
      {
        type: "heading",
        content: "What Business Analysts Actually Do",
      },
      {
        type: "paragraph",
        content:
          "The day-to-day work of a BA spans a wide range of activities, but they all orbit a central question: 'What does this organisation actually need, and how do we make sure what gets built actually delivers it?' That manifests in several core disciplines:",
      },
      {
        type: "list",
        items: [
          "Stakeholder discovery — identifying who has a stake in the outcome, what they need, and where their views conflict",
          "Root cause analysis — diagnosing why a problem exists, not just accepting the surface-level description of it",
          "Requirements elicitation — structured conversations, workshops, and analysis to surface what's truly needed",
          "Process mapping — documenting how things work today and designing how they should work tomorrow",
          "Data analysis — using quantitative evidence to validate problems, size opportunities, and track outcomes",
          "Solution validation — ensuring what gets built actually matches what was needed",
        ],
      },
      {
        type: "heading",
        content: "The BA Process: Four Stages",
      },
      {
        type: "paragraph",
        content:
          "While every engagement is different, the analytical process a good BA follows is consistent. It moves through four stages, each building on the last:",
      },
      {
        type: "subheading",
        content: "Stage 1 — Understand",
      },
      {
        type: "paragraph",
        content:
          "Before analysing anything, you need context. This means deep-diving into the business environment: talking to stakeholders, reviewing existing documentation, observing processes in action, and building a clear picture of the landscape. The quality of everything that follows depends on the quality of this stage.",
      },
      {
        type: "subheading",
        content: "Stage 2 — Analyse",
      },
      {
        type: "paragraph",
        content:
          "With context established, you apply structured analytical techniques — gap analysis, root cause analysis, data modelling, process benchmarking — to surface insights. This is where you move from description to diagnosis.",
      },
      {
        type: "subheading",
        content: "Stage 3 — Translate",
      },
      {
        type: "paragraph",
        content:
          "Insights on their own don't drive change. This stage converts analysis into deliverables: business requirements documents, user stories, process flows, use cases, and acceptance criteria. The key skill here is precision — ambiguous requirements are a primary driver of failed projects.",
      },
      {
        type: "subheading",
        content: "Stage 4 — Deliver",
      },
      {
        type: "paragraph",
        content:
          "The BA's involvement doesn't end at sign-off. Delivery requires continuous validation: ensuring built solutions match requirements, managing scope changes, and confirming that outcomes align with original business objectives.",
      },
      {
        type: "callout",
        content:
          "The most expensive mistake in software development isn't poor engineering — it's building the wrong thing. Business Analysis is the discipline that prevents that from happening.",
      },
      {
        type: "heading",
        content: "Why Root Cause Matters More Than Requirements",
      },
      {
        type: "paragraph",
        content:
          "Here's a scenario that plays out constantly in organisations: a stakeholder comes to a BA and says, 'We need a new reporting dashboard.' A transactional BA documents that request and begins writing requirements for a dashboard. A good BA asks: 'Why do you need a dashboard? What decision are you currently unable to make? What data do you have access to today, and what's missing?'",
      },
      {
        type: "paragraph",
        content:
          "More often than not, the real problem isn't a missing dashboard — it's a data quality issue, a process gap, or a communication breakdown between teams. Building a dashboard won't fix any of those. Only by tracing the symptom back to its root cause can a BA recommend a solution that actually resolves the problem.",
      },
      {
        type: "heading",
        content: "The Modern BA Toolkit",
      },
      {
        type: "paragraph",
        content:
          "Business Analysis has evolved significantly. The modern BA is expected to be comfortable with a broader set of tools than their predecessors:",
      },
      {
        type: "list",
        items: [
          "Data tools — Python, SQL, and Excel for quantitative analysis and modelling",
          "Visualisation — Power BI, Tableau, or even Matplotlib for communicating insights clearly",
          "Documentation — Confluence, Notion, or Google Docs for BRDs, user stories, and process maps",
          "Collaboration — Jira, Azure DevOps for working within agile delivery teams",
          "AI tools — using large language models to accelerate research, pressure-test assumptions, and generate first drafts",
        ],
      },
      {
        type: "paragraph",
        content:
          "None of these tools replace the core analytical thinking. But a BA who is fluent in them can work faster, produce better evidence, and communicate more effectively than one who isn't.",
      },
      {
        type: "heading",
        content: "What Makes a Great Business Analyst",
      },
      {
        type: "paragraph",
        content:
          "After working across multiple engagements, the pattern is clear. The BAs who consistently deliver the most value share a few traits that have nothing to do with certification or seniority:",
      },
      {
        type: "list",
        items: [
          "Intellectual curiosity — a genuine drive to understand how things work and why they break",
          "Structured thinking — the ability to decompose complex problems into logical components",
          "Communication precision — writing and speaking in a way that leaves no room for misinterpretation",
          "Stakeholder empathy — the ability to hold multiple perspectives simultaneously and find common ground",
          "Comfortable with ambiguity — the ability to make progress when the problem isn't fully defined yet",
        ],
      },
      {
        type: "paragraph",
        content:
          "Business Analysis isn't a support function. It's the connective tissue between what an organisation wants to achieve and what actually gets built. Done well, it's one of the highest-leverage roles in any product or delivery team.",
      },
    ],
  },
  {
    slug: "why-every-business-analyst-should-learn-python",
    title: "Why Every Business Analyst Should Learn Python",
    excerpt:
      "Python bridges the gap between business thinking and data reality. Here's how I use it daily to move from gut-feel to evidence-based decisions.",
    category: "Data Analytics",
    date: "2025-01-15",
    readTime: "7 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        content:
          "When I tell other Business Analysts that I use Python daily, the reaction is usually one of two things: mild panic, or polite scepticism. 'I'm a BA, not a developer.' 'I don't need to code.' 'That's what the data team is for.' I understand the hesitation — I had the same ones. But after building Python into my workflow, the difference in what I can do and how fast I can do it is significant enough that I think every BA should at least seriously consider it.",
      },
      {
        type: "heading",
        content: "The Excel Ceiling",
      },
      {
        type: "paragraph",
        content:
          "Excel is a powerful tool, and for many analytical tasks it's perfectly appropriate. But it has a ceiling. That ceiling becomes very visible the moment you're working with a dataset that has more than a few thousand rows, when you need to run the same analysis every week without redoing it manually, or when the insights you're looking for require something beyond pivot tables and VLOOKUPs.",
      },
      {
        type: "paragraph",
        content:
          "Python removes that ceiling. The same analysis that breaks Excel — or takes an hour to set up — takes minutes in Python. More importantly, it's reproducible. You write it once, and you run it again tomorrow, next week, or on a different dataset with no additional effort.",
      },
      {
        type: "callout",
        content:
          "You don't need to be a software engineer to use Python effectively as a BA. You need just enough to automate your analysis, manipulate data, and communicate findings clearly.",
      },
      {
        type: "heading",
        content: "What Python Actually Gives You",
      },
      {
        type: "paragraph",
        content:
          "There are four things Python gives a Business Analyst that nothing else does as well:",
      },
      {
        type: "subheading",
        content: "1. Data manipulation at scale",
      },
      {
        type: "paragraph",
        content:
          "With Pandas, you can load, clean, filter, merge, and aggregate datasets of any size in seconds. Tasks that would take hours in Excel — deduplicating records, joining tables, recoding variables, handling missing values — become five-line scripts. This frees your time for the actual analysis, not the preparation.",
      },
      {
        type: "subheading",
        content: "2. Reproducible analysis",
      },
      {
        type: "paragraph",
        content:
          "When a stakeholder asks 'can you run this again with last month's data?', the answer with Python is: yes, immediately. The analysis lives in a script. You change the input file, run it, done. With Excel, you're often rebuilding from scratch. Reproducibility also means you can audit your own work — every step is documented in code.",
      },
      {
        type: "subheading",
        content: "3. Visualisation that communicates clearly",
      },
      {
        type: "paragraph",
        content:
          "Matplotlib and Seaborn let you build charts that are specifically designed for the insight you're trying to communicate — not the default bar chart Excel generates. Heat maps, distribution plots, correlation matrices, trend lines with confidence intervals — all of these are straightforward in Python and help stakeholders actually understand your findings.",
      },
      {
        type: "subheading",
        content: "4. Predictive and statistical analysis",
      },
      {
        type: "paragraph",
        content:
          "Scikit-learn gives you access to machine learning models that most BAs would otherwise have to request from a data science team. Forecasting demand, predicting churn, scoring leads — these are now tools you can apply directly, quickly, and explain to non-technical stakeholders.",
      },
      {
        type: "heading",
        content: "Real Use Cases from My Own Work",
      },
      {
        type: "paragraph",
        content:
          "These aren't theoretical. Here are four tasks I've done with Python that would have been significantly harder or impossible without it:",
      },
      {
        type: "list",
        items: [
          "Cleaning and analysing a 50,000-row customer feedback dataset to identify top complaint themes by region — done in under an hour",
          "Building a weekly KPI report that auto-generates from a SQL export, formats the output, and produces charts ready for the leadership deck",
          "Running a regression model to identify which process variables predicted project delivery delays — giving the operations team an early-warning signal they didn't previously have",
          "Comparing two datasets from different systems to identify data quality gaps before a CRM migration — a task that would have taken days in Excel",
        ],
      },
      {
        type: "heading",
        content: "You Don't Need to Be a Developer",
      },
      {
        type: "paragraph",
        content:
          "This is the part most hesitant BAs need to hear. The Python you need as a Business Analyst is not the same Python a backend engineer uses. You don't need to understand decorators, async programming, or design patterns. You need:",
      },
      {
        type: "list",
        items: [
          "Basic data types and control flow (lists, dictionaries, loops, conditionals)",
          "Pandas for loading and manipulating data",
          "Matplotlib or Seaborn for visualisation",
          "Jupyter Notebooks for exploratory analysis (your new best friend)",
          "Enough SQL knowledge to know when to query data at source rather than load it all into Python",
        ],
      },
      {
        type: "paragraph",
        content:
          "That's roughly a month of deliberate practice. After that, the skills compound quickly. And with AI tools (Copilot, ChatGPT) able to write first drafts of Python code from a natural language description, the barrier has dropped further still.",
      },
      {
        type: "quote",
        content:
          "The BA who can write Python isn't a developer. They're an analyst with a much longer reach.",
      },
      {
        type: "heading",
        content: "Python vs The Alternatives",
      },
      {
        type: "paragraph",
        content:
          "The two main alternatives BAs consider are R and SQL. Both are valuable, but Python sits in the most useful position:",
      },
      {
        type: "list",
        items: [
          "SQL is essential for querying databases, and every BA should know it — but it's limited to data extraction and transformation, not full analytical workflows",
          "R is excellent for statistical analysis but has a steeper learning curve and a smaller community outside of academic and data science contexts",
          "Python does everything both do, integrates with more systems, and is the primary language of the AI/ML ecosystem — making it the highest-leverage investment of the three",
        ],
      },
      {
        type: "heading",
        content: "Where to Start",
      },
      {
        type: "paragraph",
        content:
          "The most effective starting point I've found is learning by doing rather than learning by course. Pick a dataset from your current work — a report you run regularly, a piece of analysis you keep redoing in Excel — and attempt to replicate it in Python. The friction of that first real task will teach you more than any tutorial.",
      },
      {
        type: "paragraph",
        content:
          "Start with Jupyter Notebooks (they're visual, interactive, and forgiving), use the Pandas documentation liberally, and lean on AI tools to get past syntax blocks. The goal in the first month isn't to write elegant code — it's to build something useful.",
      },
      {
        type: "callout",
        content:
          "The best time to learn Python was when you first became a BA. The second-best time is now.",
      },
    ],
  },
  {
    slug: "the-complete-guide-to-requirements-gathering",
    title: "The Complete Guide to Requirements Gathering",
    excerpt:
      "Poorly gathered requirements are the #1 cause of project failure. Here's the framework I use to ensure nothing critical gets missed.",
    category: "Requirements",
    date: "2025-03-10",
    readTime: "8 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        content:
          "The CHAOS Report has consistently identified poor requirements as the leading cause of project failure — across industries, methodologies, and company sizes. Not poor engineering. Not budget overruns. Not scope creep. Poor requirements. If you want to understand why most software projects fail to deliver their intended value, this is where to look.",
      },
      {
        type: "paragraph",
        content:
          "Requirements gathering is the most critical skill a Business Analyst owns. It's also the most consistently underestimated. Here's the framework I've developed through real engagements to ensure nothing critical gets missed.",
      },
      {
        type: "heading",
        content: "Understanding the Types of Requirements",
      },
      {
        type: "paragraph",
        content:
          "Before gathering anything, you need clarity on what you're gathering. Requirements fall into three categories, each serving a different function in defining what needs to be built:",
      },
      {
        type: "subheading",
        content: "Business Requirements",
      },
      {
        type: "paragraph",
        content:
          "These define the 'why' — the organisational goal the solution needs to achieve. 'Reduce customer churn by 15% within 12 months.' 'Eliminate manual data entry from the invoicing process.' Business requirements anchor everything else. When scope debates arise later, you return to these to resolve them.",
      },
      {
        type: "subheading",
        content: "Functional Requirements",
      },
      {
        type: "paragraph",
        content:
          "These define what the system must do — the specific behaviours, features, and capabilities needed to achieve the business requirement. 'The system must allow users to filter invoices by status, date range, and client.' 'The dashboard must refresh data every 4 hours automatically.' These are the requirements developers build to.",
      },
      {
        type: "subheading",
        content: "Non-Functional Requirements",
      },
      {
        type: "paragraph",
        content:
          "These define how the system must perform — quality attributes like performance, security, scalability, and usability. They're frequently overlooked in requirements documentation and consistently responsible for post-launch problems. 'The system must load within 2 seconds for 95% of requests.' 'All user data must be encrypted at rest and in transit.'",
      },
      {
        type: "callout",
        content:
          "A requirements document without non-functional requirements is a half-finished document. Systems that work but perform poorly, expose data, or can't scale are failed systems.",
      },
      {
        type: "heading",
        content: "The Five Elicitation Techniques",
      },
      {
        type: "paragraph",
        content:
          "Elicitation is the process of drawing requirements out of stakeholders — and it's as much an art as a science. Different stakeholders, different problems, and different organisational contexts require different approaches. These five techniques cover the majority of situations:",
      },
      {
        type: "subheading",
        content: "1. Structured Interviews",
      },
      {
        type: "paragraph",
        content:
          "One-on-one conversations with key stakeholders, guided by prepared questions but open to exploration. The most important rule: listen more than you talk. Use open questions ('Tell me about the current process') before closed ones ('Does the current system do X?'). Silence is not a problem — it's often where the most important information emerges.",
      },
      {
        type: "subheading",
        content: "2. Requirements Workshops",
      },
      {
        type: "paragraph",
        content:
          "Facilitated group sessions designed to elicit, align, and validate requirements across multiple stakeholders simultaneously. Workshops are particularly valuable when stakeholders have conflicting views — the facilitated format surfaces disagreements in a controlled environment, rather than letting them emerge as surprises during delivery.",
      },
      {
        type: "subheading",
        content: "3. Process Observation",
      },
      {
        type: "paragraph",
        content:
          "Watching stakeholders work — physically or remotely — to understand how processes actually function rather than how they're described in documentation or by management. What people say they do and what they actually do are consistently different. Observation closes that gap.",
      },
      {
        type: "subheading",
        content: "4. Document Analysis",
      },
      {
        type: "paragraph",
        content:
          "Reviewing existing documentation — process maps, system manuals, previous requirements documents, audit reports, complaints logs — to extract baseline requirements and identify gaps or contradictions. Often the most efficient way to understand what exists before designing what should.",
      },
      {
        type: "subheading",
        content: "5. Surveys and Questionnaires",
      },
      {
        type: "paragraph",
        content:
          "Useful for gathering input from a large number of stakeholders where one-on-one interviews aren't practical. Best suited for quantitative questions and closed-choice data rather than exploratory requirements. Always follow up on outlier responses — they frequently signal important edge cases.",
      },
      {
        type: "heading",
        content: "The SMART Requirements Framework",
      },
      {
        type: "paragraph",
        content:
          "A requirement that isn't testable isn't a requirement — it's an aspiration. Every functional requirement you write should pass the SMART test:",
      },
      {
        type: "list",
        items: [
          "Specific — it describes exactly one behaviour or capability, not a general category",
          "Measurable — there is a clear way to verify whether the requirement has been met",
          "Achievable — it is technically feasible within the project constraints",
          "Relevant — it directly supports a stated business requirement",
          "Traceable — it can be linked back to its source and forward to its test case",
        ],
      },
      {
        type: "paragraph",
        content:
          "Run every requirement you write through this checklist. If it fails any single criterion, rewrite it before it goes into the document.",
      },
      {
        type: "quote",
        content:
          "Ambiguous requirements are not better than no requirements. They're worse — they create the illusion that everyone is aligned when they aren't.",
      },
      {
        type: "heading",
        content: "The Seven Most Common Pitfalls",
      },
      {
        type: "paragraph",
        content:
          "In every engagement where requirements have caused problems, the root cause is almost always one of the following:",
      },
      {
        type: "list",
        items: [
          "Assuming instead of confirming — BAs filling gaps in their understanding with assumptions rather than follow-up questions",
          "Capturing solutions instead of needs — stakeholders describing what they want the system to do rather than what business problem they need solved",
          "Missing edge cases — requirements that cover the happy path but fail to address exceptions, errors, and boundary conditions",
          "Ignoring non-functional requirements — performance, security, and scalability overlooked until post-launch",
          "Insufficient stakeholder coverage — requirements elicited from a vocal minority while key users are not consulted",
          "Requirements that can't be tested — vague language like 'the system should be user-friendly' with no measurable criterion",
          "No traceability — requirements that can't be linked back to a business objective or forward to a test case",
        ],
      },
      {
        type: "heading",
        content: "Documentation Best Practices",
      },
      {
        type: "paragraph",
        content:
          "Requirements live in documents — and how those documents are structured matters as much as what they contain. These practices ensure your requirements documentation actually serves its purpose:",
      },
      {
        type: "list",
        items: [
          "Use a consistent template — structure reduces cognitive load for readers and ensures nothing is systematically missed",
          "Number every requirement — this enables precise traceability and unambiguous reference in conversations and test cases",
          "Include the rationale — for each requirement, record why it exists so future teams can make informed decisions about changes",
          "Separate must-haves from nice-to-haves — using MoSCoW prioritisation (Must Have, Should Have, Could Have, Won't Have)",
          "Version control the document — every requirements document should have a version history and a sign-off log",
          "Link to test cases — every functional requirement should have at least one corresponding acceptance criterion",
        ],
      },
      {
        type: "heading",
        content: "Validation: The Step Most BAs Skip",
      },
      {
        type: "paragraph",
        content:
          "Writing requirements is necessary but not sufficient. Those requirements need to be validated — confirmed with stakeholders to ensure they accurately represent what's needed, and reviewed for completeness, consistency, and testability.",
      },
      {
        type: "paragraph",
        content:
          "Structured walkthroughs — where the BA presents each requirement to relevant stakeholders and invites challenge — are the most effective validation technique. They surface misunderstandings before they become built-in defects.",
      },
      {
        type: "callout",
        content:
          "Requirements signed off without a structured walkthrough are requirements that haven't actually been validated. The sign-off is not the validation — the conversation is.",
      },
      {
        type: "heading",
        content: "Putting It Together",
      },
      {
        type: "paragraph",
        content:
          "Requirements gathering is a process, not an event. It begins before the first stakeholder meeting and doesn't end until the solution is validated against the original business objectives. The BAs who consistently produce clear, complete, testable requirements share one trait: they treat every conversation as an opportunity to surface something they don't yet know.",
      },
      {
        type: "paragraph",
        content:
          "Follow the framework. Apply the SMART criteria. Run every document through the pitfall checklist. Validate everything. The investment is front-loaded, but the savings — in rework, in misaligned delivery, in post-launch fixes — are substantial.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 2): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, count);
}
