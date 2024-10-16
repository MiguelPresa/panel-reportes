export interface FetchState<T> {
	data: T,
	total: number
	hasError: boolean,
	isLoading: boolean,
	error?: string,
}