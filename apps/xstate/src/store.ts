import { useMachine } from "@xstate/react";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";
import { createMachine } from "xstate";

type StopwatchEvent = { type: "TOGGLE" } | { type: "TICK" } | { type: "RESET" };
type StopwatchContext = {
  seconds: number;
  pokemons: Pokemon;
};

const stopwatchMachine = createMachine<StopwatchContext, StopwatchEvent>({
  context: {
    pokemons: undefined,
    seconds: 0,
  },
  id: "stopwatchMachine",
  initial: "stopped",
  states: {
    started: {
      invoke: {
        src: () => (cb) => {
          const interval = setInterval(() => cb("TICK"), 100);
          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        TICK: {
          actions: (context) => {
            context.seconds += 0.1;
            if (context.seconds > 2 && !context.pokemons) {
              fetch(POKE_API_URL)
                .then((res) => res.json())
                .then((data) => (context.pokemons = data?.results));
            }
          },
        },
        TOGGLE: "stopped",
      },
    },
    stopped: {
      on: {
        RESET: {
          actions: (context) => {
            context.seconds = 0;
          },
        },
        TOGGLE: "started",
      },
    },
  },
});

interface GlobalState extends StopwatchContext {
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const useMachineState = (): GlobalState => {
  const [state, send] = useMachine(stopwatchMachine);
  return {
    onReset: () => send("RESET"),
    onToggle: () => send("TOGGLE"),
    ...state.context,
    running: state.value !== "stopped",
  };
};
