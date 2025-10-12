import { Highscore } from "@/app/types/highscore";

export const useApi = () => {
  const fetchHighscore = async (callback: (result: number) => void) => {
    const response = await fetch("/api/highscore");

    if (response.ok) {
      const result: Highscore = await response.json();

      callback(result.score);
    }
  };

  const fetchHighscores = async (callback: (result: Highscore[]) => void) => {
    const response = await fetch("/api/highscores");

    if (response.ok) {
      const result: Highscore[] = await response.json();

      callback(result);
    }
  };

  const sendHighscore = (name: string, score: number, callback: () => void) => {
    fetch("/api/highscores", {
      method: "PUT",
      body: JSON.stringify({ name: name, score: score }),
    });

    callback();
  };

  return { fetchHighscore, fetchHighscores, sendHighscore };
};
