import {
  createApi,
  createEffect,
  createEvent,
  createStore,
  guard,
} from "effector";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

export const $seconds = createStore(0);
export const $running = createStore(false);
export const $pokemons = createStore<Pokemon>([]);
export const toggle = createEvent();
export const reset = createEvent();

const getPokemonsFx = createEffect(() =>
  fetch(POKE_API_URL)
    .then((res) => res.json())
    .then((data) => data?.results)
);

const { increment } = createApi($seconds, {
  increment: (state) => state + 0.1,
});

$pokemons.on(getPokemonsFx.doneData, (_, pokemons) => pokemons);

guard({
  filter: (state) => state > 2,
  source: $seconds,
  target: getPokemonsFx,
});

$running.on(toggle, ($running) => !$running);

$seconds.on(reset, (seconds) => 0);
$running.on(reset, () => false);

let timer: number | undefined = undefined;

$running.watch((isRunning) => {
  if (timer) clearInterval(timer);
  if (isRunning) timer = window.setInterval(() => increment(), 100);
});
