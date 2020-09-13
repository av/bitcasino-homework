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
      <section className="bg-leprechaun-striped">
        <PageContent>
          <BaseHeader className="py-10" />
        </PageContent>
        <PageContent className="text-white splash-section">
          <section className="flex flex-col md:flex-row justify-between md:items-center">
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
          <CryptoList className="crypto-list my-5 flex flex-col flex-wrap" />
        </PageContent>
      </section>
      <BaseFooter className="py-10 text-black text-opacity-50" />
      <style jsx>{`
        .splash-text {
          max-width: 25rem;
        }

        :global(.bt-panel) {
          max-width: 22rem;
        }

        section :global(.crypto-list) {
          height: 50vh;
          align-content: flex-start;
        }

        section :global(.crypto-list > div) {
          max-width: 20rem;
          flex: 0 0 2rem;
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
