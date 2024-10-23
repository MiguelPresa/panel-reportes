import { DataTable } from "@/shared"
import { useCabeceoLogs } from "../../hooks"
import { columns } from "../../data";

export const DataTableContentFileLogs = () => {
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
			isLoading={contentFile.isLoading} // false
			hasError={contentFile.hasError} // fasse
			error={contentFile.error} //undefined 
			refetch={uploadContentFile} // ()=>void
		/>
	)
};
