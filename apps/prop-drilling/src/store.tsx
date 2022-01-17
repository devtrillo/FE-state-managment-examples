import { useEffect, useState } from "react";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

interface GlobalState {
  onToggle: () => void;
  onReset: () => void;
  pokemons: Pokemon;
  running: boolean;
  seconds: number;
}

export const useGlobalState = (): GlobalState => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon>();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  useEffect(() => {
    if (seconds > 2) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => setPokemons(data?.results));
    }
  }, [seconds]);

  return {
    onReset: () => {
      setRunning(false);
      setSeconds(0);
    },
    onToggle: () => setRunning((running) => !running),
    pokemons,
    running,
    seconds,
  };
};
