import { ButtonHTMLAttributes } from "react";
import { classed } from "lib/utils";

type ButtonProps = {
  variant?: "default" | "icon";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  type = "button",
  variant = "default",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classed(`btn btn-${variant}`, className)}
      {...rest}
    />
  );
}
