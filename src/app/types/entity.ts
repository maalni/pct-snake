import { Position } from "@/app/types/position";

export type IEntity = {
  id: number;
  type: "food";
  decay?: number;
} & Position;
