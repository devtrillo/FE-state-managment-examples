import { useAtom } from "jotai";
import { Header, PokeList, Stopwatch } from "ui";

import { pokeAtom, runningAtom, secondsAtom } from "./store";

function App() {
  const [seconds, setSeconds] = useAtom(secondsAtom);
  const [running, setRunning] = useAtom(runningAtom);
  const [pokemons] = useAtom(pokeAtom);
  const onReset = () => {
    setRunning(false);
    setSeconds(0);
  };
  const onToggle = () => setRunning(!running);

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Jotai" strategy="Atomic" />
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
