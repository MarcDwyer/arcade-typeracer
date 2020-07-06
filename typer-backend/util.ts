import { textData } from "./typing_data.ts";

export function randomTxt() {
  return textData[Math.floor(Math.random() * textData.length)];
}
