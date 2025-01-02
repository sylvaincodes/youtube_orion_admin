import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const slugString = (name: string) => {
  let url = "";
  url = name
    .trim()
    .replaceAll(" ", "-")
    .replaceAll(/[éçà`"è'^(-)&~!@#$%_|:\/?=;,<>{}]/gi, "")
    .toLowerCase();

  return url;
};
