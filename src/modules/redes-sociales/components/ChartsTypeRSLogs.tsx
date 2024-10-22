import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Acciones por tipo de red social";

const chartConfig = {
  actions: {
    label: "Cantidad de Usuarios",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-1))",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-2))",
  },
  tiktok: {
    label: "TikTok",
    color: "hsl(var(--chart-3))",
  },
};

export function ChartsTypeRSLogs() {
  const [chartData, setChartData] = useState([]);

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

        const groupedData = data.reduce((acc, log) => {
          const socialMedia = log.socialmedia.controller;
          if (!acc[socialMedia]) {
            acc[socialMedia] = 0;
          }
          acc[socialMedia] += 1;
          return acc;
        }, {});

        const formattedChartData = Object.keys(groupedData).map((key) => {
          const socialmediaKey = key?.toLowerCase?.();
          return {
            socialmedia: key || "Desconocido",
            actions: groupedData[key],
            fill: chartConfig[socialmediaKey]?.color || "hsl(0, 0%, 70%)",
          };
        });

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
        <CardTitle>Cantidad por Tipo de Red Social</CardTitle>
        <CardDescription>Lorem, ipsum dolor.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              top: 20,
              left: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="socialmedia"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value.toLowerCase()]?.label || value
              }
            />
            <XAxis dataKey="actions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="actions" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </CardFooter>
    </Card>
  );
}
