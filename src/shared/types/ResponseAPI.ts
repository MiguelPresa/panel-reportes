export interface ResponseAPI<T> {
	success: boolean,
	status: number,
	total: number,
	// data?: string | object | [] | T
	data: T
	// code?: Debug["code"],
	// debug?: Debug["debug"],
}
export interface ErrorResponseAPI {
	success: boolean,
	status: number,
	data: string
	// code?: Debug["code"],
	// debug?: Debug["debug"],
	type: string,
}