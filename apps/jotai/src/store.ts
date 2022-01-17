import { atom } from "jotai";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

export const pokeAtom = atom<Pokemon>(undefined);
export const secondsAtom = atom(0);
const timerRefAtom = atom<number | undefined>(undefined);

const incrementSecondsAtom = atom(
  (get) => get(secondsAtom),
  async (get, set, amount: number) => {
    set(secondsAtom, get(secondsAtom) + amount);

    if (get(secondsAtom) > 2 && !get(pokeAtom)) {
      const data = await fetch(POKE_API_URL).then((res) => res.json());

      set(pokeAtom, data?.results);
    }
  }
);
export const runningAtom = atom(
  (get) => get(timerRefAtom) !== undefined,
  (get, set, start: boolean) => {
    if (get(timerRefAtom) !== undefined) {
      clearInterval(get(timerRefAtom));
      set(timerRefAtom, undefined);
    }

    if (start) {
      set(
        timerRefAtom,
        window.setInterval(() => {
          set(incrementSecondsAtom, 0.1);
        }, 100)
      );
    }
    return get(timerRefAtom) !== undefined;
  }
);
