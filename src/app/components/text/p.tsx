import { PropsWithChildren } from "react";

export const P = ({ children }: PropsWithChildren) => {
  return <span className={"text-white leading-7"}>{children}</span>;
};
