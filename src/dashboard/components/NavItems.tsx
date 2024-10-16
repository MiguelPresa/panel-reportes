import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Home, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface NavItemsProps {
	isCollapse: boolean
	title: string
	label?: string
	Icon: LucideIcon
	variant: "default" | "ghost"
	link: string
}

export const NavItems = ({ isCollapse = false, title = "Default", label = "", Icon = Home, variant = "default", link = "/" }: NavItemsProps) => {
	return (
		isCollapse ?
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						to={link}
						className={cn(
							"flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
							buttonVariants({ variant: variant, size: "icon" }),
							variant === "default" &&
							"dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
						)}
					>
						<Icon className="h-5 w-5" />
						<span className="sr-only">{title}</span>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="right">{title}</TooltipContent>
			</Tooltip>
			:
			<Link
				to={link}
				className={
					cn(
						"text-muted-foreground",
						buttonVariants({ variant: variant, size: "sm" }),
						variant === "default" &&
						"dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
						"justify-start"
					)
				}
			>
				<Icon className="h-5 w-5" />
				&nbsp; {title}
				{
					label && (
						<span
							className={cn(
								"ml-auto",
								variant === "default" &&
								"text-background dark:text-white"
							)}
						>
							{label}
						</span>
					)
				}
			</Link >
	)
};
