import { useEffect } from "react";
import { POKE_API_URL } from "ui";
import { Pokemon } from "types";
import createStore from "teaful";

type Store = {
  stopwatch: {
    seconds: number;
    running: boolean;
  };
  pokemons: Pokemon;
};

export const { useStore } = createStore<Store>({
  stopwatch: { seconds: 0, running: false },
  pokemons: undefined,
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
  }, [running]);

  const [, setPokemons] = useStore.pokemons();
  useEffect(() => {
    if (seconds > 2) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => setPokemons(data?.results));
    }
  }, [seconds > 2]);
};
