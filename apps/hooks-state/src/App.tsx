import { useState } from "@hookstate/core";
import { Header, Stopwatch, PokeList } from "ui";
import { pokemons, running, seconds, useStopwatch } from "./store";

function App() {
  useStopwatch();
  const secondsState = useState(seconds);
  const runningState = useState(running);
  const pokemonsState = useState(pokemons);
  const onToggle = () => runningState.set(!runningState.get());

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Hooks State" strategy="Hooks" />
      <Stopwatch
        onToggle={onToggle}
        running={runningState.get()}
        seconds={secondsState.get()}
      />
      <PokeList pokemons={pokemonsState.get()} />
    </div>
  );
}

export default App;
