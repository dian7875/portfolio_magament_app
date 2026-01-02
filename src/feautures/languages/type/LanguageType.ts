export type LanguageType = {
  id: number;
  language: string;
  hidden: boolean;
  level: string;
};
export type CreateLanguageDto = {
  language: string;
  level: string;
};
