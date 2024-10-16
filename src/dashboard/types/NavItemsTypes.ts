import { LucideIcon } from "lucide-react"

export interface NavItemsTypes {
	title: string
	label?: string
	icon: LucideIcon
	variant: "default" | "ghost"
	link: string
}