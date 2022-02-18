import { Header, PokeList, Stopwatch } from "ui";

import { useGlobalState } from "./store";

function App() {
  const { onToggle, isRunning, seconds, pokemons, onReset } = useGlobalState();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Prop drilling" strategy="Hooks" />
      <Stopwatch
        reset={onReset}
        running={isRunning}
        seconds={seconds}
        onToggle={onToggle}
      />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
