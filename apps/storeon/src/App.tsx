import { useStoreon } from "storeon/react";
import { Header, PokeList, Stopwatch } from "ui";

function App() {
  const { seconds } = useStoreon("seconds");
  const { running, dispatch } = useStoreon("running");
  const { pokemon } = useStoreon("pokemon");

  const onToggle = () => dispatch("toggle");
  const onReset = () => dispatch("reset");

  return (
    <div className="min-h-screen flex flex-col">
      <Header name="storeon" strategy="Reactive" />
      <Stopwatch
        reset={onReset}
        running={running}
        seconds={seconds}
        onToggle={onToggle}
      />
      <PokeList pokemons={pokemon} />
    </div>
  );
}

export default App;
