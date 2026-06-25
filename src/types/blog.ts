export type ContentSectionType =
  | "paragraph"
  | "heading"
  | "subheading"
  | "list"
  | "quote"
  | "callout";

export interface ContentSection {
  type: ContentSectionType;
  content?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: ContentSection[];
}
