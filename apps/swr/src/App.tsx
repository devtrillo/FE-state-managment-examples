import useSWR from "swr";
import { Header, POKE_API_URL, PokeList, Stopwatch } from "ui";

import { useGlobalState } from "./store";

function App() {
  const { onReset, onToggle, running, seconds } = useGlobalState();
  const { data: pokemons } = useSWR(seconds > 2 ? POKE_API_URL : null);
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="SWR" strategy="API+" />
      <Stopwatch
        reset={onReset}
        running={running}
        seconds={seconds}
        onToggle={onToggle}
      />
      <PokeList pokemons={pokemons?.results} />
    </div>
  );
}

export default App;
