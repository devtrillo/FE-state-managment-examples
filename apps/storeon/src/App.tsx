import { Header, PokeList, Stopwatch } from "ui";
import { useStoreon } from "storeon/react";

function App() {
  const { seconds } = useStoreon("seconds");
  const { running, dispatch } = useStoreon("running");
  const { pokemon } = useStoreon("pokemon");

  const onToggle = () => dispatch("toggle");
  return (
    <div className="min-h-screen flex flex-col">
      <Header name="storeon" strategy="Reactive" />
      <Stopwatch onToggle={onToggle} running={running} seconds={seconds} />
      <PokeList pokemons={pokemon} />
    </div>
  );
}

export default App;
