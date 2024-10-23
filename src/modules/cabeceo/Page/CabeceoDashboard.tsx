import { Header } from "@/dashboard"
import { cabeceoRouterLinks } from "../routes";
import { ChartsConsumeModels, ChartsConsumeProyects, DateRangeReport } from "../components";
import { useCabeceoDashBoard } from "../hooks";

export const CabeceoDashboard = () => {
	const { rangeDate, dateRanges, reportes, reportesProyecto, handleDateChange } = useCabeceoDashBoard()
	return (
		<>
			<Header headerContent={[
				cabeceoRouterLinks[0]
			]} />
			<h1 className="text-3xl">Dashboard cabeceo</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nulla totam ipsa dolore animi laudantium.</p>

			<section className="flex flex-col gap-4 pe-6 w-full">
				<DateRangeReport
					dateRanges={dateRanges}
					handleDateChange={handleDateChange}
					rangeDate={rangeDate}
					reportes={reportes}
				/>
				<ChartsConsumeProyects
					reportesProyecto={reportesProyecto}
				/>
				<ChartsConsumeModels
					reportes={reportes}
				/>
			</section >
		</>
	)
};
