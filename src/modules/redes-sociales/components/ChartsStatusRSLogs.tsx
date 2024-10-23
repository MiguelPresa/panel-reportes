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

export const description = "A pie chart showing Active/Inactive statuses";

// Colores para las porciones del gráfico
const COLORS = ["#00C49F", "#FF8042"]; // Color para activo e inactivo respectivamente

export function ChartsStatusRSLogs() {
  const [chartData, setChartData] = useState([
    { name: "Activo", value: 0 },
    { name: "Inactivo", value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/panel-reportes/data.json", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }

        const data = await response.json();

        // Contar los estados activos e inactivos
        const activeCount = data.filter((item) => item.socialmedia.active).length;
        const inactiveCount = data.length - activeCount;

        // Actualizar los datos del gráfico
        setChartData([
          { name: "Activo", value: activeCount },
          { name: "Inactivo", value: inactiveCount },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Chart</CardTitle>
        <CardDescription>Tracking Active/Inactive statuses</CardDescription>
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
              Status changes overview <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Based on the latest social media activity
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
