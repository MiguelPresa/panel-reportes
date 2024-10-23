import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { downloadReporte } from "../../helpers";
import { DateRange } from "react-day-picker";
import { FetchState } from "@/shared";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FetchStateReporte } from "../../types";
import { cn } from "@/lib/utils";

type DateRangeReportProps = {
	rangeDate: DateRange | undefined
	dateRanges: FetchState<DateRange>
	handleDateChange: (newDate: DateRange | undefined) => void
	reportes: FetchState<FetchStateReporte[]>
}

export const DateRangeReport = ({ rangeDate, dateRanges, handleDateChange, reportes }: DateRangeReportProps) => {

	const init = rangeDate && rangeDate.from && format(rangeDate.from, "LLL dd, y") || ""
	const end = rangeDate && rangeDate.to && format(rangeDate.to, "LLL dd, y") || ""
	const filename = `${init} - ${end}`

	return <div className={"flex-1 flex items-center gap-4"}>
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
};
