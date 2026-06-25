export interface ProcessStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tagline: string;
  color: string;
  iconName: string;
  challenge: string;
  challengeContext: string;
  approach: ProcessStep[];
  outcome: string;
  outcomePoints: string[];
  skills: string[];
  impactStatement: string;
  comingSoon?: boolean;
  detailPage?: string;
}
