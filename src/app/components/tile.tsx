import { PropsWithChildren } from "react";

type TileProps = {
  x: number;
  y: number;
};

export const Tile = ({ x, y, children }: PropsWithChildren<TileProps>) => {
  return (
    <div
      className={`grid col-start-[${x}] col-span-1 row-start-[${y}] row-span-1 justify-center items-center`}
    >
      {children}
    </div>
  );
};
