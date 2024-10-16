export type ReporteModel = {
	fecha: string
	resumen: number
	titulo: number
	tituloResumen: number
}



export type FolderInfo = {
	name: string
	mtime: number,
	fecha: string,
	hora: string
}

export type FileInfo = {
	name: string
	size: number,
	mtime: number,
	fecha: string,
	hora: string
}

export type ContentFile = {
	model: string
	fineTuneId: string
	api_key?: string
	opcion: string
	language?: string
	accion: string
	clipID: string
	digest: string
	genero: string
	request: string
	response: string
	datetime: string
	requestView: false
	responseView: false
}

export interface ContentInfo {
	logs: ContentFile[]
	newOffset: number
}

/* FETCH */
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


