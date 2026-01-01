export type EducationType = {
  id: number;
  institution: string;
  title: string;
  description?: string | null;
  startDate: string;
  finished: boolean;
  endDate?: string | null ;
  hidden: boolean;
};
