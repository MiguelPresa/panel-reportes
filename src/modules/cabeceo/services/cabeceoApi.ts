
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL, LIMIT_CONTENT } from '@/config/configuration'
import { FetchStateContentInfo, FetchStateDateRange, FetchStateFiles, FetchStateFolders, FetchStateReporte } from '../types'
import { isErrorResponseAPI, isResponseAPI, ResponseAPI } from '@/shared'

const category = "cabeceo"

type ReadContentFile = {
	folder: string
	filename: string
	search: string
	offset: number
	count: number
}

type RangeDate = {
	minDate: string
	maxDate: string
}


const baseQuery = fetchBaseQuery({
	baseUrl: API_URL
})


const customBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions = {}) => {
	const result = await baseQuery(args, api, extraOptions)
	if (result.error) {
		return { error: result.error };
		// return { error: { status: 'CUSTOM_ERROR', data: result.error } };
	}
	if (!isResponseAPI(result.data)) {
		return { error: "Respuesta inesperada de la API" };
		// return { error: { status: 'CUSTOM_ERROR', data: 'Respuesta inesperada de la API' } };
	}
	if (!result.data.success) {
		const errorMessage = typeof result.data.data === "string" ? result.data.data : "Error en la respuesta de la API";
		return { error: errorMessage };
		// return { error: { status: 'CUSTOM_ERROR', data: errorMessage } };
	}
	if (isErrorResponseAPI(result.data)) {
		return { error: result.data.data };
		// return { error: { status: 'CUSTOM_ERROR', data: result.data.data } };
	}

	return result
}

// Define a service using a base URL and expected endpoints
export const cabeceoApi = createApi({
	reducerPath: 'cabeceoApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		getDateRanges: builder.query<FetchStateDateRange, void>({
			query: () => `${category}/Reporte/getDateRanges`,
			transformResponse: (response: ResponseAPI<FetchStateDateRange>) => response.data,
		}),
		getReporte: builder.query<FetchStateReporte[], RangeDate>({
			query: ({minDate, maxDate}) => `${category}/Reporte/getReporte?minDate=${minDate}&maxDate=${maxDate}`,
			transformResponse: (response: ResponseAPI<FetchStateReporte[]>) => response.data,
		}),
		getFolders: builder.query<FetchStateFolders, number>({
			query: (limit = LIMIT_CONTENT) => `${category}/Logs/getFolderList?limit=${limit}`,
			transformResponse: (response: ResponseAPI<FetchStateFolders>) => response.data,
		}),
		getFiles: builder.query<FetchStateFiles, { folder: string, limit: number }>({
			query: ({ folder, limit = LIMIT_CONTENT }) => `${category}/Logs/getFileList?folder=${folder}&limit=${limit}`,
			transformResponse: (response: ResponseAPI<FetchStateFiles>) => response.data,
		}),
		readContentFile: builder.query<FetchStateContentInfo, ReadContentFile>({
			query: ({ folder, filename, search, offset, count }) => `${category}/Logs/readContentFile?folder=${folder}&file=${filename}&search=${search}&count=${count}&offset=${offset}`,
			transformResponse: (response: ResponseAPI<FetchStateContentInfo>) => response.data,
		})
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDateRangesQuery, useGetReporteQuery, useGetFoldersQuery, useGetFilesQuery, useReadContentFileQuery } = cabeceoApi