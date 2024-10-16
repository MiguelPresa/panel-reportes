import { LIMIT_CONTENT } from "@/config/configuration";
import { FileInfo, FolderInfo } from "@/modules/cabeceo";
import { dateFormat } from "@/shared";
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface LogsState {
	dateFile?: string
	selectedFolder: FolderInfo | null
	selectedFile: FileInfo | null
	startReached: boolean;
	limitedContent: number;
}

interface CabeceoState {
	cabeceo_logs: LogsState
}

const initialState: CabeceoState = {
	cabeceo_logs: {
		dateFile: dateFormat(new Date()),
		selectedFolder: null,
		selectedFile: null,
		startReached: false,
		limitedContent: LIMIT_CONTENT,
	}
};

export const cabeceoSlice = createSlice({
	name: "cabeceo",
	initialState,
	reducers: {
		setSelectedFolder: (state, action: PayloadAction<FolderInfo | null>) => {
			state.cabeceo_logs.selectedFolder = action.payload
		},
		/* PageLog */
		setDateFile: (state, action: PayloadAction<string | undefined>) => {
			state.cabeceo_logs.dateFile = action.payload
			state.cabeceo_logs.selectedFile = null
		},
		setSelectedFile: (state, action: PayloadAction<FileInfo | null>) => {
			state.cabeceo_logs.selectedFile = action.payload
		},
		/* setSelectedFile: (state, action: PayloadAction<FileInfo | null>) => {
			state.cabeceo_logs.selectedFile = action.payload
		}, */
		resetLogContent: (state) => {
			state.cabeceo_logs = initialState.cabeceo_logs
		},
	},
})

// Action creators are generated for each case reducer function
export const { setDateFile, setSelectedFolder, setSelectedFile, resetLogContent } = cabeceoSlice.actions

// export default cabeceoSlice.reducer