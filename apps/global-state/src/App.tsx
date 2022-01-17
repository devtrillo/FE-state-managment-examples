import { Header,PokeList, Stopwatch } from "ui";

import { usePokemons, useRunning, useSeconds, useStopWatch } from "./store";

function App() {
  const [seconds, setSeconds] = useSeconds();
  const [running, setRunning] = useRunning();
  useStopWatch();
  const [pokemons] = usePokemons();
  const onToggle = () => setRunning(!running);
  const onReset = () => {
    setRunning(false);
    setSeconds(0);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Global state" strategy="Hooks" />
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
