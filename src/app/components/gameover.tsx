"use client";

import { useEffect, useState } from "react";
import { Highscore } from "@/app/types/highscore";
import { useApi } from "@/app/hooks/useApi";

type GameoverOverlayProps = {
  onSubmitAction: () => void;
  score: number;
};

export default function GameoverOverlay({
  onSubmitAction,
  score,
}: GameoverOverlayProps) {
  const [highscores, setHighscores] = useState<Highscore[]>([]);
  const [name, setName] = useState<string>("");
  const { fetchHighscores, sendHighscore } = useApi();

  useEffect(() => {
    fetchHighscores(setHighscores);
  }, []);

  const handleClick = () => {
    sendHighscore(name, score, onSubmitAction);
  };

  return (
    <div
      className={
        "absolute left-0 right-0 top-0 bottom-0 z-50 w-full h-full flex flex-1 bg-black/50 justify-center items-center flex-col"
      }
    >
      <div>GameOver</div>
      {highscores.map((highscore) => (
        <div key={highscore.name}>
          <span>{highscore.name}: </span>
          <span>{highscore.score}</span>
        </div>
      ))}
      <div className={"flex flex-row"}>
        <input
          placeholder={"Enter your name"}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={handleClick}>submit</button>
    </div>
  );
}
