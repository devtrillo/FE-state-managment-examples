import { Header, Stopwatch, PokeList } from "ui";
import { toggle, usePokemons, useRunning, useSeconds } from "./store";
function App() {
  const running = useRunning();
  const seconds = useSeconds();
  const pokemons = usePokemons();

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="RXJS" strategy="reactive" />
      <Stopwatch onToggle={toggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
