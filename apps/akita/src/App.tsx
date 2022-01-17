import { Header, PokeList, Stopwatch } from "ui";

import {
  usePokemons,
  useRunning,
  useSeconds,
} from "./stopwatch/stopwatch.query";
import { stopwatchService } from "./stopwatch/stopwatch.service";

function App() {
  const running = useRunning();
  const onToggle = () => stopwatchService.toggle();
  const onReset = () => stopwatchService.stop();
  const seconds = useSeconds();
  const pokemons = usePokemons();
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="akita" strategy="reactive" />
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
