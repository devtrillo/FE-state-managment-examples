import { useObservableState } from "observable-hooks";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

const running$ = new BehaviorSubject<Boolean>(false);
const seconds$ = new BehaviorSubject<number>(0);
const pokemon$ = new BehaviorSubject<Pokemon>(undefined);

let timer: number | undefined;

running$.subscribe((running) => {
  if (timer) {
    window.clearInterval(timer);
    timer = undefined;
  }
  if (running) {
    timer = window.setInterval(() => {
      seconds$.next(seconds$.value + 0.1);
    }, 100);
  }
});

const secondsSubscription = seconds$.subscribe(async (time) => {
  if (time > 2 && !pokemon$.value) {
    const response = await fetch(POKE_API_URL).then((res) => res.json());
    pokemon$.next(response?.results);
    secondsSubscription.unsubscribe();
  }
});

export const useRunning = () => useObservableState(running$);
export const useSeconds = () => useObservableState(seconds$);
export const usePokemons = () => useObservableState(pokemon$);
export const toggle = () => running$.next(!running$.value);
