import { createContext } from "react";
import { observable } from "mobx";

class MError {
  @observable
  error: string | null = null;
}

export default createContext(new MError());
