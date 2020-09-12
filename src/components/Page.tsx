import { ReactElement, HTMLAttributes } from "react";
import PageContent from "./PageContent";

type PageProps = {
  header?: ReactElement;
  footer?: ReactElement;
  children: React.ReactNode;
} & HTMLAttributes<HTMLElement>;

export default function Page({ header, children, footer, ...rest }: PageProps) {
  return (
    <div {...rest}>
      {header && <PageContent>{header}</PageContent>}
      <main>
        <PageContent>{children}</PageContent>
      </main>
      {footer && footer}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-height: 100%;
        }

        main {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
