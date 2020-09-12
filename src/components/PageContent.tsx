import { classed } from "lib/utils";
import { HTMLAttributes } from "react";

export default function PageContent({
  className,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  return <>
    <div className={classed("mx-auto w-full", className)} {...rest} />
    <style jsx>{`
      div {
        max-width: var(--content-width);
      }
    `}</style>
  </>;
}
