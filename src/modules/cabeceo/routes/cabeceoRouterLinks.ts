import { NavItemsTypes } from "@/dashboard";
import { Home, Logs, Settings } from "lucide-react";

export const cabeceoRouterLinks: NavItemsTypes[] = [
	{
		title: "Dashboard cabeceo",
		label: "",
		link: "/",
		icon: Home,
		variant: "ghost",
	},
	{
		title: "Logs cabeceo",
		label: "",
		link: "/cabeceo/logs",
		icon: Logs,
		variant: "ghost",
	},
	{
		title: "setting cabeceo",
		label: "",
		link: "#",
		icon: Settings,
		variant: "ghost",
	},
]
