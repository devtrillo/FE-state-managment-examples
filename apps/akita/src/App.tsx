import { Header, Stopwatch, PokeList } from "ui";
import {
  usePokemons,
  useRunning,
  useSeconds,
} from "./stopwatch/stopwatch.query";
import { stopwatchService } from "./stopwatch/stopwatch.service";

function App() {
  const running = useRunning();
  const onToggle = () => stopwatchService.update({ running: !running });
  const seconds = useSeconds();
  const pokemons = usePokemons();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="akita" strategy="reactive" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
