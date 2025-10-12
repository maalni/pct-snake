"use client";

import { useEffect, useState } from "react";
import { Highscore } from "@/app/types/highscore";
import { useApi } from "@/app/hooks/useApi";
import { Text } from "@/app/components/text/text";

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
    if (name === "") {
      alert("Name field is empty");
      return;
    }

    sendHighscore(name, score, onSubmitAction);
  };

  return (
    <div
      className={
        "absolute left-0 right-0 top-0 bottom-0 z-50 w-full h-full flex flex-1 bg-black/50 justify-center items-center flex-col gap-8 p-4"
      }
    >
      <Text type={"title"}>GameOver</Text>
      <div className={"flex flex-col gap-2"}>
        {highscores.map((highscore, index) => (
          <Text type={"p"} key={highscore.name}>
            {`${index + 1}. ${highscore.name}: ${highscore.score}`}
          </Text>
        ))}
      </div>
      <div className={"flex flex-row"}>
        <input
          placeholder={"Enter your name"}
          onChange={(e) => setName(e.target.value)}
          className={"border-b-2 text-center text-white placeholder-white"}
        />
      </div>
      <button onClick={handleClick}>
        <Text type={"p"}>Submit your score</Text>
      </button>
    </div>
  );
}
