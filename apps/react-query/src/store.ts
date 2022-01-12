import { useState, useEffect } from "react";
import { POKE_API_URL } from "ui";
import { Pokemon } from "types";
import { useQuery } from "react-query";

interface GlobalState {
  onToggle: () => void;
  pokemons: Pokemon;
  running: boolean;
  seconds: number;
}

export const useGlobalState = (): GlobalState => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const { data: pokemons } = useQuery<Pokemon>(
    "pokemons",
    () =>
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => data?.results),
    {
      enabled: seconds > 2,
    }
  );

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  return {
    seconds,
    running,
    onToggle: () => setRunning((running) => !running),
    pokemons,
  };
};
