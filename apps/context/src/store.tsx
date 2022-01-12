import { useState, useEffect, createContext, FC, useContext } from "react";
import { POKE_API_URL } from "ui";
import { Pokemon } from "types";

interface GlobalState {
  onToggle: () => void;
  pokemons: Pokemon;
  running: boolean;
  seconds: number;
}

const GlobalContext = createContext<GlobalState>({
  seconds: 0,
  running: false,
  onToggle: () => {},
  pokemons: undefined,
});

export const GlobalContextProvider: FC = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon>();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  useEffect(() => {
    if (seconds > 2) {
      fetch(POKE_API_URL)
        .then((res) => res.json())
        .then((data) => setPokemons(data?.results));
    }
  }, [seconds > 2]);

  return (
    <GlobalContext.Provider
      value={{
        seconds,
        running,
        onToggle: () => setRunning((running) => !running),
        pokemons,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
