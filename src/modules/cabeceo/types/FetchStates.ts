/* FETCH */

import { Apikeys, ApikeysVerify, ReporteModel } from "./DashBoardTypes"
import { ContentFile, FileInfo, FolderInfo } from "./LogsTypes"

// Dashboard
export type FetchStateDateRange = {
	min: string
	max: string
}
export type FetchStateReporte = {
	modelo: string
	original: ReporteModel[]
	verificador: ReporteModel[]
}
export type FetchStateReporteProyecto = {
	apikeys: Apikeys
	verificador_apikeys: ApikeysVerify
}

// Logs
export type FetchStateFolders = {
	result: FolderInfo[]
	total: number,
}
export type FetchStateFiles = {
	result: FileInfo[]
	total: number,
}
export type FetchStateContentInfo = {
	result: ContentFile[],
	newOffset: number,
	total: number,
}