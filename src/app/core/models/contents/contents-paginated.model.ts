import { Content } from "src/app/ui/contents/components/content";

export interface ContentPaginated {
  data: Content[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
