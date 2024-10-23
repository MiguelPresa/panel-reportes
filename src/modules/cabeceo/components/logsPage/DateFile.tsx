import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useCabeceoLogs } from "../../hooks";
import { useState } from "react";
import { dateFormat } from "@/shared";

export function DateFile() {
	const [open, setOpen] = useState(false);
	const { handleSetDateFile, dateFile, selectedFolder, datesFiles } = useCabeceoLogs();

	return (
		selectedFolder &&
		(
			<div className="flex flex-col justify-center gap-1 space-x-4">
				<Popover open={open} onOpenChange={setOpen} >
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							disabled={datesFiles.length === 0}
							className={cn(
								"w-[250px] pl-3 text-left font-normal",
								!dateFile && "text-muted-foreground"
							)}
						>
							{dateFile && datesFiles.length > 0 ? (
								<span>date: {dateFile}</span>
							) : (
								datesFiles.length === 0
									? <span>Modelo sin contenido</span>
									: <span>Selecciona una fecha</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							onSelect={(currentValue) => {
								handleSetDateFile(currentValue)
								setOpen(false)
							}}
							disabled={(date) => {
								const formattedDate = dateFormat(date)
								return !datesFiles.includes(formattedDate)
								/*  (
									date > new Date() ||
									date < new Date("1900-01-01")
								); */
							}}
						// initialFocus
						/>
					</PopoverContent>
				</Popover >
				{datesFiles.length > 0 && (
					<p className="text-sm text-muted-foreground">
						Days: {datesFiles.length}
					</p>
				)}
			</div>

		)
	)
}