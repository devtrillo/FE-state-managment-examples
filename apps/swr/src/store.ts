import { useEffect, useState } from "react";

interface GlobalState {
  onToggle: () => void;
  onReset: () => void;
  running: boolean;
  seconds: number;
}
export const useGlobalState = (): GlobalState => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  return {
    onReset: () => {
      setRunning(false);
      setSeconds(0);
    },
    onToggle: () => setRunning((running) => !running),
    running,
    seconds,
  };
};
