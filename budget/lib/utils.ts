import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSubPath(path: string, parentPath: string): boolean {
  const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
  const normalizedParentPath = parentPath.replace(/\\/g, '/').toLowerCase();
  return normalizedPath.startsWith(normalizedParentPath + '/') || normalizedPath === normalizedParentPath;
}

export function daysInMonth(month: number, year: number): number {
  const daysInMonths = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) 
  ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonths[month - 1];
}