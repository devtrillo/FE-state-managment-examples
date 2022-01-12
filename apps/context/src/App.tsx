import { Header, Stopwatch, PokeList } from "ui";
import { useGlobalContext } from "./store";

function App() {
  const { onToggle, running, seconds, pokemons } = useGlobalContext();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Context" strategy="Hooks" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
