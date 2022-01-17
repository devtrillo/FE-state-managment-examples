import { Store, StoreConfig } from "@datorama/akita";
import { Pokemon } from "types";

export interface StopwatchState {
  seconds: number;
  running: boolean;
  pokemon?: Pokemon;
}

export function createInitialState(): StopwatchState {
  return {
    running: false,
    seconds: 0,
  };
}

@StoreConfig({ name: "stopwatch" })
export class StopwatchStore extends Store<StopwatchState> {
  constructor() {
    super(createInitialState());
  }
}

export const stopwatchStore = new StopwatchStore();
