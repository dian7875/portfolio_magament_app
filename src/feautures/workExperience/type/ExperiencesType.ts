export type ExperiencesType = {
  id: number;
  role: string;
  company: string;
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  hidden: boolean;
};


export type CreateExperienceDto = {
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description?: string;
  responsibilities?: string[];
  hidden?: boolean;
};
