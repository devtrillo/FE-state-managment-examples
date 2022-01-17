import { Header,PokeList, Stopwatch } from "ui";

import { useStopwatch, useStore } from "./store";

function App() {
  useStopwatch();
  const [seconds, setSeconds] = useStore.stopwatch.seconds();
  const [pokemons] = useStore.pokemons();
  const [running, setRunning] = useStore.stopwatch.running();
  const onToggle = () => setRunning(!running);
  const onReset = () => {
    setRunning(false);
    setSeconds(0);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="teaful" strategy="Hooks" />
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
