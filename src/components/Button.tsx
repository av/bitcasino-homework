import { ButtonHTMLAttributes } from "react";
import { classed } from "lib/utils";

type ButtonProps = {
  variant?: "default" | "icon";
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Basic button component,
 * ensures that the type is "button" by
 * default to avoid potential issues with forms.
 * 
 * Supports the variant with an icon as a content.
 */
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
