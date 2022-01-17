import { useEffect } from "react";
import createStore from "teaful";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

type Store = {
  stopwatch: {
    seconds: number;
    running: boolean;
  };
  pokemons: Pokemon;
};

export const { useStore } = createStore<Store>({
  pokemons: undefined,
  stopwatch: { running: false, seconds: 0 },
});

export const useStopwatch = () => {
  const [seconds, setSeconds] = useStore.stopwatch.seconds();
  const [running] = useStore.stopwatch.running();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running, setSeconds]);

  const [, setPokemons] = useStore.pokemons();
  useEffect(() => {
    if (seconds > 2) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => setPokemons(data?.results));
    }
  }, [seconds, setPokemons]);
};
