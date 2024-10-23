import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter, DataTableFacetedFilterOptions } from "./DataTableFacetedFilter"
import { DataTableViewOptions } from "./DataTableViewOptions"

interface DataTableToolbarProps<TData> {
	table: Table<TData>,
	filtered?:
	{
		column: string
		title: string
		options: DataTableFacetedFilterOptions[]
	}[],
	refetch: () => void
}

export const DataTableToolbar = <TData,>({
	table,
	filtered,
	refetch
}: DataTableToolbarProps<TData>) => {
	const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter != ""

	return (
		<div className="flex items-center justify-start me-6">
			<div className="flex flex-1 items-start space-x-2">
				<Input
					placeholder="Filter all columns..."
					value={table.getState().globalFilter ?? ""}
					onChange={(event) => table.setGlobalFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{
					filtered && filtered.map((filter) => {
						return table.getColumn(filter.column) && (
							<DataTableFacetedFilter
								key={filter.title}
								column={table.getColumn(filter.column)}
								title={filter.title}
								options={filter.options}
							/>
						)
					})
				}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters()
							table.setGlobalFilter("")
						}}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} refetch={refetch} />
		</div>
	)
}
