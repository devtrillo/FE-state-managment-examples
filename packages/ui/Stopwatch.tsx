import { FC, MouseEventHandler } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

type Props = {
  onToggle: MouseEventHandler;
  running: Boolean;
  seconds: Number;
};
export const Stopwatch: FC<Props> = ({ onToggle, running, seconds }) => {
  return (
    <div className="flex items-center justify-center flex-col py-40">
      <span className="font-mono text-2xl">{seconds.toFixed(1)}</span>
      <div className="flex text-3xl">
        <button onClick={onToggle}>
          {running ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </button>
      </div>
    </div>
  );
};
