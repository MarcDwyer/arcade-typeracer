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

export function wordsCalc(txt: string) {
  // txt = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  txt = txt.replace(/ +(?= )/g, "");

  let count = 1;
  for (const t of txt) {
    if (t === " ") count++;
  }
  return count;
}

/**
 * An array in the following order [hours, minutes, seconds]
 */
export type TimeResults = [number, number, number];

/**
 * @param {time}
 * Should be in milliseconds and should be the countdown from the future
 * @returns getTime returns the time in [hours, minutes, seconds]
 */
export const getTime = (futureTime: number): TimeResults | null => {
  const now = Date.now();
  if (now >= futureTime) {
    return null;
  }
  const distance = futureTime - now;

  // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return [0, minutes, seconds];
};

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
