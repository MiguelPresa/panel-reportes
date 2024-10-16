import { format, parseISO } from "date-fns";

export const dateFormat = (date: Date | undefined) => {
	if(!date) return ""
	return format(date, "yyyy-MM-dd")
};

export const formatStringToDate = (date: string) => {
	return parseISO(date)
};