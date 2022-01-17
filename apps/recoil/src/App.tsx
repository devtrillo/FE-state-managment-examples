import { useRecoilState } from "recoil";
import { Header, PokeList, Stopwatch } from "ui";

import { PokeListAtom, runningAtom, secondsAtom, useStopwatch } from "./store";

function App() {
  useStopwatch();
  const [running, setRunning] = useRecoilState(runningAtom);
  const [seconds, setSeconds] = useRecoilState(secondsAtom);
  const [pokemons] = useRecoilState(PokeListAtom);

  const onReset = () => {
    setRunning(false);
    setSeconds(0);
  };
  const onToggle = () => setRunning(!running);

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="Recoil" strategy="Atomic" />
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
