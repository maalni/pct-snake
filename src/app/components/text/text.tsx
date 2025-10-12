import { PropsWithChildren } from "react";
import { Title } from "./title";
import { P } from "@/app/components/text/p";

type TextProps = {
  type: "title" | "p";
};

export const Text = ({ type, children }: PropsWithChildren<TextProps>) => {
  switch (type) {
    case "title":
      return <Title>{children}</Title>;
    case "p":
      return <P>{children}</P>;
  }
};
