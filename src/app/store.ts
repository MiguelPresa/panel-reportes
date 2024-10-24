import { configureStore } from "@reduxjs/toolkit"
import { themeSlice } from "./slices/theme/themeSlice"
import { cabeceoSlice } from "./slices/cabeceo/cabeceoSlice"
import { cabeceoApi } from "@/modules/cabeceo"

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		cabeceo: cabeceoSlice.reducer,
		[cabeceoApi.reducerPath]: cabeceoApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cabeceoApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch