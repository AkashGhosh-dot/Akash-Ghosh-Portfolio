import type { SkillCategory } from "@/types/skill";

export const skillCategories: SkillCategory[] = [
  {
    id: "business-analysis",
    title: "Business Analysis",
    accent: "#3B82F6",
    skills: [
      { name: "Requirement Gathering" },
      { name: "Stakeholder Communication" },
      { name: "Gap Analysis" },
      { name: "KPI Tracking" },
      { name: "Process Optimization" },
      { name: "BRD Writing" },
      { name: "Functional Specifications" },
      { name: "Process Flow Diagrams" },
    ],
  },
  {
    id: "data-tools",
    title: "Data & Analytics Tools",
    accent: "#7B72E1",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "Power BI" },
      { name: "Microsoft Excel" },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Scikit-learn" },
    ],
  },
  {
    id: "analytics",
    title: "Analytical Techniques",
    accent: "#A78BFA",
    skills: [
      { name: "Exploratory Data Analysis" },
      { name: "Predictive Modeling" },
      { name: "Data Cleaning" },
      { name: "Forecasting" },
      { name: "Feature Engineering" },
      { name: "Regression Analysis" },
    ],
  },
  {
    id: "visualization",
    title: "Visualization & Reporting",
    accent: "#60A5FA",
    skills: [
      { name: "Dashboard Development" },
      { name: "Data Visualization" },
      { name: "Reporting" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    accent: "#3B82F6",
    skills: [
      { name: "Business Requirements Doc" },
      { name: "Functional Specifications" },
      { name: "Process Flow Diagrams" },
      { name: "User Stories" },
      { name: "Use Cases" },
    ],
  },
  {
    id: "tech",
    title: "Technology",
    accent: "#7B72E1",
    skills: [
      { name: "HTML / CSS" },
      { name: "Git" },
      { name: "Cursor AI" },
      { name: "AI Tools" },
      { name: "Jupyter Notebook" },
    ],
  },
];
