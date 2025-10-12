import { useEffect } from "react";

export const useKeyboard = (callback: (key: string) => void) => {
  const preventDefaultBeforeCallback = (e: KeyboardEvent) => {
    e.preventDefault();
    callback(e.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", preventDefaultBeforeCallback);

    return () => {
      document.removeEventListener("keydown", preventDefaultBeforeCallback);
    };
  }, []);
};
