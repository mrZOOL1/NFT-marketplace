import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TooManyDecimals = function (text: string): boolean {

  if (text.includes('.')) {

    const index = text.indexOf(".");
    text = text.slice(index + 1);

    if (text.length <= 2) {
      return false;
    } else {
      return true;
    }

  } else {
    return false;
  }
}