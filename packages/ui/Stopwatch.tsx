import { FC, MouseEventHandler } from "react";
import { FiStopCircle, FiPlay, FiPause } from "react-icons/fi";

type Props = {
  onToggle: MouseEventHandler;
  reset: MouseEventHandler;
  running: Boolean;
  seconds: Number;
};
export const Stopwatch: FC<Props> = ({ onToggle, running, seconds, reset }) => {
  return (
    <div className="flex items-center justify-center flex-col py-40">
      <span className="font-mono text-2xl">{seconds.toFixed(1)}</span>
      <div className="flex text-3xl">
        <button onClick={onToggle}>{running ? <FiPause /> : <FiPlay />}</button>
        {!running && seconds > 0 ? (
          <button onClick={reset}>
            <FiStopCircle />
          </button>
        ) : null}
      </div>
    </div>
  );
};
