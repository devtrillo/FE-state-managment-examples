import { Header, PokeList,Stopwatch } from "ui";

import { useGlobalContext } from "./store";

function App() {
  const { onToggle, running, seconds, pokemons, onReset } = useGlobalContext();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Context" strategy="Hooks" />
      <Stopwatch
        reset={onReset}
        running={running}
        seconds={seconds}
        onToggle={onToggle}
      />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
