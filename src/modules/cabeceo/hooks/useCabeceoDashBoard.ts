import { useGetDateRangesQuery, useGetReporteProyectoQuery, useGetReporteQuery } from "../services";
import { dateFormat, FetchState, formatStringToDate } from "@/shared";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { FetchStateReporte, FetchStateReporteProyecto } from "../types";

const initialDate: DateRange = {
	from: new Date(new Date().setDate(new Date().getDate() - 3)),
	to: new Date(),
}

export const useCabeceoDashBoard = () => {
	const [date, setDate] = useState<DateRange | undefined>(initialDate);
	const [isRefetching, setIsRefetching] = useState(false);

	const getDateRanges = useGetDateRangesQuery()
	const { data: dateRangesData, isLoading: dateRangesIsLoading, isError: dateRangesIsError, error: dateRangesError } = getDateRanges

	const getReporte = useGetReporteQuery(
		{
			minDate: dateFormat(date?.from),
			maxDate: dateFormat(date?.to)
		},
		{ skip: !date || !date.from || !date.to, refetchOnMountOrArgChange: true, }
	)
	const { data: reporteData, isLoading: reporteIsLoading, isError: reporteIsError, error: reporteError, refetch: refetchReporte, isFetching: isFetchingReporte } = getReporte

	const getReporteProyecto = useGetReporteProyectoQuery(
		{
			minDate: dateFormat(date?.from),
			maxDate: dateFormat(date?.to)
		},
		{ skip: !date || !date.from || !date.to, refetchOnMountOrArgChange: true, }
	)
	const { data: reporteProyectoData, isLoading: reporteProyectoIsLoading, isError: reporteProyectoIsError, error: reporteProyectoError, isFetching: isFetchingReporteProyecto } = getReporteProyecto

	const dateRanges: FetchState<DateRange> = {
		data: {
			from: formatStringToDate(dateRangesData?.min || "") ?? date?.from,
			to: formatStringToDate(dateRangesData?.max || "") ?? date?.to
		},
		total: 0,
		isLoading: dateRangesIsLoading,
		hasError: !!dateRangesIsError,
		error: dateRangesError ? (typeof dateRangesError === "string" ? dateRangesError : "Error al obtener el rango de fechas") : undefined
	}

	const reportes: FetchState<FetchStateReporte[]> = {
		data: reporteData || [],
		isLoading: reporteIsLoading || isRefetching || isFetchingReporte,
		total: reporteData?.length || 0,
		hasError: !!reporteIsError,
		error: reporteError ? (typeof reporteError === "string" ? reporteError : "Error al obtener el rango de fechas") : undefined
	}

	const reportesProyecto: FetchState<FetchStateReporteProyecto | null> = {
		data: reporteProyectoData || null,
		isLoading: reporteProyectoIsLoading || isRefetching || isFetchingReporteProyecto,
		total: 0,
		hasError: !!reporteProyectoIsError,
		error: reporteProyectoError ? (typeof reporteProyectoError === "string" ? reporteProyectoError : "Error al obtener el rango de fechas") : undefined
	}

	useEffect(() => {
		if (date?.from && date?.to) {
			setIsRefetching(true);
			refetchReporte().finally(() => setIsRefetching(false));
		}
	}, [date, refetchReporte]);

	const handleDateChange = (newDate: DateRange | undefined) => {
		setDate(newDate);
	};

	return {
		dateRanges,
		rangeDate: date,
		reportes,
		reportesProyecto,

		handleDateChange
	}
};
