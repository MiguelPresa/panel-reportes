import { ResponseAPI } from "../types";

export const isResponseAPI = <T>(response: any): response is ResponseAPI<T> => {
	return (
		typeof response === 'object' &&
		response !== null &&
		'success' in response &&
		'status' in response &&
		'total' in response &&
		'data' in response
	);
}