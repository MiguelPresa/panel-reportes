import { API_URL } from "@/config/configuration";
import { ResponseAPI } from "../types";
import { isErrorResponseAPI, isResponseAPI } from "../utils";

export const useApiFetch = () => {

	const fetchApi = async <T>(endpoint: string, options: RequestInit = {}, errorMessage: string): Promise<ResponseAPI<T>> => {
		const url = `${API_URL}${endpoint}`
		try {
			const request = await fetch(url, options)
			const response = await request.json()
			if (isErrorResponseAPI(response)) {
				throw new Error(response.data.toString() || errorMessage)
			}
			if (!response.success) {
				const error = typeof response.data === "string" ? response.data : errorMessage
				throw new Error(error)
			}
			if (!isResponseAPI<T>(response)) {
				throw new Error("Respuesta inesperada de la API");
			}
			return response
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`${errorMessage}: ${error.message}`);
			} else {
				throw new Error(`Error desconocido: ${errorMessage}`);
			}
		}
	}
	const fetchApiResponse = async <T>(endpoint: string, options: RequestInit = {}): Promise<ResponseAPI<T>> => {
		const url = `${API_URL}${endpoint}`
		const request = await fetch(url, options)
		const response = await request.json()
		return response
	}

	return { fetchApi, fetchApiResponse }
};
