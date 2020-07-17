import { createContext } from "react";

class Countdown {
  interval: number | null = null;
  timer: number = 0;
}

export default createContext(new Countdown());
