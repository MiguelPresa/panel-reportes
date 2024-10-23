import { FetchState } from "@/shared";
import { FetchStateReporte } from "../../types";
import { maxContentModelConsume } from "../../helpers";
import { BarChartMultipleModels } from "./BarChartMultipleModels";
import { CardsBarMixedInfoModels } from "./CardsBarMixedInfoModels";
import { cn } from "@/lib/utils";

type ChartsConsumeModelsProps = {
	reportes: FetchState<FetchStateReporte[]>
}

export const ChartsConsumeModels = ({ reportes }: ChartsConsumeModelsProps) => {
	return (
		<div className="w-full flex flex-col gap-6">
			{reportes.isLoading && <p className="text-center mt-5 text-blue-500">loading report...</p>}
			{reportes.hasError && <p className="text-center mt-5 text-yellow-500">Error: {reportes.error}</p>}
			{
				!reportes.isLoading && reportes.data.length > 0 && reportes.data.map((item, index) => {
					const mayorResumenOriginal = {
						...maxContentModelConsume(item.original, "resumen"),
						description: "notas resumidas",
						color: "hsl(var(--chart-1))"
					}
					const mayorTituloOriginal = {
						...maxContentModelConsume(item.original, "titulo"),
						description: "notas tituladas",
						color: "hsl(var(--chart-2))"
					}
					const mayorTituloResumenOriginal = {
						...maxContentModelConsume(item.original, "tituloResumen"),
						description: "notas en conjunto",
						color: "hsl(var(--chart-3))"
					}

					const mayorResumenVerificador = {
						...maxContentModelConsume(item.verificador, "resumen"),
						description: "notas verificadas resumen",
						color: "hsl(var(--chart-1))"
					}
					const mayorTituloVerificador = {
						...maxContentModelConsume(item.verificador, "titulo"),
						description: "notas verificadas titulo",
						color: "hsl(var(--chart-2))"
					}
					const mayorTituloResumenVerificador = {
						...maxContentModelConsume(item.verificador, "tituloResumen"),
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
							<div className="grow">
								<BarChartMultipleModels data={item} title={`Consumo de ${item.modelo}`} />
							</div>
							<CardsBarMixedInfoModels
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
	)
};
