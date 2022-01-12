import { MouseEvent, useState, useEffect } from "react";
import { POKE_API_URL } from "ui";
import { Pokemon } from "types";

interface GlobalState {
  onToggle: () => void;
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
  }, [seconds > 2]);

  return {
    seconds,
    running,
    onToggle: () => setRunning((running) => !running),
    pokemons,
  };
};
