import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FetchStateReporte, ReporteModel } from '../types';


const transformData = (data: ReporteModel[]) => {
	return data.map(item => ({
		fecha: item.fecha,
		'Resumen': item.resumen,
		'Título': item.titulo,
		'Título y Resumen': item.tituloResumen,
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
							<AreaChart
								accessibilityLayer
								data={originalData}
								margin={{
									top: 10,
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
								{/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}
								<Tooltip />
								<Legend />
								<Area type="monotone" dataKey="Resumen" stackId="1" stroke="hsl(var(--chart-1)" fill="hsl(var(--chart-1))" />
								<Area type="monotone" dataKey="Título" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
								<Area type="monotone" dataKey="Título y Resumen" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
							</AreaChart>
						</ResponsiveContainer>
					</TabsContent>
					<TabsContent value="verificador">
						<ResponsiveContainer width="100%" height={400}>
							<AreaChart
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
								{/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}
								<Tooltip />
								<Legend />
								<Area type="monotone" dataKey="Resumen" stackId="1" stroke="hsl(var(--chart-1)" fill="hsl(var(--chart-1))" />
								<Area type="monotone" dataKey="Título" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
								<Area type="monotone" dataKey="Título y Resumen" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
							</AreaChart>
						</ResponsiveContainer>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};