import { Header, Stopwatch, PokeList, POKE_API_URL } from "ui";
import { useGlobalState } from "./store";

function App() {
  const { onToggle, running, seconds, pokemons } = useGlobalState();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Prop drilling" strategy="Hooks" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
