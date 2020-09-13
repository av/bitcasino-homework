import { HTMLAttributes } from "react";
import { classed } from "lib/utils";

/**
 * Basic container surface
 */
export default function Panel({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classed("bt-panel bg-white rounded shadow-2xl-darker p-10", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
