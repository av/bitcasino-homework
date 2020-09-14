import { classed } from "lib/utils";
import { HTMLAttributes } from "react";

/**
 * Implements the basic behavior for a responsibe
 * page content. When screen exceeds the max
 * content width, centers itself in its parent.
 */
export default function PageContent({
  className,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  return <>
    <div className={classed("p-4 mx-auto w-full", className)} {...rest} />
    <style jsx>{`
      div {
        max-width: var(--content-width);
      }
    `}</style>
  </>;
}
