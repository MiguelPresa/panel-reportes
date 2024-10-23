import { useState } from 'react';
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiKeyFormat} from '../../types';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


type ChartsDashboardProps = {
	original: ApiKeyFormat
	verify: ApiKeyFormat
	title: string
	color?: string
}

export const BarChartHorizontalProyects = ({ original, verify, title, color = "hsl(var(--chart-1))" }: ChartsDashboardProps) => {
	const [activeTab, setActiveTab] = useState("original");
	const originalData = original.reporte;
	const verificadorData = verify.reporte;

	if (originalData.length === 0 && verificadorData.length === 0) return

	const chartConfig = {
		total: {
			label: "Numero de notas: ",
			color: color
		}
	} satisfies ChartConfig

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					Comparación entre datos de cada proyecto <br />{original.apikey} - {verify.apikey}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList>
						<TabsTrigger value="original">{original.proyecto}</TabsTrigger>
						<TabsTrigger value="verificador">{verify.proyecto}</TabsTrigger>
					</TabsList>
					<TabsContent value="original">
						<ResponsiveContainer width="100%" height={400}>
							<ChartContainer config={chartConfig}>
								<BarChart
									accessibilityLayer
									data={originalData}
									layout="vertical"
									margin={{
										left: 20,
									}}
								>
									<XAxis type="number" dataKey="total" />
									<YAxis
										dataKey="fecha"
										type="category"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="line" />}
									/>
									<Bar dataKey="total" fill={`var(--color-total)`} radius={5} >
										<LabelList
											position="right"
											offset={8}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
								</BarChart>
							</ChartContainer>
						</ResponsiveContainer>
					</TabsContent>
					<TabsContent value="verificador">
						<ResponsiveContainer width="100%" height={400}>
							<ChartContainer config={chartConfig}>
								<BarChart
									accessibilityLayer
									data={verificadorData}
									layout="vertical"
									margin={{
										left: 20,
									}}
								>
									<XAxis type="number" dataKey="total" />
									<YAxis
										dataKey="fecha"
										type="category"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="line" />}
									/>
									<Bar dataKey="total" fill={`var(--color-total)`} radius={5} >
										<LabelList
											position="right"
											offset={8}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
								</BarChart>
							</ChartContainer>
						</ResponsiveContainer>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card >
	);
};