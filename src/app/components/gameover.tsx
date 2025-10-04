"use client";

import { useEffect, useState } from "react";
import { Highscore } from "@/app/types/highscore";

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

  const fetchHighscores = async () => {
    const response = await fetch("/api/highscores");

    if (response.ok) {
      const result: Highscore[] = await response.json();

      setHighscores(result);
    }
  };

  const sendHighscore = () => {
    fetch("/api/highscores", {
      method: "PUT",
      body: JSON.stringify({ name: name, score: score }),
    });

    onSubmitAction();
  };

  useEffect(() => {
    fetchHighscores();
  }, []);

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
      <button onClick={sendHighscore}>submit</button>
    </div>
  );
}
