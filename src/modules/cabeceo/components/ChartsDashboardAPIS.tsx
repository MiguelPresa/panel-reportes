import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FetchStateReporte, ReporteModel } from '../types';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const transformData = (data: ReporteModel[]) => {
	return data.map(item => ({
		fecha: item.fecha,
		'resumen': item.resumen,
		'titulo': item.titulo,
		'tituloresumen': item.tituloResumen,
	}));
};

type ChartsDashboardProps = {
	data: FetchStateReporte
	title: string
}

export const ChartsDashboard = ({ data, title }: ChartsDashboardProps) => {
	const [activeTab, setActiveTab] = useState("original");
	const originalData = transformData(data.original);
	const verificadorData = transformData(data.verificador);

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
									<Bar dataKey="resumen" fill="hsl(var(--chart-1))" radius={4} />
									<Bar dataKey="titulo" fill="hsl(var(--chart-2))" radius={4} />
									<Bar dataKey="tituloresumen" fill="hsl(var(--chart-3))" radius={4} />
								</BarChart>
								{/* <AreaChart
									accessibilityLayer
									data={originalData}
									margin={{
										top: 10,
										right: 30,
										left: 50,
										bottom: 0,
									}}
								>
									<CartesianGrid strokeDasharray="2" horizontal={false} vertical={false} />
									<XAxis
										dataKey="fecha"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => value}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="line" />}
									/>
									<Tooltip />
									<Legend />
									<Area type="monotone" dataKey="Resumen" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
									<Area type="monotone" dataKey="Título" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
									<Area type="monotone" dataKey="Título y Resumen" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
								</AreaChart> */}
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
									<Bar dataKey="resumen" fill="hsl(var(--chart-1))" radius={4} />
									<Bar dataKey="titulo" fill="hsl(var(--chart-2))" radius={4} />
									<Bar dataKey="tituloresumen" fill="hsl(var(--chart-3))" radius={4} />
								</BarChart>

							</ChartContainer>
							{/* <AreaChart
								accessibilityLayer
								data={verificadorData}
								margin={{
									top: 2,
									right: 30,
									left: 0,
									bottom: 0,
								}}
							>
								<CartesianGrid strokeDasharray="2" />
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
									tickCount={3}
								/>
								<Tooltip />
								<Legend />
								<Area type="monotone" dataKey="Resumen" stackId="1" stroke="hsl(var(--chart-1)" fill="hsl(var(--chart-1))" />
								<Area type="monotone" dataKey="Título" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
								<Area type="monotone" dataKey="Título y Resumen" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
							</AreaChart> */}
						</ResponsiveContainer>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};