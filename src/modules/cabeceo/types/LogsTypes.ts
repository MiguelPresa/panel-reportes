/* LOGS */
interface SelectableItem {
	name: string;
	mtime: string;
	fecha?: string;
	hora?: string;
}

export interface FolderInfo extends SelectableItem {
	type: "folder"
}

export interface FileInfo extends SelectableItem {
	size: number,
	type: "file"
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