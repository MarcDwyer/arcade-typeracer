import { Character } from "../util";

export type TData = {
  index: number;
  error: boolean;
  value: string;
  text: Character[] | null;
};

export type Action = {
  payload?: any;
  type: Symbol;
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol();

function TypingReducer(state: TData, { type, payload }: Action) {
  switch (type) {
    case INC_INDEX:
      if (!state.text) return state;
      const text = [...state.text];
      text[state.index].completed = true;
      return {
        error: false,
        index: state.index + 1,
        value: state.value + payload,
        text,
      };
    case SET_ERROR:
      return { ...state, error: true };
    case SET_TYPING:
      console.log(payload);
      return { ...state, text: payload as Character[] };
    default:
      return state;
  }
}

export default TypingReducer;
