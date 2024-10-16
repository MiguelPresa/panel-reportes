import { createInitialFetchState, FetchState } from "@/shared"
import { ContentInfo, FileInfo, FolderInfo } from "../types"

export const INITIAL_FOLDERS: FetchState<FolderInfo[]> = createInitialFetchState<FolderInfo[]>([])
export const INITIAL_FILES: FetchState<FileInfo[]> = createInitialFetchState<FileInfo[]>([])
export const INITIAL_CONTENT: FetchState<ContentInfo> = createInitialFetchState<ContentInfo>({
	logs: [],
	newOffset: 0
})