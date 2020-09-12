import Logo from "./Logo";
import { HTMLAttributes } from "react";

export default function BaseHeader(props: HTMLAttributes<HTMLElement>) {
  return (
    <header {...props}>
      <Logo />
    </header>
  );
}
