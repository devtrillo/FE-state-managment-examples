import { Header, Stopwatch, PokeList, POKE_API_URL } from "ui";
import { usePokemons, useRunning, useSeconds, useStopWatch } from "./store";

function App() {
  const [seconds] = useSeconds();
  const [running, setRunning] = useRunning();
  useStopWatch();
  const [pokemons] = usePokemons();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Global state" strategy="Hooks" />
      <Stopwatch
        onToggle={() => setRunning(!running)}
        running={running}
        seconds={seconds}
      />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
