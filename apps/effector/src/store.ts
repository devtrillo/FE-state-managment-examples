import { useState, useEffect } from "react";
import { POKE_API_URL } from "ui";
import { Pokemon } from "types";
import {
  createStore,
  createEvent,
  createEffect,
  createApi,
  guard,
} from "effector";

export const $seconds = createStore(0);
export const $running = createStore(false);
export const $pokemons = createStore<Pokemon>([]);
export const toggle = createEvent();

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
  source: $seconds,
  filter: (state) => state > 2,
  target: getPokemonsFx,
});
$running.on(toggle, (state) => !state);

let timer: number | undefined = undefined;

$running.watch((isRunning) => {
  if (timer) clearInterval(timer);
  if (isRunning) timer = window.setInterval(() => increment(), 100);
});
