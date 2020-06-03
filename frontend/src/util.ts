export type Character = {
  completed: boolean;
  char: string;
};

export function transformChar(txt: string): Character[] {
  return txt.split("").map((s) => ({ char: s, completed: false }));
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

  const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ),
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return [hours, minutes, seconds];
};
