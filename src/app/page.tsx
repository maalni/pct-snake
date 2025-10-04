"use client";

import { useEffect, useRef, useState } from "react";
import { useInterval } from "@/app/hooks/useInterval";
import { IEntity } from "@/app/types/entity";
import { ISnake } from "@/app/types/snake";
import { EMovement } from "@/app/enum/movement";
import { Position } from "@/app/types/position";
import Gameboard from "@/app/components/gameboard";

import { randomNumberBetween } from "@/app/utils/helper";
import { Gamestate } from "@/app/enum/gamestate";
import GameoverOverlay from "@/app/components/gameover";
import { FIELD_SIZE } from "@/app/utils/constants";
import { Highscore } from "@/app/types/highscore";

export default function Home() {
  const [highScore, setHighScore] = useState<number>(0);
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [snake, setSnake] = useState<ISnake>({
    head: { x: 0, y: 0 },
    tail: [],
  });
  const nextEntityId = useRef(0);
  const lastMovement = useRef<EMovement>(EMovement.NONE);
  const nextMovement = useRef(EMovement.NONE);
  const gamestate = useRef<Gamestate>(Gamestate.SETUP);

  const gameLoop = () => {
    if (gamestate.current !== Gamestate.RUNNING) {
      return;
    }

    const previousPosition = moveSnake();
    checkForFood(previousPosition);
    checkForDecay();
  };

  const moveSnake = () => {
    let previousPosition = Object.assign({}, snake.head);

    const tempTail = snake.tail.map((position, index) => {
      const lastPosition = previousPosition;
      previousPosition = position;

      if (index === 0) {
        return { x: snake.head.x, y: snake.head.y };
      }

      return lastPosition;
    });

    const tempHead = snake.head;

    switch (nextMovement.current) {
      case EMovement.UP:
        tempHead.y--;
        break;
      case EMovement.DOWN:
        tempHead.y++;
        break;
      case EMovement.LEFT:
        tempHead.x--;
        break;
      case EMovement.RIGHT:
        tempHead.x++;
        break;
    }

    lastMovement.current = nextMovement.current;

    if (tempHead.x > FIELD_SIZE) {
      tempHead.x = 1;
    }
    if (tempHead.x < 1) {
      tempHead.x = FIELD_SIZE;
    }

    if (tempHead.y > FIELD_SIZE) {
      tempHead.y = 1;
    }
    if (tempHead.y < 1) {
      tempHead.y = FIELD_SIZE;
    }

    const collision = checkForCollision(tempHead, tempTail);

    if (!collision) {
      setSnake({
        head: tempHead,
        tail: tempTail,
      });
    } else {
      clearGame();
    }

    return previousPosition;
  };

  const checkForFood = (previousPosition: Position) => {
    const result = entities.find(
      (entity) => entity.x === snake.head.x && entity.y === snake.head.y,
    );

    if (result === undefined) {
      checkForSpawn();
      return;
    }

    setEntities(entities.filter((entity) => entity.id !== result.id));

    setSnake((tempSnake) => ({
      ...tempSnake,
      tail: [...tempSnake.tail, previousPosition],
    }));

    if (result.decay === undefined) {
      spawnEntity("food");
    }
  };

  const checkForSpawn = () => {
    if (randomNumberBetween(1, 100) < 5) {
      spawnEntity("food", { decay: Date.now() + 1000 * 10 });
    }
  };

  const checkForDecay = () => {
    setEntities((entities) =>
      entities.filter(
        (entity) => entity.decay === undefined || entity.decay > Date.now(),
      ),
    );
  };

  const checkForCollision = (head: Position, tail: Position[]) => {
    return (
      tail.findIndex((part) => head.x === part.x && head.y === part.y) >= 0
    );
  };

  const keyListener = (e: globalThis.KeyboardEvent) => {
    let tempMovement: EMovement = lastMovement.current;

    if (gamestate.current === Gamestate.RUNNING) {
      e.preventDefault();
    }

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        if (lastMovement.current === EMovement.DOWN) {
          break;
        }

        tempMovement = EMovement.UP;
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (lastMovement.current === EMovement.UP) {
          break;
        }

        tempMovement = EMovement.DOWN;
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        if (lastMovement.current === EMovement.RIGHT) {
          break;
        }

        tempMovement = EMovement.LEFT;
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (lastMovement.current === EMovement.LEFT) {
          break;
        }

        tempMovement = EMovement.RIGHT;
        break;
    }

    nextMovement.current = tempMovement;

    if (
      gamestate.current === Gamestate.READY &&
      [
        "ArrowUp",
        "w",
        "W",
        "ArrowDown",
        "s",
        "S",
        "ArrowLeft",
        "a",
        "A",
        "ArrowRight",
        "d",
        "D",
      ].includes(e.key)
    ) {
      startGame();
    }
  };

  const spawnEntity = (
    type: "food",
    options?: { position?: Position; decay?: number },
  ) => {
    let tempPosition = options?.position;

    if (tempPosition === undefined) {
      tempPosition = randomPosition();
    }

    setEntities((entities) => [
      ...entities,
      {
        id: nextEntityId.current,
        type,
        ...tempPosition,
        decay: options?.decay,
      },
    ]);
    nextEntityId.current++;
  };

  const randomPosition = (): Position => {
    return {
      x: randomNumberBetween(1, FIELD_SIZE),
      y: randomNumberBetween(1, FIELD_SIZE),
    };
  };

  const startGame = () => {
    if (gamestate.current !== Gamestate.READY) {
      return;
    }

    spawnEntity("food");
    gamestate.current = Gamestate.RUNNING;
  };

  const clearGame = () => {
    gamestate.current = Gamestate.GAMEOVER;

    if (snake.tail.length > highScore) {
      setHighScore(snake.tail.length);
    }
  };

  const setupGame = () => {
    fetchHighscore();
    lastMovement.current = EMovement.NONE;
    nextMovement.current = EMovement.NONE;
    setEntities([]);
    setSnake({ head: randomPosition(), tail: [] });
    gamestate.current = Gamestate.READY;
  };

  const fetchHighscore = async () => {
    const response = await fetch("/api/highscore");

    if (response.ok) {
      const result: Highscore = await response.json();

      setHighScore(result.score);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyListener);
    setupGame();

    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, []);

  useInterval(() => {
    gameLoop();
  }, 150);

  return (
    <>
      <Gameboard snake={snake} entities={entities} highScore={highScore} />
      {gamestate.current === Gamestate.READY && (
        <div
          className={
            "absolute left-0 right-0 top-0 bottom-0 z-50 w-full h-full flex flex-1 bg-black/50 justify-center items-center"
          }
        >
          <span className={"flex"}>Press any direction key to begin</span>
        </div>
      )}
      {gamestate.current === Gamestate.GAMEOVER && (
        <GameoverOverlay onSubmitAction={setupGame} score={snake.tail.length} />
      )}
    </>
  );
}
