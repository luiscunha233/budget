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