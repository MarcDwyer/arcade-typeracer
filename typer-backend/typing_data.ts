/**
 * @typeParam time should be the amount of seconds required to complete typing session 
 */
export type TextData = {
  name: string;
  text: string;
  time: number;
};

export const textData: TextData[] = [
  {
    name: "tutorial",
    text:
      "Hello, I am Marc, and I am a master gamer. I own noobs in online video games and stuff. Be afraid.",
    time: 65,
  },
  {
    name: "john_wick",
    text:
      "A fourteen million dollar bounty on his head, and every interested party in the city wants a piece of it, i'd say the odds are about even.",
    time: 85,
  },
  {
    name: "lao_tzu",
    text:
      "Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.",
    time: 120,
  },
  {
    name: "its me",
    text:
      "Apple bottom jeans boots with the fur and the whole club is looking at her",
    time: 60,
  },
];
