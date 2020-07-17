import { Phases } from "../enums";
import { createContext } from "react";

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];

const Phase: PhaseTypes = Phases.waiting;

export default createContext(Phase);
