import { cn } from "@/lib/utils";
import { Nav } from "../components";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { ChildrenProvider } from "@/shared";

export const DashBoardLayout = ({ children }: ChildrenProvider) => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout:dashboard=${JSON.stringify(
						sizes
					)}`
				}}
				className="flex min-h-screen w-full flex-col"
			>
				<ResizablePanel
					defaultSize={10}
					collapsible={true}
					minSize={10}
					maxSize={10}
					onCollapse={() => {
						setIsCollapsed(true)
						document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
							true
						)}`
					}}
					onResize={() => {
						setIsCollapsed(false)
						document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
							false
						)}`
					}}
					className={cn(
						"md:flex hidden min-w-[180px]",
						isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
					)}
				>
					<Nav isCollapsed={isCollapsed} />
				</ResizablePanel>
				<ResizableHandle withHandle  />
				<ResizablePanel
					className="flex flex-col sm:gap-4 sm:pl-7 pl-7 pt-4"
				>
					{children}
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	)
};
