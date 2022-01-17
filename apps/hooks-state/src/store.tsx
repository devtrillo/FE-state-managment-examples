import { createState, useState } from "@hookstate/core";
import { useEffect } from "react";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

export const seconds = createState(0);
export const running = createState(false);
export const pokemons = createState<Pokemon>(undefined);

export const useStopwatch = () => {
  const secondsState = useState(seconds);
  const runningState = useState(running);

  useEffect(() => {
    if (runningState.get()) {
      const timer = setInterval(() => {
        secondsState.set((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [runningState.get()]);

  useEffect(() => {
    if (secondsState.get() > 2) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => pokemons.set(data?.results));
    }
  }, [secondsState.get() > 2]);
};
