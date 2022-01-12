import { createStoreon, StoreonModule } from "storeon";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

interface StopwatchState {
  seconds: number;
  running: boolean;
}
interface StopwatchEvents {
  increment: undefined;
  toggle: undefined;
}
const stopwatchModule: StoreonModule<StopwatchState, StopwatchEvents> = (
  store
) => {
  let timer: number | undefined;
  store.on("@init", () => ({ seconds: 0, running: false }));
  store.on("increment", (state) => ({ seconds: state.seconds + 0.1 }));
  store.on("toggle", (state) => {
    if (!state.running)
      timer = window.setInterval(() => {
        if (store.get().running) store.dispatch("increment");
      }, 100);
    else clearInterval(timer);
    return { running: !state.running };
  });
};
interface PokeState {
  pokemon: string[] | undefined;
}

interface PokeEvents {
  setPokemon: Pokemon;
}
const pokeModule: StoreonModule<PokeState, PokeEvents> = (store) => {
  store.on("@init", () => undefined);
  store.on("setPokemon", (_, pokemon) => {
    return { pokemon };
  });
};

export const store = createStoreon<
  StopwatchState & PokeState,
  StopwatchEvents & PokeEvents
>([stopwatchModule, pokeModule]);

store.on("@changed", async (state) => {
  console.warn(state);

  if (state.seconds > 2 && !state.pokemon) {
    const data = await fetch(POKE_API_URL).then((res) => res.json());
    store.dispatch("setPokemon", data?.results);
  }
});
