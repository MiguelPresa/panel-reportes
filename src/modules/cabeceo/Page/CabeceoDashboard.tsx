import { Header } from "@/dashboard"
import { cabeceoRouterLinks } from "../routes";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ChartsDashboard, ChartsInfo } from "../components";
import { FetchStateReporte, maxContent, ReporteModel } from "../types";
import { useCabeceoDashBoard } from "../hooks";

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

const downloadReporte = (data: FetchStateReporte[], filename: string, typeFile: "csv" | "json" = "csv") => {
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

export const CabeceoDashboard = () => {
	const { reportes, rangeDate, dateRanges, handleDateChange } = useCabeceoDashBoard()
	const maxContent = (item: ReporteModel[], key: keyof ReporteModel): maxContent => {
		const mayorContent = item.reduce((acc: ReporteModel, current: ReporteModel) => current[key] > acc[key] ? current : acc)
		return {
			fecha: mayorContent.fecha,
			max: Number(mayorContent[key])
		}
	}

	const init = rangeDate && rangeDate.from && format(rangeDate.from, "LLL dd, y") || ""
	const end = rangeDate && rangeDate.to && format(rangeDate.to, "LLL dd, y") || ""
	const filename = `${init} - ${end}`

	return (
		<>
			<Header headerContent={[
				cabeceoRouterLinks[0]
			]} />
			<h1 className="text-3xl">Dashboard cabeceo</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nulla totam ipsa dolore animi laudantium.</p>

			<section className="flex flex-col gap-4 pe-6 w-full">
				<div className={"flex-1 flex items-center gap-4"}>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={"outline"}
								className={cn(
									"w-[300px] justify-start text-left font-normal",
									!rangeDate && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{dateRanges.isLoading && <span>Cargando rango fechas...</span>}
								{!dateRanges.isLoading && dateRanges.hasError && <span>{dateRanges.error}</span>}

								{!dateRanges.isLoading && !dateRanges.hasError &&
									rangeDate?.from ? (
									rangeDate.to ? (
										<>
											{format(rangeDate.from, "LLL dd, y")} -{" "}
											{format(rangeDate.to, "LLL dd, y")}
										</>
									) : (
										format(rangeDate.from, "LLL dd, y")
									)
								) : (
									<span>Selecciona un rango de fechas</span>
								)

								}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={rangeDate?.from}
								selected={rangeDate}
								onSelect={handleDateChange}
								numberOfMonths={2}
								disabled={(date) => {
									const minDate = dateRanges.data?.from;
									const maxDate = dateRanges.data?.to;
									return (maxDate && minDate) ? (date > maxDate || date < minDate) : true
								}}
							/>
						</PopoverContent>
					</Popover>
					<Button
						onClick={() => downloadReporte(reportes.data, filename)}
						disabled={reportes.isLoading || !rangeDate || !rangeDate.from || !rangeDate.to}
					>
						Download
					</Button>
				</div>

				<div className="w-full flex flex-col gap-6">
					{reportes.isLoading && <p className="text-center mt-5 text-blue-500">loading report...</p>}
					{reportes.hasError && <p className="text-center mt-5 text-yellow-500">Error: {reportes.error}</p>}
					{
						!reportes.isLoading && reportes.data.length > 0 && reportes.data.map((item, index) => {
							const mayorResumenOriginal = {
								...maxContent(item.original, "resumen"),
								description: "notas resumidas",
								color: "hsl(var(--chart-1))"
							}
							const mayorTituloOriginal = {
								...maxContent(item.original, "titulo"),
								description: "notas tituladas",
								color: "hsl(var(--chart-2))"
							}
							const mayorTituloResumenOriginal = {
								...maxContent(item.original, "tituloResumen"),
								description: "notas en conjunto",
								color: "hsl(var(--chart-3))"
							}

							const mayorResumenVerificador = {
								...maxContent(item.verificador, "resumen"),
								description: "notas verificadas resumen",
								color: "hsl(var(--chart-1))"
							}
							const mayorTituloVerificador = {
								...maxContent(item.verificador, "titulo"),
								description: "notas verificadas titulo",
								color: "hsl(var(--chart-2))"
							}
							const mayorTituloResumenVerificador = {
								...maxContent(item.verificador, "tituloResumen"),
								description: "notas verificadas en conjunto",
								color: "hsl(var(--chart-3))"
							}


							return (
								<div
									className={cn(
										"w-full flex gap-6 flex-nowrap lg:flex-row flex-col-reverse",
										index % 2 === 0 ? " lg:flex-row" : "lg:flex-row-reverse"
									)}
									key={`${item.modelo}-${index}`}
								>
									{/* <div className='grid w-full gap-6 2xl:max-w-7xl xl:max-w-4xl lg:max-w-xl'> */}
									<div className="grow">
										<ChartsDashboard data={item} title={`Consumo de ${item.modelo}`} />
									</div>
									<ChartsInfo
										title={item.modelo}
										titleTwo={`Verificador ${item.modelo}`}
										description="Mayor consumo dentro del rango de fechas"
										verificador={[mayorResumenVerificador, mayorTituloVerificador, mayorTituloResumenVerificador]}
										content={[mayorResumenOriginal, mayorTituloOriginal, mayorTituloResumenOriginal]}
									/>

								</div>
							)
						})
					}
				</div>
				<div className="w-full flex flex-col gap-6">
					{reportes.isLoading && <p className="text-center mt-5 text-blue-500">loading report...</p>}
					{reportes.hasError && <p className="text-center mt-5 text-yellow-500">Error: {reportes.error}</p>}
					{
						!reportes.isLoading && reportes.data.length > 0 && reportes.data.map((item, index) => {
							const mayorResumenOriginal = {
								...maxContent(item.original, "resumen"),
								description: "notas resumidas",
								color: "hsl(var(--chart-1))"
							}
							const mayorTituloOriginal = {
								...maxContent(item.original, "titulo"),
								description: "notas tituladas",
								color: "hsl(var(--chart-2))"
							}
							const mayorTituloResumenOriginal = {
								...maxContent(item.original, "tituloResumen"),
								description: "notas en conjunto",
								color: "hsl(var(--chart-3))"
							}

							const mayorResumenVerificador = {
								...maxContent(item.verificador, "resumen"),
								description: "notas verificadas resumen",
								color: "hsl(var(--chart-1))"
							}
							const mayorTituloVerificador = {
								...maxContent(item.verificador, "titulo"),
								description: "notas verificadas titulo",
								color: "hsl(var(--chart-2))"
							}
							const mayorTituloResumenVerificador = {
								...maxContent(item.verificador, "tituloResumen"),
								description: "notas verificadas en conjunto",
								color: "hsl(var(--chart-3))"
							}


							return (
								<div
									className={cn(
										"w-full flex gap-6 flex-nowrap lg:flex-row flex-col-reverse",
										index % 2 === 0 ? " lg:flex-row" : "lg:flex-row-reverse"
									)}
									key={`${item.modelo}-${index}`}
								>
									{/* <div className='grid w-full gap-6 2xl:max-w-7xl xl:max-w-4xl lg:max-w-xl'> */}
									<div className="grow">
										<ChartsDashboard data={item} title={`Consumo de ${item.modelo}`} />
									</div>
									<ChartsInfo
										title={item.modelo}
										titleTwo={`Verificador ${item.modelo}`}
										description="Mayor consumo dentro del rango de fechas"
										verificador={[mayorResumenVerificador, mayorTituloVerificador, mayorTituloResumenVerificador]}
										content={[mayorResumenOriginal, mayorTituloOriginal, mayorTituloResumenOriginal]}
									/>

								</div>
							)
						})
					}
				</div>
			</section>
		</>
	)
};
