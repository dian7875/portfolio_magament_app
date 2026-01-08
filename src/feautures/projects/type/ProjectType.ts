export type Project = {
  id: number;
  userId: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imagesUrl: string[];
  imagesPath: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  techStack: string[];
  hidden: boolean;
  finishDate: string;
  highlight?: boolean;
};

export type CreateProjectDto = {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  highlight?: boolean;
  techStack: string[];
  finishDate?: string;
  files?: File[];
};

export type UpdateProjectType = {
  id: number;
  data: Partial<Project>;
  files?: File[];
};
