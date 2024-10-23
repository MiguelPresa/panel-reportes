import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components//ui/card"
import { OnlyBarChart } from "./OnlyBarChart"
import { MaxContentDescription } from "../../types"

export interface ChartsCardInfoProps {
	title: string,
	titleTwo: string,
	description?: string
	content: MaxContentDescription[]
	verificador: MaxContentDescription[]
}


export const ChartsCardInfo = ({ title, description, content }: ChartsCardInfoProps) => {
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
						original.max > 0 && <OnlyBarChart content={original} />
					))

				}
			</CardContent>
		</Card>
	)
};

export interface CardsBarMixInfoModelsProps extends ChartsCardInfoProps {
	verificador: MaxContentDescription[]
}

export function CardsBarMixedInfoModels({ title, titleTwo, description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", content, verificador }: CardsBarMixInfoModelsProps) {
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
							original.max > 0 && <OnlyBarChart key={original.max} content={original} />
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
							original.max > 0 && <OnlyBarChart key={original.color} content={original} />
						))

					}
				</CardContent>
			</Card>
		</div>
	)
}
