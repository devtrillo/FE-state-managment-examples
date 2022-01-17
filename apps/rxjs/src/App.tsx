import { Header, PokeList,Stopwatch } from "ui";

import { reset,toggle, usePokemons, useRunning, useSeconds } from "./store";
function App() {
  const running = useRunning();
  const seconds = useSeconds();
  const pokemons = usePokemons();

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="RXJS" strategy="reactive" />
      <Stopwatch
        reset={reset}
        running={running}
        seconds={seconds}
        onToggle={toggle}
      />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
