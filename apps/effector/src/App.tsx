import { Header, Stopwatch, PokeList, POKE_API_URL } from "ui";
import { $running, $pokemons, $seconds, toggle } from "./store";
import { useStore, useEvent } from "effector-react";

function App() {
  const running = useStore($running);
  const seconds = useStore($seconds);

  const onToggle = useEvent(toggle);
  const pokemons = useStore($pokemons);
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="effector" strategy="Reactive" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemons} />
    </div>
  );
}

export default App;
