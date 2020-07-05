import { RouteModes } from "./enums";

export type Character = {
  char: string;
  completed: boolean;
};

export function transformChar(txt: string): Character[] {
  const result: Character[] = [];

  for (let x = 0; x < txt.length; x++) {
    const char = {
      char: txt[x],
      completed: false,
    };
    result.push(char);
  }
  return result;
}

/**
 *
 * @param route Is the params given to ModeHandler
 * @returns a boolean that returns true if route is valid
 */
export function validRouteMode(route: string): boolean {
  let isValid = false;

  for (const mode of Object.values(RouteModes)) {
    if (mode === route) {
      isValid = true;
      break;
    }
  }
  return isValid;
}

export const roundTenth = (num: number, places: number = 2) => {
  const multi = Math.pow(10, places);
  return Math.round(num * multi) / multi;
};

/**
 * 
 * @param totalChar the total amount of characters typed, even spaces.
 * @param time should be the amount of time spent typing 
 */
export function calcWpm(totalChar: number, seconds: number) {
  const minutes = seconds / 60;
  return roundTenth((totalChar / 5) / minutes);
}

export function getProgress(totalChar: number, currChar: number) {
  return roundTenth((currChar / totalChar) * 100);
}

export const isDev = () => process.env.NODE_ENV === "development";
