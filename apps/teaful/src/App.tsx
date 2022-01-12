import { Header, Stopwatch, PokeList, POKE_API_URL } from "ui";
import { useStopwatch, useStore } from "./store";

function App() {
  useStopwatch();
  const [seconds] = useStore.stopwatch.seconds();
  const [pokemons] = useStore.pokemons();
  const [running, setRunning] = useStore.stopwatch.running();
  const onToggle = () => setRunning(!running);
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="teaful" strategy="Hooks" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
