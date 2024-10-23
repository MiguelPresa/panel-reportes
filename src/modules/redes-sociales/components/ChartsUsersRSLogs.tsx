"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Colores para las diferentes porciones del gráfico
const COLORS = ["#00C49F", "#FF8042", "#FFBB28"]; // Agrega más colores si tienes más usuarios

export function ChartsUsersRSLogs() {
  const [chartData, setChartData] = useState([
    { name: "Wendy Ramosinn", value: 0 },
    { name: "Miguel Presa", value: 0 },
    { name: "Other", value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Datos simulados, puedes cambiar esto para usar tus propios datos
        const data = [
          { user: { username: "wendy_ramosinn" }, actions: 12 },
          { user: { username: "miguel_presa" }, actions: 8 },
          { user: { username: "other" }, actions: 4 },
        ];

        // Agrupar y contar acciones por usuario
        const groupedData = data.reduce((acc, log) => {
          const username = log.user.username.replace(".", "_").toLowerCase();
          if (!acc[username]) {
            acc[username] = 0;
          }
          acc[username] += log.actions;
          return acc;
        }, {});

        // Formatear los datos para el gráfico
        const formattedChartData = Object.keys(groupedData).map((key) => ({
          name: key,
          value: groupedData[key],
        }));

        setChartData(formattedChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Acciones por Usuario</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Resumen de acciones por usuario <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Basado en la actividad de los últimos 6 meses
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
