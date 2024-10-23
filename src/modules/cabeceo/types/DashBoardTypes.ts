/* REPORTE DASHBOARD */
export type ReporteModel = {
	fecha: string
	resumen: number
	titulo: number
	tituloResumen: number
}

export interface Reporte {
	fecha: string
	total: number
}

export type ApiKeyFormat = {
	apikey: string
	proyecto: string
	reporte: Reporte[]
}

export type KeysOriginal = "KEY_OPENAI_CAB_GEN_ENTREVISTA" | "KEY_OPENAI_CAB" | "KEY_OPENAI_CAB_GEN_OPINION" | "KEY_OPENAI_CAB_TEASER" | "CAB_RES_CONFERENCIA" | "CAB_RES_PERIODICOS"
export type KeysVerify = "KEY_OPENAI_CAB_VER_ENTREVISTA" | "KEY_OPENAI_CAB_VER_NOTA" | "KEY_OPENAI_CAB_VER_OPINION" | "KEY_OPENAI_CAB_VER" | "CAB_VER_CONFERENCIA" | "CAB_VER_PERIODICOS"
export type Apikeys = Record<KeysOriginal, ApiKeyFormat>
export type ApikeysVerify = Record<KeysVerify, ApiKeyFormat>


/* DASHBOARD PARARMS */
export interface maxContent {
	fecha: string,
	max: number
}

export interface MaxContentDescription extends maxContent {
	description: string
	color: string
}