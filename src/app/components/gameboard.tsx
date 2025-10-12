"use client";

import { ISnake } from "@/app/types/snake";
import { IEntity } from "@/app/types/entity";
import { FIELD_SIZE } from "@/app/utils/constants";
import { Orientation } from "@/app/types/orientation";
import { Text } from "@/app/components/text/text";
import { Tile } from "@/app/components/tile";

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
      <div
        className={`flex flex-col ${orientation === "landscape" ? "size-dvh p-4" : "size-dvw w-full text-center pt-4"}`}
      >
        <Text type={"p"}>
          {"High score: "}
          {highScore > snake.tail.length ? highScore : snake.tail.length}
        </Text>
        <Text type={"p"}>Current score: {snake.tail.length}</Text>
      </div>
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 m-auto grid grid-cols-${FIELD_SIZE} grid-rows-${FIELD_SIZE} ${orientation === "landscape" ? "size-dvh" : "size-dvw"}  bg-amber-400`}
      >
        {entities.map((entity) => (
          <Tile x={entity.x} y={entity.y} key={entity.id}>
            {entity.type === "food" && "🍎"}
          </Tile>
        ))}

        {snake.tail.map((part, index) => (
          <Tile x={part.x} y={part.y} key={index}>
            🟢
          </Tile>
        ))}
        {snake.head && (
          <Tile x={snake.head.x} y={snake.head.y}>
            🐍
          </Tile>
        )}
      </div>
    </>
  );
}
