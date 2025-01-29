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

export function HSLColorToString(color: HSLColor): string {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
}

export function generateColorPallet(colorsToGenerate: number, colorStart: HSLColor, colorShift?: HSLColor): HSLColor[] {

  const colorShifted = { hue: colorStart.hue, saturation: colorStart.saturation, lightness: colorStart.lightness };
  const colorShifter = colorShift ? colorShift : { hue: -25, saturation: -5, lightness: -2 };
  const generatedColors: HSLColor[] = [];

  // Add predefined color sequence
  generatedColors.push({ hue: 134, saturation: 55, lightness: 41 });   // #41afaa
  generatedColors.push({ hue: 302, saturation: 35, lightness: 45 });   // #af4b91
  generatedColors.push({ hue: 227, saturation: 45, lightness: 52 });   // #466eb4
  generatedColors.push({ hue: 41, saturation: 100, lightness: 52 });   // #e6a532
  generatedColors.push({ hue: 204, saturation: 100, lightness: 44 });  // #00a0e1
  generatedColors.push({ hue: 14, saturation: 63, lightness: 50 });    // #d7642c

  if (colorsToGenerate-6 > 0) {
    for (let i = 0; i < colorsToGenerate-6; i++) {
      generatedColors.push({ hue: colorShifted.hue, saturation: colorShifted.saturation, lightness: colorShifted.lightness });
      colorShifted.hue += colorShifter.hue;
      colorShifted.lightness += colorShifter.lightness;
      colorShifted.saturation += colorShifter.saturation;
    }
  }

  return generatedColors;
}