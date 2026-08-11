export type ProjectStatus = 'backlog' | 'in_progress' | 'review' | 'done';

export interface Project {
  id?: string | number;
  documentId?: string;
  title: string;
  description: string;
  status: ProjectStatus;
  order: number;
  category: string;
  tagColor: string;
  updatedAt?: string;
}

export interface Column {
  id: ProjectStatus;
  title: string;
  badgeColor: string;
  projects: Project[];
}
