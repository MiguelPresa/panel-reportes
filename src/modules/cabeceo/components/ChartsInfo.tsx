import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components//ui/card"
import { CardChart } from "./CardChart"
import { ChartsInfoType, ChartsInfoProps } from "../types"

export const description = "A collection of health charts."

export const ChartsCardInfo = ({ title, description, content }: ChartsInfoType) => {
	return (
		<Card className="max-w-xs" x-chunk="charts-01-chunk-2"				>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{
					content.length > 0 &&
					content.map(original => (
						original.max > 0 && <CardChart content={original} />
					))

				}
			</CardContent>
		</Card>
	)
};

export function ChartsInfo({ title, titleTwo, description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", content, verificador }: ChartsInfoProps) {
	return (
		<div className="flex lg:flex-col flex-row gap-4"			>
			<Card className="max-w-xs" x-chunk="charts-01-chunk-2"				>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{
						content.length > 0 &&
						content.map(original => (
							original.max > 0 && <CardChart key={original.max} content={original} />
						))

					}
				</CardContent>
			</Card>
			<Card className="max-w-xs" x-chunk="charts-01-chunk-2"				>
				<CardHeader>
					<CardTitle>{titleTwo}</CardTitle>
					<CardDescription>
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{
						verificador.length > 0 &&
						verificador.map(original => (
							original.max > 0 && <CardChart key={original.color} content={original} />
						))

					}
				</CardContent>
			</Card>
		</div>
	)
}
