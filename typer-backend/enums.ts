export enum PayloadTypes {
  singleTypingText = "singletypingtext",
  joinRoom = "joinroom",
  roomData = "roomdata",
}

export enum SingleTypes {
  typing_text = "singletypingtext",
}

export enum Phases {
  waiting = "waiting",
  loaded = "loaded",
  countdown = "countdown",
  typing = "typing",
  complete = "complete",
}

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];
