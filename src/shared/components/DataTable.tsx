import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { DataTableToolbar } from "./DataTableToolbar"
import { DataTableFacetedFilterOptions } from "./DataTableFacetedFilter"
import { DataTablePagination } from "./DataTablePagination"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[],
	filtered?:
	{
		column: string
		title: string
		options: DataTableFacetedFilterOptions[]
	}[]

	total: number,
	isLoading?: boolean
	hasError?: boolean
	error?: string,
	refetch: () => void
}

export const DataTable = <TData, TValue>({ columns, data, filtered, total, isLoading, hasError, error, refetch }: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [globalFilter, setGlobalFilter] = useState('');
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	const pagination = useMemo(() => ({
		pageIndex,
		pageSize,
	}),
		[pageIndex, pageSize])


	const table = useReactTable({
		data,
		columns,
		pageCount: Math.ceil(total / pageSize),
		state: {
			sorting,
			columnFilters,
			globalFilter,
			pagination
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
	})

	return (
		<section className="space-y-4">
			{
				filtered && filtered.length > 0 && <DataTableToolbar table={table} filtered={filtered} refetch={refetch} />
			}
			<div className="w-full mt-5 pe-6">
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{
								table.getHeaderGroups().map(headerGroup => (
									<TableRow key={headerGroup.id}>
										{
											headerGroup.headers.map(header => (
												<TableHead key={header.id}>
													{
														header.isPlaceholder
															? null
															: flexRender(
																header.column.columnDef.header,
																header.getContext()
															)
													}
												</TableHead>
											))
										}

									</TableRow>
								))
							}
						</TableHeader>
						<TableBody>
							{
								table.getRowModel().rows.length
									? (table.getRowModel().rows.map(row => (
										<TableRow key={row.id}
											data-state={row.getIsSelected() && "selected"}
										>
											{
												row.getVisibleCells().map(cell => (
													<TableCell key={cell.id}>
														{
															flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)
														}
													</TableCell>
												))
											}
										</TableRow>
									)))
									: (
										<TableRow>
											<TableCell colSpan={columns.length} className="h-24 text-center">
												{isLoading && "loading content..."}
												{!isLoading && !hasError && "No results."}
												{hasError && error}
											</TableCell>
										</TableRow>
									)
							}
						</TableBody>
					</Table>
				</div>
				<DataTablePagination table={table} total={total} />
			</div>
		</section>

	)
};
