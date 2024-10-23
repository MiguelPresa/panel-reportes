import { maxContent, ReporteModel } from "../types"

export const maxContentModelConsume = (item: ReporteModel[], key: keyof ReporteModel): maxContent => {
	const mayorContent = item.reduce((acc: ReporteModel, current: ReporteModel) => current[key] > acc[key] ? current : acc)
	return {
		fecha: mayorContent.fecha,
		max: Number(mayorContent[key])
	}
}