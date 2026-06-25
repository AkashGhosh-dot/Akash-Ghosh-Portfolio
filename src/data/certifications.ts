export interface Certification {
  id: string;
  name: string;
  issuer: string;
  platform: string;
  year: string;
  credentialUrl: string;
  description: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "google-data-analytics",
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    platform: "Coursera",
    year: "2024",
    credentialUrl: "#",
    description:
      "8-course program covering data analysis foundations, SQL, R, Tableau, and data-driven decision making — developed and issued by Google.",
    skills: ["SQL", "R", "Tableau", "Data Analysis", "Data Visualization", "Spreadsheets"],
  },
  {
    id: "data-science-cwh",
    name: "Data Science Course",
    issuer: "Code With Harry",
    platform: "Code With Harry",
    year: "2024",
    credentialUrl: "#",
    description:
      "Comprehensive training in Python for data science — covering NumPy, Pandas, Matplotlib, Scikit-learn, and machine learning fundamentals.",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Machine Learning"],
  },
];
