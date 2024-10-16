import { useGetFilesQuery, useGetFoldersQuery, useReadContentFileQuery } from "../services"
import { ContentFile, FileInfo, FolderInfo } from "../types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { DataTableFacetedFilterOptions, dateFormat, FetchState } from "@/shared"
import { setDateFile, setSelectedFile, setSelectedFolder } from "@/app/slices/cabeceo/cabeceoSlice"
import { useCallback, useEffect, useMemo, useState } from "react"
import { KeyIcon, Workflow } from "lucide-react"

export type SearchContent = {
	foldername: string
	filename: string
	reset: boolean
	intervalReset: boolean
	addContent: boolean
	search: string
}

export const useCabeceoLogs = () => {
	const dispatch = useDispatch()
	const [offset, setOffset] = useState(0);
	const [contentData, setContentData] = useState<ContentFile[]>([]);

	/* --- Redux --- */
	const { cabeceo_logs } = useSelector((state: RootState) => state.cabeceo)
	const { dateFile, selectedFolder, selectedFile, limitedContent } = cabeceo_logs

	/* Date */
	const handleSetDateFile = useCallback((date: Date | undefined) => {
		dispatch(setDateFile(date ? dateFormat(date) : date))
		setContentData([])
		setOffset(0)
	}, [dispatch])

	/* --- Folders --- */
	const getFoldersQuery = useGetFoldersQuery(limitedContent)
	const { data: foldersData, isLoading: foldersIsLoading, isError: foldersIsError, error: foldersError } = getFoldersQuery

	const folders: FetchState<FolderInfo[]> = useMemo(() => ({
		data: foldersData?.result ?? [],
		isLoading: foldersIsLoading,
		total: foldersData?.total ?? 0,
		hasError: !!foldersIsError,
		error: foldersError ? (typeof foldersError === "string" ? foldersError : "Error al obtener los modelos") : undefined
	}), [foldersData, foldersIsLoading, foldersIsError, foldersError])


	const handleSelectedFolder = useCallback((folder: FolderInfo | null) => {
		dispatch(setSelectedFolder(folder ?? null))
		dispatch(setSelectedFile(null))
		setContentData([])
		setOffset(0)
	}, [dispatch])

	/* --- Files --- */
	const getFilesQuery = useGetFilesQuery({
		folder: selectedFolder?.name ?? "",
		limit: limitedContent
	}, { skip: !selectedFolder })
	const { data: filesData, isLoading: filesIsLoading, isError: filesIsError, error: filesError } = getFilesQuery

	const datesFiles = useMemo(() => {
		return filesData ? [...new Set(filesData.result.map(file => file.fecha))] : []
	}, [filesData])

	const files: FetchState<FileInfo[]> = useMemo(() => {
		return {
			data: (dateFile && filesData?.result) ? filesData.result.filter(file => file.fecha === dateFile)
				: [],
			isLoading: filesIsLoading,
			total: filesData?.total ?? 0,
			hasError: !!filesIsError,
			error: filesError ? (typeof filesError === "string" ? filesError : "Error al obtener los archivos") : undefined
		}

	}, [dateFile, filesData, filesIsLoading, filesIsError, filesError]);

	const handleSelectedFile = useCallback((folder: FileInfo | null) => {
		dispatch(setSelectedFile(folder ?? null))
		setContentData([])
		setOffset(0)
	}, [dispatch])

	/* --- Content File --- */
	const readContentFile = useReadContentFileQuery({
		folder: selectedFolder?.name ?? "",
		filename: selectedFile?.name ?? "",
		offset: offset,
		count: limitedContent,
		search: "",
	}, {
		skip: !selectedFolder || !selectedFile,
		refetchOnMountOrArgChange: true,
	})
	const { data: readContentData, isLoading: readContentIsLoading, isError: readContentIsError, error: readContentError, refetch } = readContentFile


	const uploadContentFile = () => selectedFolder && selectedFile && refetch()

	useEffect(() => {
		if (readContentData?.result && readContentData.result.length > 0) {
			setContentData(prevData => [...prevData, ...readContentData.result]);
			setOffset(readContentData.newOffset);
		}
	}, [readContentData]);

	useEffect(() => {
		setContentData([]);
		setOffset(0);
	}, [selectedFolder, selectedFile, dateFile]);

	const statuses: DataTableFacetedFilterOptions[] = useMemo(() =>
		[...new Set(contentData.map(item => item.accion))]
			.map(item => ({
				value: item,
				label: item,
				icon: Workflow
			})), [contentData]);

	const statusesApiKey: DataTableFacetedFilterOptions[] = useMemo(() =>
		[...new Set(contentData.map(item => item.api_key || "apikey no definido"))]
			.map(item => ({
				value: item,
				label: item,
				icon: KeyIcon
			})), [contentData]);

	/* const contentFile: FetchState<ContentFile[]> = {
		data: readContentData?.result ?? [],
		isLoading: readContentIsLoading,
		hasError: !!readContentIsError,
		total: readContentData?.total ?? 0,
		error: readContentError ? (typeof readContentError === "string" ? readContentError : "Error al obtener el contenido") : undefined
	} */

	/* Accion filters */


	/* const loadMoreContent = useCallback(async () => {
		if (selectedFolder && selectedFile && !readContentIsLoading) {
			const result = await readContentFile.refetch();
			if (result.data) {
				const content = result.data.result
				setContentData(prevData => [...prevData, ...content]);
				setOffset(result.data.newOffset);
			}
		}
	}, [selectedFolder, selectedFile, readContentIsLoading, readContentFile]);
 */

	return {
		selectedFolder,
		folders,
		handleSelectedFolder,

		files,
		dateFile,
		selectedFile,
		datesFiles,
		handleSetDateFile,
		handleSelectedFile,

		contentFile: {
			data: contentData,
			isLoading: readContentIsLoading,
			hasError: !!readContentIsError,
			total: readContentData?.total ?? 0,
			error: readContentError ? (typeof readContentError === "string" ? readContentError : "Error al obtener el contenido") : undefined
		},
		statuses,
		statusesApiKey,
		uploadContentFile
		// loadMoreContent
	}
};
