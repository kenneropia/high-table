import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ILocationObject } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateLocationArray(
  originalArray: ILocationObject[],
  location: string
): ILocationObject[] {
  if (!location || !location.length) return originalArray;
  let existingIndex = -1;

  // Check if location exists
  for (let i = 0; i < originalArray.length; i++) {
    if (originalArray[i].location.toLowerCase() === location.toLowerCase()) {
      existingIndex = i;
      break;
    }
  }

  if (existingIndex !== -1) {
    // Update existing object timestamp
    originalArray[existingIndex].timestamp = Date.now();
  } else {
    // Add new location object
    const updatedObject: ILocationObject = {
      timestamp: Date.now(),
      location,
    };
    originalArray.push(updatedObject);
  }

  originalArray.sort((a, b) => b.timestamp - a.timestamp);

  if (originalArray.length > 7) {
    originalArray.splice(7);
  }
  console.log(originalArray);
  return originalArray;
}
