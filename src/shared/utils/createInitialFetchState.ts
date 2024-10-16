import { FetchState } from "../types";

export const createInitialFetchState = <T>(intialFetch: T): FetchState<T> => ({
	data: intialFetch,
	isLoading: false,
	hasError: false,
	error: undefined,
	total: 0,
})