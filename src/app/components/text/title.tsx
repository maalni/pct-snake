import { PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => {
  return <span className={"text-white text-4xl"}>{children}</span>;
};
