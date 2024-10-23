import { FetchStateReporte } from "../types"

export interface ConvertToCsv {
	modelo: string
	tipo: string
	fecha: string
	resumen: number
	titulo: number
	tituloResumen: number
}

const flattenData = (data: FetchStateReporte[]) => {
	return data.flatMap(modelReport =>
		["original", "verificador"].flatMap(type =>
			modelReport[type as keyof Pick<FetchStateReporte, "original" | "verificador">].map(entry => ({
				modelo: modelReport.modelo,
				tipo: type,
				...entry
			}))
		))
}

const convertToCsv = (data: ConvertToCsv[]): string => {
	const headers = Object.keys(data[0]).join(",")
	const rows = data.map(row =>
		Object.values(row).map(value =>
			typeof value === "string" && value.includes(",") ? `"${value}"` : value
		).join(",")
	)

	return [headers, ...rows].join("\n")
}

export const downloadReporte = (data: FetchStateReporte[], filename: string, typeFile: "csv" | "json" = "csv") => {
	let content: string = ""
	let type: string = ""

	if (typeFile === "csv") {
		const newData = flattenData(data)
		content = convertToCsv(newData)
		type = "text/csv;charset=utf-8;"
	} else {
		content = JSON.stringify(data, null, 4);
		type = 'application/json;charset=utf-8;';
	}

	const blob = new Blob([content], { type })
	const url = URL.createObjectURL(blob)
	const link = document.createElement("a")
	link.download = `${filename}.${typeFile}`
	link.href = url
	link.click()

}