import { CodeViewDraw, CodeViewerDrawer, DataTable, DataTableColumnHeader } from "@/shared"
import { ColumnDef } from '@tanstack/react-table';
import { useCabeceoLogs } from "../hooks"
import { ContentFile } from "../types"

const columns: ColumnDef<ContentFile>[] = [
	{
		id: "id",
		header: "#",
		cell: ({ row }) => {
			return row.index + 1
		}
	},
	{
		accessorKey: "clipID",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="ClipID" />
		},
		/* cell: ({ row }) => {
			const label = labels.find((label) => label.value === row.original.label)

			return (
				<div className="flex space-x-2">
					{label && <Badge variant="outline">{label.label}</Badge>}
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("title")}
					</span>
				</div>
			)
		}, */
	},
	{
		accessorKey: "digest",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Digest" />
		},
	},
	{
		accessorKey: "api_key",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="API Key" />
		},
	},
	{
		accessorKey: "accion",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Accion" />
		},
	},
	{
		accessorKey: "model",
		header: "Model"
	},
	{
		accessorKey: "fineTuneId",
		header: "FineTune ID"
	},
	{
		accessorKey: "datetime",
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title="Fecha y hora" />
		},
	},
	{
		id: "request",
		header: "Request/Response IA",
		cell: ({ row }) => {
			const nota = row.original

			let request = ""
			let response = ""
			let language_request = nota.language ?? "not defined"
			let language_response = nota.language ?? "not defined"

			try {
				request = JSON.stringify(JSON.parse(nota.request), null, 4)
				language_request = "json"
			} catch (error) {
				// console.log(error);
				request = nota.request
			}
			try {
				response = JSON.stringify(JSON.parse(nota.response), null, 4)
				language_response = "json"
			} catch (error) {
				// console.log(error);
				response = nota.response
			}

			const codeView: CodeViewDraw[] = [
				{
					title: `Request (${nota.clipID})`,
					language: language_request,
					description: language_request === "json" ? `Peticion genera a la API IA: ${nota.accion}` : nota.accion,
					code: request
				},
				{
					title: `Response (${nota.clipID})`,
					language: language_response,
					description: language_response === "json" ? `Peticion devuelta por API IA: ${nota.accion}` : nota.accion,
					code: response
				},
			]

			return (
				<CodeViewerDrawer codeView={codeView} titleButton="View Code IA" />
			)

		}
	},

]

export const DataTableContentFile = () => {
	const { statuses, statusesApiKey, contentFile, uploadContentFile } = useCabeceoLogs()
	return (
		<DataTable
			columns={columns}
			filtered={[
				{
					column: "accion",
					title: "Accion",
					options: statuses
				}, {
					column: "api_key",
					title: "APIKEY",
					options: statusesApiKey
				}
			]}
			data={contentFile.data}
			total={contentFile.total}
			isLoading={contentFile.isLoading}
			hasError={contentFile.hasError}
			error={contentFile.error}
			refetch={uploadContentFile}
		/>
	)
};
