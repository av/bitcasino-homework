import CryptoIpsum from "./CryptoIpsum";
import { HTMLAttributes } from "react";
import PageContent from "./PageContent";

export default function BaseFooter(props: HTMLAttributes<HTMLElement>) {
  return (
    <footer {...props}>
      <PageContent>
        <small>
          <CryptoIpsum />
        </small>
      </PageContent>
    </footer>
  );
}
