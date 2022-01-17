import { useState } from "@hookstate/core";
import { Header, PokeList,Stopwatch } from "ui";

import { pokemons, running, seconds, useStopwatch } from "./store";

function App() {
  useStopwatch();
  const secondsState = useState(seconds);
  const runningState = useState(running);
  const pokemonsState = useState(pokemons);
  const onToggle = () => runningState.set(!runningState.get());
  const onReset = () => {
    runningState.set(false);
    secondsState.set(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Hooks State" strategy="Hooks" />
      <Stopwatch
        reset={onReset}
        running={runningState.get()}
        seconds={secondsState.get()}
        onToggle={onToggle}
      />
      <PokeList pokemons={pokemonsState.get()} />
    </div>
  );
}

export default App;
