import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FetchStateReporte } from '../../types';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { transformData } from '../../helpers';

type BarChartMultipleModelsProps = {
	data: FetchStateReporte
	title: string
}

const chartConfig = {
	Resumen: {
		label: "Resumen",
		color: "hsl(var(--chart-1))",
	},
	Titulo: {
		label: "Titulo",
		color: "hsl(var(--chart-2))",
	},
	TítuloResumen: {
		label: "Título y Resumen",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig

export const BarChartMultipleModels = ({ data, title }: BarChartMultipleModelsProps) => {
	const [activeTab, setActiveTab] = useState("original");
	const originalData = transformData(data.original);
	const verificadorData = transformData(data.verificador);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					Comparación entre datos originales y verificador
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList>
						<TabsTrigger value="original">Original</TabsTrigger>
						<TabsTrigger value="verificador">Verificador</TabsTrigger>
					</TabsList>
					<TabsContent value="original">
						<ResponsiveContainer width="100%" height={400}>
							<ChartContainer config={chartConfig}>
								<BarChart accessibilityLayer data={originalData}>
									<CartesianGrid strokeDasharray="2" horizontal={true} vertical={true} />
									<XAxis
										dataKey="fecha"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => value}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickCount={5}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="line" />}
									/>
									<Tooltip />
									<Bar dataKey="resumen" fill="hsl(var(--chart-1))" radius={4} >
										<LabelList
											position="top"
											offset={8}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
									<Bar dataKey="titulo" fill="hsl(var(--chart-2))" radius={4} >
										<LabelList
											position="top"
											offset={8}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
									<Bar dataKey="tituloresumen" fill="hsl(var(--chart-3))" radius={4} >
										<LabelList
											position="top"
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
								<BarChart accessibilityLayer data={verificadorData}>
									<CartesianGrid strokeDasharray="2" horizontal={true} vertical={false} />
									<XAxis
										dataKey="fecha"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => value}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickCount={5}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="line" />}
									/>
									<Tooltip />
									<Bar dataKey="resumen" fill="hsl(var(--chart-1))" radius={4} >
										<LabelList
											position="top"
											offset={8}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
									<Bar dataKey="titulo" fill="hsl(var(--chart-2))" radius={4} >
										<LabelList
											position="top"
											offset={8}
											className="fill-foreground"
											fontSize={12}
										/>
									</Bar>
									<Bar dataKey="tituloresumen" fill="hsl(var(--chart-3))" radius={4} >
										<LabelList
											position="top"
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
		</Card>
	);
};