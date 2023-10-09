import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function computeStartEndOfDate(date: Date) {
	const startOfDate = new Date(date);
	startOfDate.setHours(0, 0, 0, 0);
	const endOfDate = new Date(date);
	endOfDate.setHours(23, 59, 59, 999);
	return {
		startOfDate, endOfDate
	}
}
