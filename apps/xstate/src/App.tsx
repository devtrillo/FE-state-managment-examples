import { Header, Stopwatch, PokeList, POKE_API_URL } from "ui";
import { useMachineState } from "./store";

function App() {
  const { onToggle, running, seconds, pokemons } = useMachineState();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="XState" strategy="Finite State Machine" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
