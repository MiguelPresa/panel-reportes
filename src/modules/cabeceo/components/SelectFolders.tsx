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

export const SelectFolders = () => {
	const [open, setOpen] = useState(false);

	const {
		selectedFolder,
		handleSelectedFolder,
		folders,
	} = useCabeceoLogs();

	return (
		<div className="flex flex-col justify-center gap-1 space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[250px] justify-between"
					>
						{folders.isLoading && <span>loading models...</span>}
						{selectedFolder && <span>{folders.data.find((folder) => folder.name === selectedFolder.name)?.name}</span>}
						{!folders.isLoading && !selectedFolder && <span>[ {folders.data.length} ] Selecciona un modelo...</span>}
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
							{folders.hasError ? (
								<CommandEmpty>
									<span className="text-destructive">
										{" "}
										{folders.error}
									</span>
								</CommandEmpty>
							) : (
								<CommandEmpty>Not models found</CommandEmpty>
							)}
							<CommandGroup>
								{folders.data.map((folder) => (
									<CommandItem
										key={folder.mtime}
										value={folder.name}
										onSelect={(currentValue) => {
											handleSelectedFolder(
												folders.data.find(
													(folder) =>
														folder.name ===
														currentValue
												) ?? null
											)
											setOpen(false)
										}}
									>
										{folder.name}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedFolder?.name ===
													folder.name
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
			{selectedFolder && (
				<p className="text-sm text-muted-foreground">
					Last update: {selectedFolder.fecha} {selectedFolder.hora}
				</p>
			)}
		</div>
	);
};
