import { Theme } from "@/modules/themes/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ThemeState {
	theme: Theme
}
const storageKey = "vite-ui-theme";

const initialState: ThemeState = {
	theme: (localStorage.getItem(storageKey) as Theme) || "system",
};


export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload
			localStorage.setItem(storageKey, action.payload)
		}
	},
})

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions

// export default themeSlice.reducer