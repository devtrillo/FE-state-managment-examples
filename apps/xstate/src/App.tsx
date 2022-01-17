import { Header, PokeList, Stopwatch } from "ui";

import { useMachineState } from "./store";

function App() {
  const { onToggle, running, seconds, pokemons, onReset } = useMachineState();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="XState" strategy="Finite State Machine" />
      <span  >Xstate</span>
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
