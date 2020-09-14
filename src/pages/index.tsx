import CryptoList from "components/CryptoList";
import BaseHeader from "components/BaseHeader";
import BaseFooter from "components/BaseFooter";
import PageContent from "components/PageContent";
import withApollo from "components/withApollo";
import withGlobalState from "components/withGlobalState";
import { cryptoTracker } from "store";
import { CryptoTrackerState, CryptoTrackerAction } from "store/cryptoTracker";
import { deserialize } from "lib/utils";
import { CryptoTrackerPanel } from "components/CryptoTrackerPanel";

function IndexPage() {
  return (
    <>
      <section className="bg-leprechaun-striped" data-e2e-tracker-section>
        <PageContent>
          <BaseHeader className="py-10" />
        </PageContent>
        <PageContent className="text-white splash-section">
          <section
            className="flex flex-col items-center md:flex-row justify-between md:items-center"
            data-e2e-tracker-splash
          >
            <div className="splash-text">
              <h1 className="text-4xl">
                Now you can track all your cryptos here!
              </h1>
              <p className="text-white text-opacity-50 w-3/5 text-xl">
                Just enter the cryptocurrency code on the form to the right.
              </p>
            </div>
            <CryptoTrackerPanel />
          </section>
          <CryptoList className="crypto-list my-5 md:p-0 flex flex-col items-stretch md:flex-wrap" />
        </PageContent>
      </section>
      <BaseFooter className="py-10 text-black text-opacity-50" />
      <style jsx>{`
        .splash-text,
        :global(.bt-panel) {
          max-width: 25rem;
        }

        @media (min-width: 1000px) {
          section :global(.crypto-list) {
            max-height: 50vh;
            align-content: flex-start;
          }
        }

        section :global(.crypto-list > div) {
          margin: .1rem;

          /* Small tweak to improve readability 
             of items over the leprechaun */
          backdrop-filter: blur(20px);
        }        
      `}</style>
    </>
  );
}

export default withGlobalState<CryptoTrackerState, CryptoTrackerAction>(
  withApollo(IndexPage),
  () => deserialize(cryptoTracker.storageKey, cryptoTracker.initialState),
  cryptoTracker.reducer
);
