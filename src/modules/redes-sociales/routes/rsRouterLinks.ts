import { NavItemsTypes } from "@/dashboard";
import { Logs, Users } from "lucide-react";

export const rsRouterLinks: NavItemsTypes[] = [
	{
		title: "Redes sociales",
		label: "",
		link: "/rs",
		icon: Users,
		variant: "ghost",
	},
	{
		title: "Logs redes sociales",
		label: "",
		link: "/rs/logs",
		icon: Logs,
		variant: "ghost",
	}
]
