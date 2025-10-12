"use client";

import { ISnake } from "@/app/types/snake";
import { IEntity } from "@/app/types/entity";
import { FIELD_SIZE } from "@/app/utils/constants";
import { Orientation } from "@/app/types/orientation";

type GameboardProps = {
  snake: ISnake;
  entities: IEntity[];
  highScore: number;
  orientation: Orientation;
};

export default function Gameboard({
  snake,
  entities,
  highScore,
  orientation,
}: GameboardProps) {
  return (
    <>
      <div>
        high score:{" "}
        {highScore > snake.tail.length ? highScore : snake.tail.length}
      </div>
      <div>current score: {snake.tail.length}</div>
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 m-auto grid grid-cols-${FIELD_SIZE} grid-rows-${FIELD_SIZE} ${orientation === "landscape" ? "size-dvh" : "size-dvw"} bg-amber-400`}
      >
        {entities.map((entity) => (
          <div
            key={entity.id}
            className={`grid col-start-[${entity.x}] col-span-1 row-start-[${entity.y}] row-span-1`}
          >
            {entity.type === "food" && "🍎"}
          </div>
        ))}

        {snake.tail.map((part, index) => (
          <div
            key={index}
            className={`grid col-start-[${part?.x}] col-span-1 row-start-[${part?.y}] row-span-1`}
          >
            🟢
          </div>
        ))}
        {snake.head && (
          <div
            className={`grid col-start-[${snake.head.x}] col-span-1 row-start-[${snake.head.y}] row-span-1`}
          >
            🐍
          </div>
        )}
      </div>
    </>
  );
}
