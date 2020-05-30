export type Character = {
  completed: boolean;
  char: string;
};
export function transformChar(txt: string): Character[] {
  return txt.split("").map((s) => ({ char: s, completed: false }));
}
