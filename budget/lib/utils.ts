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

export interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

export function HSLColorToString(color: HSLColor) : string {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
}

export function generateColorPallet(colorsToGenerate : number, colorStart: HSLColor, colorShift?: HSLColor): HSLColor[] {
  
  const colorShifted = {hue: colorStart.hue, saturation: colorStart.saturation, lightness: colorStart.lightness};
  const colorShifter = colorShift ? colorShift :  {hue: -38, saturation: -2, lightness: -1};
  const generatedColors:HSLColor[] = [];

  for (let i = 0; i < colorsToGenerate; i++) {
    generatedColors.push({hue: colorShifted.hue, saturation: colorShifted.saturation, lightness: colorShifted.lightness});
    colorShifted.hue += colorShifter.hue;
    colorShifted.lightness += colorShifter.lightness;
    colorShifted.saturation += colorShifter.saturation;
  }

  return generatedColors;
}