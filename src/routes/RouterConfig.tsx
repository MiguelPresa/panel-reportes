import { RouteObject } from "react-router-dom";
import { ErrorPage } from "@/dashboard/pages/ErrorPage";
import { DashBoardPage } from "@/dashboard/pages/DashBoardPage";
import { RedesSocialesPage } from "@/modules/redes-sociales/page/RedesSocialesPage";
import { RedesSocialesLogs } from "@/modules/redes-sociales/page/RedesSocialesLogs";
import { CabeceoLogs, CabeceoDashboard } from "@/modules/cabeceo/Page";

export const RouterConfig: RouteObject[] = [
	{
		path: "/",
		element: <DashBoardPage />,
		children: [
			{
				index: true,
				path: "/",
				element: <CabeceoDashboard />
			},
			{
				path: "/cabeceo",
				element: <CabeceoDashboard />
			},
			{
				path: "/cabeceo/logs",
				element: <CabeceoLogs />
			},
			{
				path: "/rs",
				element: <RedesSocialesPage />
			},
			{
				path: "/rs/logs",
				element: <RedesSocialesLogs />
			},
		],
		errorElement: <ErrorPage />
	},
]