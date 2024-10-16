import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useCabeceoLogs } from "../hooks";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SelectFiles = () => {
	const [open, setOpen] = useState(false);

	const {
		selectedFolder,
		dateFile,
		files,
		selectedFile,
		handleSelectedFile,
	} = useCabeceoLogs();

	return (
		dateFile && selectedFolder && files.data.length > 0 &&
		<div className="flex flex-col justify-center gap-1 space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[250px] justify-between"
					>
						{files.isLoading && <span>loading files...</span>}
						{selectedFile && <span>{files.data.find((file) => file.name === selectedFile.name)?.name}</span>}
						{!files.isLoading && !selectedFile && <span>[ {files.data.length} ] Selecciona un archivo log </span>}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[250px] p-0">
					<Command>
						<CommandInput
							placeholder="Search model..."
							className="h-9"
						/>
						<CommandList>
							{files.hasError ? (
								<CommandEmpty>
									<span className="text-destructive">
										{" "}
										{files.error}
									</span>
								</CommandEmpty>
							) : (
								<CommandEmpty>Not files found</CommandEmpty>
							)}
							<CommandGroup>
								{files.data.map((file) => (
									<CommandItem
										key={file.mtime}
										value={file.name}
										onSelect={(currentValue) => {
											handleSelectedFile(
												files.data.find(
													(file) =>
														file.name ===
														currentValue
												) ?? null
											)
											setOpen(false)
										}}
									>
										{file.name}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedFile?.name ===
													file.name
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{selectedFile && (
				<p className="text-sm text-muted-foreground">
					Last update: {selectedFile.fecha} {selectedFile.hora}
				</p>
			)}
		</div>
	);
};
