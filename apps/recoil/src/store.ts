import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

const pokeListValueAtom = atom<Pokemon>({
  default: [],
  key: "pokeList",
});

export const secondsAtom = atom({ default: 0, key: "seconds" });

export const PokeListAtom = selector({
  get: ({ get }) => (get(secondsAtom) > 2.0 ? get(pokeListValueAtom) : ""),
  key: "PokeListAtom",
});

export const runningAtom = atom({ default: false, key: "running" });

export const useStopwatch = () => {
  const [seconds, setSeconds] = useRecoilState(secondsAtom);
  const [pokelist, setPokeList] = useRecoilState(pokeListValueAtom);
  const running = useRecoilValue(runningAtom);

  useEffect(() => {
    if (seconds > 2 && pokelist?.length === 0) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then(({ results }) => setPokeList(results));
    }
  }, [seconds, setPokeList, pokelist]);

  useEffect(() => {
    if (running) {
      const interval = window.setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [running, setSeconds]);
};
