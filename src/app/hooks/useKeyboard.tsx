import { RefObject, useEffect } from "react";
import { Gamestate } from "@/app/enum/gamestate";

export const useKeyboard = (
  gamestate: RefObject<Gamestate>,
  callback: (key: string) => void,
) => {
  const preventDefaultBeforeCallback = (e: KeyboardEvent) => {
    if (gamestate.current === Gamestate.RUNNING) {
      e.preventDefault();
    }
    callback(e.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", preventDefaultBeforeCallback);

    return () => {
      document.removeEventListener("keydown", preventDefaultBeforeCallback);
    };
  }, []);
};
