import { Position } from "@/app/types/position";
import { FIELD_SIZE } from "@/app/utils/constants";
import { EMovement } from "@/app/enum/movement";

export const randomNumberBetween = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

export const randomPosition = (): Position => {
  return {
    x: randomNumberBetween(1, FIELD_SIZE),
    y: randomNumberBetween(1, FIELD_SIZE),
  };
};

export const mapKeysToMovement = (key: string, lastMovement: EMovement) => {
  let tempMovement: EMovement = lastMovement;

  switch (key) {
    case "Up":
    case "ArrowUp":
    case "w":
    case "W":
      if (lastMovement === EMovement.DOWN) {
        break;
      }

      tempMovement = EMovement.UP;
      break;
    case "Down":
    case "ArrowDown":
    case "s":
    case "S":
      if (lastMovement === EMovement.UP) {
        break;
      }

      tempMovement = EMovement.DOWN;
      break;
    case "Left":
    case "ArrowLeft":
    case "a":
    case "A":
      if (lastMovement === EMovement.RIGHT) {
        break;
      }

      tempMovement = EMovement.LEFT;
      break;
    case "Right":
    case "ArrowRight":
    case "d":
    case "D":
      if (lastMovement === EMovement.LEFT) {
        break;
      }

      tempMovement = EMovement.RIGHT;
      break;
  }

  return tempMovement;
};
