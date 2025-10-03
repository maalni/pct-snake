"use client";

import { useEffect, useState } from "react";

interface IEntity {
  type: "food" | "snake";
  x: number;
  y: number;
}

export default function Home() {
  const [entities, setEntities] = useState<IEntity[]>([]);

  useEffect(() => {
    const food = randomField();
    const snake = randomField();

    setEntities([
      { type: "food", ...food },
      { type: "snake", ...snake },
    ]);

    console.log(entities);
  }, []);

  const randomField = () => {
    return { x: randomNumberBetween(1, 50), y: randomNumberBetween(1, 50) };
  };

  const randomNumberBetween = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  };

  return (
    <div
      className={
        "absolute left-0 right-0 top-0 bottom-0 m-auto grid grid-cols-50 grid-rows-50 size-dvh bg-amber-400"
      }
    >
      {entities.map((entity, index) => (
        <div
          key={index}
          className={`grid col-start-[${entity.x}] col-span-1 row-start-[${entity.y}] row-span-1`}
        >
          {entity.type === "food" && "🍎"}
          {entity.type === "snake" && "🐍"}
        </div>
      ))}
    </div>
  );
}
