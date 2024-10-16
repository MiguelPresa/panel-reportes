import { ErrorResponseAPI } from "../types";

export const isErrorResponseAPI = (response: any): response is ErrorResponseAPI => {
	return (
		typeof response === 'object' &&
		response !== null &&
		'success' in response &&
		'status' in response &&
		'data' in response &&
		'type' in response &&
		typeof response.data === 'string'
	);
}
