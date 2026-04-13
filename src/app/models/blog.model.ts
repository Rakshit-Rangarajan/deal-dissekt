export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
  publishDate: string;
  author: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  github?: string;
  technologies: string[];
  year: number;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  logo?: string;
}
