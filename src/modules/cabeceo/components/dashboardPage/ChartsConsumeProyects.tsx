import { FetchState } from "@/shared";
import { FetchStateReporteProyecto } from "../../types";
import { BarChartHorizontalProyects } from "./BarChartHorizontalProyects";
import { proyects } from "../../data";

type ChartsConsumeProyectsProps = {
	reportesProyecto: FetchState<FetchStateReporteProyecto | null>
}
export const ChartsConsumeProyects = ({ reportesProyecto }: ChartsConsumeProyectsProps) => {
	return (
		<div className="w-full flex flex-col gap-6">
			{reportesProyecto.isLoading && <p className="text-center mt-5 text-blue-500">loading report proyect...</p>}
			{reportesProyecto.hasError && <p className="text-center mt-5 text-yellow-500">Error: {reportesProyecto.error}</p>}
			{
				!reportesProyecto.isLoading && reportesProyecto.data && (
					<div
						className="w-full grid lg:grid-cols-2 gap-6"
					>
						{
							proyects.map(key => {
								if (!reportesProyecto.data) return
								return <BarChartHorizontalProyects
									key={key.original}
									original={reportesProyecto.data.apikeys[key.original]}
									verify={reportesProyecto.data.verificador_apikeys[key.verificador]}
									title={`Consumo por proyecto`}
									color={key.color}
								/>
							})
						}
					</div>
				)
			}
		</div>
	)
};
