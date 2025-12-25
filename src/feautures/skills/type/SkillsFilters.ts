import type { PaginationDto } from "../../../shared/types/PaginationType";

export interface SkillsFilters extends PaginationDto {
  category: string | null;
}
