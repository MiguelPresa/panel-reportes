import { BASENAME } from "@/config/configuration"
import { ThemeProvider } from "@/modules/themes/context/ThemeProvider"
import { RouterConfig } from "@/routes/RouterConfig"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(RouterConfig, { basename: BASENAME })

export const AppRouter = () => {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	)
}