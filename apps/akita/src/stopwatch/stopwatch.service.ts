import { Subscription } from "rxjs";
import { Pokemon } from "types";
import { POKE_API_URL } from "ui";

import { stopwatchQuery } from "./stopwatch.query";
import { StopwatchStore, stopwatchStore } from "./stopwatch.store";

export class StopwatchService {
  private timer: number | undefined = undefined;
  private requestedPokemons: boolean = false;
  private secondsSubscription: Subscription | undefined;

  constructor(private stopwatchStore: StopwatchStore) {
    this.secondsSubscription = stopwatchQuery.seconds$.subscribe((seconds) => {
      if (seconds > 2 && !this.requestedPokemons) {
        this.requestPokemons();
        this.secondsSubscription?.unsubscribe();
        this.secondsSubscription = undefined;
      }
    });
  }

  destroy() {
    this.secondsSubscription?.unsubscribe();
  }

  private async requestPokemons() {
    this.requestedPokemons = true;
    const pokemon = await fetch(POKE_API_URL)
      .then((res) => res.json())
      .then((data) => data?.results);
    this.stopwatchStore.update({
      pokemon,
    });
  }

  update({ running, pokemon }: { running: boolean; pokemon?: Pokemon }) {
    if (pokemon) {
      this.stopwatchStore.update({ pokemon });
    }

    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }

    this.stopwatchStore.update({ running });

    if (this.stopwatchStore.getValue().running) {
      this.timer = window.setInterval(() => {
        this.stopwatchStore.update({
          seconds: this.stopwatchStore.getValue().seconds + 0.1,
        });
      }, 100);
    }
  }
  stop() {
    this.stopwatchStore.update({ running: false, seconds: 0 });

    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }
  toggle() {
    this.stopwatchStore.update({
      running: !this.stopwatchStore.getValue().running,
    });
  }
}

export const stopwatchService = new StopwatchService(stopwatchStore);
