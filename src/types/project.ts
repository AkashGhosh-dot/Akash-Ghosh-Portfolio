export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  problem: string;
  context: string;
  objectives: string[];
  approach: string[];
  findings: string[];
  recommendations: string[];
  results: string[];
  tools: string[];
  lessonsLearned: string[];
  featured: boolean;
}
