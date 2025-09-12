export interface PaginationProps {
	pageSize: number;
	pageNumberStartingFromOne: number;
}
export type WithPagination<T> = PaginationProps & T;
