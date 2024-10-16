import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>,
	refetch: () => void
}

export function DataTableViewOptions<TData>({
	table,
	refetch
}: DataTableViewOptionsProps<TData>) {
	return (
		<section className="flex gap-2">
			<Button
				variant="outline"
				className="h-8 px-2 lg:px-3"
				onClick={refetch}
			>
				refetch
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
					>
						<MixerHorizontalIcon className="mr-2 h-4 w-4" />
						View
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[150px]">
					<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter(
							(column) =>
								typeof column.accessorFn !== "undefined" && column.getCanHide()
						)
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							)
						})}
				</DropdownMenuContent>
			</DropdownMenu>
		</section>

	)
}