import type { PaginationDto } from "../../../shared/types/PaginationType";

export interface EducationFilters extends PaginationDto {
  finished?: boolean | null;
}
