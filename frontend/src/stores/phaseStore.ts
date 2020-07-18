import { Phases } from "../enums";

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];

export default class Phase {
  phase: PhaseTypes = Phases.waiting;
}
