import { useState, useEffect } from "react";
import { POKE_API_URL } from "ui";
import { Pokemon } from "types";
import { createGlobalState } from "react-hooks-global-state";

interface GlobalState {
  onToggle: () => void;
  pokemons: Pokemon;
  running: boolean;
  seconds: number;
}
const { useGlobalState } = createGlobalState<GlobalState>({
  seconds: 0,
  running: false,
  onToggle: () => {},
  pokemons: undefined,
});

export const useSeconds = () => useGlobalState("seconds");
export const useRunning = () => useGlobalState("running");
export const usePokemons = () => useGlobalState("pokemons");

export const useStopWatch = () => {
  const [seconds, setSeconds] = useSeconds();
  const [running] = useRunning();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  const [, setPokemons] = usePokemons();
  useEffect(() => {
    if (seconds > 2) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => setPokemons(data?.results));
    }
  }, [seconds > 2]);
};
