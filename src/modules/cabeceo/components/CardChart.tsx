import { ChartContainer } from "@/components/ui/chart";
import { MaxContentDescription } from "../types/DashBoardTypes";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

type CardChartProps = {
	content: MaxContentDescription
}
export const CardChart = ({ content }: CardChartProps) => {
	return (
		<div className="grid auto-rows-min gap-2" key={content.description}>
			<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
				{content.max}
				<span className="text-sm font-normal text-muted-foreground">
					{content.description}
				</span>
			</div>
			<ChartContainer
				config={{
					steps: {
						label: "Steps",
						color: content.color,
					},
				}}
				className="aspect-auto h-[32px] w-full"
			>
				<BarChart
					accessibilityLayer
					layout="vertical"
					margin={{
						left: 0,
						top: 0,
						right: 0,
						bottom: 0,
					}}
					data={[
						{
							date: content.fecha,
							steps: content.max,
						},
					]}
				>
					<Bar
						dataKey="steps"
						fill="var(--color-steps)"
						radius={4}
						barSize={32}
					>
						<LabelList
							position="insideLeft"
							dataKey="date"
							offset={8}
							fontSize={12}
							fill="white"
						/>
					</Bar>
					<YAxis dataKey="date" type="category" tickCount={1} hide />
					<XAxis dataKey="steps" type="number" hide />
				</BarChart>
			</ChartContainer>
		</div>
	)
};
