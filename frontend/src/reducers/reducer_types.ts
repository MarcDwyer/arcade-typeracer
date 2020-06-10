import { Character } from "../util";
import { Phases } from "../enums";

export type Countdown = {
  duration: number;
  countdown: number | null;
  interval: number | null;
};

export type TextData = {
  text: Character[] | null;
  wordCount: number;
  error: string | null;
  currIndex: number;
  value: string;
  wpm: number | null;
};

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];

export type Mode = "single" | "multi";

export type StatusState = {
  phase: PhaseTypes;
  mode: Mode | null;
};
