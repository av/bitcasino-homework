import Panel from "./Panel";
import CryptoSelector from "./CryptoSelector";

export function CryptoTrackerPanel() {
  return (
    <Panel className="text-gray-900 my-10" data-e2e-crypto-selector>
      <CryptoSelector />
      <p className="text-center mt-8 text-gray-500 text-sm">
        Use of this service is subject to terms and conditions.
      </p>
    </Panel>
  );
}
