import { useEffect, useState } from "react";
import { Orientation } from "@/app/types/orientation";

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>("landscape");

  const handleResize = () => {
    setOrientation(
      window.innerWidth > window.innerHeight ? "landscape" : "portrait",
    );
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return orientation;
};
