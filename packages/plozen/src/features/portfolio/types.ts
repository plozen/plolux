export type ProjectCategory = 'Web App' | 'Mobile App' | 'AI Solution' | 'Cloud Infra' | 'Branding';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  imageUrl: string;
  tags: string[];
  year: string;
  link?: string;
  gradient?: string; // CSS background value (e.g., linear-gradient)
}
