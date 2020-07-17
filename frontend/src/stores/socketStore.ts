import { createContext } from "react";
import { observable } from "mobx";

class SocketStore {
  @observable
  socket: WebSocket | null = null;
}

export default createContext(new SocketStore());
