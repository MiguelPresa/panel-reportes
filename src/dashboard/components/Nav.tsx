// import { Home, LineChart, LucideIcon, Package, ShoppingCart, Users2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { cabeceoRouterLinks } from "@/modules/cabeceo"
import { NavItems } from "./NavItems"
import { rsRouterLinks } from "@/modules/redes-sociales"
import { ThemeToggle } from "@/modules/themes"
import { useLocation } from "react-router-dom"

interface NavProps {
	isCollapsed: boolean
}


export function Nav({ isCollapsed }: NavProps) {
	const location = useLocation()
	return (
		<aside
			data-collapsed={false}
			// className="h-svh inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
			className="h-full group flex flex-col gap-4 py-0 data-[collapsed=true]:py-0"
		>
			{/* <nav className="flex flex-col items-center gap-4 px-2 sm:py-4"> */}
			<nav className="grid px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 gap-4 py-4">
				{
					cabeceoRouterLinks.map(link => (
						<NavItems
							key={link.title}
							isCollapse={isCollapsed}
							Icon={link.icon}
							title={link.title}
							variant={location.pathname === link.link ? "default" : link.variant}
							label={link.label}
							link={link.link}
						/>
					))
				}
			</nav>
			<Separator />
			<nav className="grid px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 gap-4 py-4">
				{
					rsRouterLinks.map(link => (
						<NavItems
							key={link.title}
							isCollapse={isCollapsed}
							Icon={link.icon}
							title={link.title}
							variant={location.pathname === link.link ? "default" : link.variant}
							label={link.label}
							link={link.link}
						/>
					))
				}
			</nav>

			<nav className="mt-auto grid px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 gap-4 sm:py-4">
				{
					isCollapsed ?
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<ThemeToggle />
								</TooltipTrigger>
								<TooltipContent side="right">Theme</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						:
						<div
							className={
								cn(
									"text-muted-foreground",
									buttonVariants({ variant: "ghost", size: "sm" }),
									"justify-start"
								)
							}
						>
							<ThemeToggle />
							&nbsp; Theme
						</ div>

				}
			</nav>
		</aside>
	)
}