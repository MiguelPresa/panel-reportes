import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
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
import { FolderInfo, FileInfo} from "../../types";
import { useState } from "react";

type ItemType = FolderInfo | FileInfo;

type CustomSelectProps<T extends ItemType> = {
	data: T[]
	isLoading: boolean
	hasError: boolean
	error?: string
	selectedItem: T | null
	onSelect: (folder: T | null) => void
	loadingText?: string
	emptyText?: string
	placeholder?: string
	buttonWidth?: string
	showLastUpdate?: boolean
}

const CustomSelect = <T extends ItemType>({
	data,
	isLoading,
	hasError,
	error,
	selectedItem,
	onSelect,
	loadingText = "loading...",
	emptyText = "No items found",
	placeholder = "Search...",
	buttonWidth = "w-[250px]",
	showLastUpdate = true,
}: CustomSelectProps<T>) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col justify-center gap-1 space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={`${buttonWidth} justify-between`}
					>
						{isLoading && <span>{loadingText}</span>}
						{selectedItem && (
							<span>
								{data.find((item) => item.name === selectedItem.name)?.name}
							</span>
						)}
						{!isLoading && !selectedItem && (
							<span>[ {data.length} ] {placeholder}</span>
						)}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={buttonWidth + " p-0"}>
					<Command>
						<CommandInput
							placeholder={placeholder}
							className="h-9"
						/>
						<CommandList>
							{hasError ? (
								<CommandEmpty>
									<span className="text-destructive">
										{error}
									</span>
								</CommandEmpty>
							) : (
								<CommandEmpty>{emptyText}</CommandEmpty>
							)}
							<CommandGroup>
								{data.map((item) => (
									<CommandItem
										key={item.mtime}
										value={item.name}
										onSelect={(currentValue) => {
											onSelect(data.find((item) => item.name === currentValue) ?? null);
											setOpen(false);
										}}
									>
										{item.name}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedItem?.name === item.name
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
			{showLastUpdate && selectedItem && (
				<p className="text-sm text-muted-foreground">
					Last update: {selectedItem.fecha} {selectedItem.hora}
				</p>
			)}
		</div>
	);
};

export default CustomSelect;