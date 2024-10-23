import { ReporteModel } from "../types";

export const transformData = (data: ReporteModel[]) => {
	return data.map(item => ({
		fecha: item.fecha,
		'resumen': item.resumen,
		'titulo': item.titulo,
		'tituloresumen': item.tituloResumen,
	}));
};