import { KeysOriginal, KeysVerify } from "../types";

export const proyects: { original: KeysOriginal, verificador: KeysVerify, color: string }[] = [
	{
		original: "KEY_OPENAI_CAB_GEN_ENTREVISTA",
		verificador: "KEY_OPENAI_CAB_VER_ENTREVISTA",
		color: "hsl(var(--chart-1))"
	},
	{
		original: "KEY_OPENAI_CAB",
		verificador: "KEY_OPENAI_CAB_VER_NOTA",
		color: "hsl(var(--chart-2))"
	},
	{
		original: "KEY_OPENAI_CAB_GEN_OPINION",
		verificador: "KEY_OPENAI_CAB_VER_OPINION",
		color: "hsl(var(--chart-3))"
	},
	{
		original: "KEY_OPENAI_CAB_TEASER",
		verificador: "KEY_OPENAI_CAB_VER",
		color: "hsl(var(--chart-4))"
	},
	{
		original: "CAB_RES_CONFERENCIA",
		verificador: "CAB_VER_CONFERENCIA",
		color: "hsl(var(--chart-1))"
	},
	{
		original: "CAB_RES_PERIODICOS",
		verificador: "CAB_VER_PERIODICOS",
		color: "hsl(var(--chart-2))"
	},
]