import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function copyToClipBoard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

export function calculatePercentage(value1: string, value2: string) {
  try {
    if (!value1 || !value2) return null;
    return (parseFloat(value1) / parseFloat(value2)) * 100;
  } catch (err) {
    console.log(err);
    return null;
  }
}
