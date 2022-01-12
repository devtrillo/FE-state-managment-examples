import { Pokemon } from "types";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { POKE_API_URL } from "ui";

type StopwatchEvent = { type: "TOGGLE" } | { type: "TICK" };
type StopwatchContext = {
  seconds: number;
  pokemons: Pokemon;
};

const stopwatchMachine = createMachine<StopwatchContext, StopwatchEvent>({
  id: "stopwatchMachine",
  initial: "stopped",
  context: {
    seconds: 0,
    pokemons: undefined,
  },
  states: {
    stopped: {
      on: {
        TOGGLE: "started",
      },
    },
    started: {
      on: {
        TOGGLE: "stopped",
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
      },
      invoke: {
        src: () => (cb) => {
          const interval = setInterval(() => cb("TICK"), 100);
          return () => {
            clearInterval(interval);
          };
        },
      },
    },
  },
});

interface GlobalState extends StopwatchContext {
  running: boolean;
  onToggle: () => void;
}

export const useMachineState = (): GlobalState => {
  const [state, send] = useMachine(stopwatchMachine);
  return {
    onToggle: () => send("TOGGLE"),
    ...state.context,
    running: state.value !== "stopped",
  };
};
