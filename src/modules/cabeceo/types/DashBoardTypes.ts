export interface maxContent {
	fecha: string,
	max: number
}

export interface MaxContentDescription extends maxContent {
	description: string
	color: string
}

export interface ChartsInfoType {
	title: string,
	titleTwo: string,
	description?: string
	content: MaxContentDescription[]
	verificador: MaxContentDescription[]
}
export interface ChartsInfoProps extends ChartsInfoType {
	verificador: MaxContentDescription[]
}