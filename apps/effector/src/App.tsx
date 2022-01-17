import { useEvent,useStore } from "effector-react";
import { Header,PokeList, Stopwatch } from "ui";

import { $pokemons, $running, $seconds, reset,toggle } from "./store";

function App() {
  const running = useStore($running);
  const seconds = useStore($seconds);

  const onToggle = useEvent(toggle);
  const pokemons = useStore($pokemons);
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="effector" strategy="Reactive" />
      <Stopwatch
        reset={reset}
        running={running}
        seconds={seconds}
        onToggle={onToggle}
      />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
