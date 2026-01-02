export type SkillsType = {
  id: number;
  name: string;
  level: number;
  category: string;
  hidden: boolean;
};

export type CreateSkillsDto = {
  name: string;
  level: number;
  category: string;
};
