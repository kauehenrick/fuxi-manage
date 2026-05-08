import type { FilterFn } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const normalizeString = (value: string) => {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
};

export const includesString: FilterFn<any> = (row, columnId, filterValue) => {
	const value = row.getValue<string>(columnId);

	return normalizeString(value).includes(normalizeString(String(filterValue)));
};
