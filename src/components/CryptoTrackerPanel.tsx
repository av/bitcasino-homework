import Panel from "./Panel";
import Input from "./Input";
import Button from "./Button";
import CryptoSelector from "./CryptoSelector";

export function CryptoTrackerPanel() {
  return (
    <Panel className="text-gray-900">
      <CryptoSelector />
      <p className="text-center mt-8 text-gray-500 text-sm">
        Use of this service is subject to terms and conditions.
      </p>
    </Panel>
  );
}
