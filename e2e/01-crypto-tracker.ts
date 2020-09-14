import { Selector } from "testcafe";

// In actual project, these tests would run
// against a configured environment, incl. CI, Test or Staging.
// Running it against the locally running application
// for simplicity and as a matter of an example.
fixture`Crypto Tracker`.page`http://localhost:3000`;

test("Basic features", async (t) => {
  const features = [
    "[data-e2e-tracker-section]",
    "[data-e2e-tracker-splash]",
    "[data-e2e-crypto-list]",
    "[data-e2e-crypto-selector]",
  ];

  for (const feature of features) {
    await t
      .expect(Selector(feature).exists)
      .ok(`Expected ${feature} to be present.`);
  }
});

test.only("Adding a new tracked asset", async (t) => {
  const selectors = {
    input: "[data-e2e-crypto-selector] input",
    suggestion: "[data-e2e-crypto-suggestion]",
    submit: '[data-e2e-crypto-selector] [type="submit"]',
    item: "[data-e2e-crypto-item]",
  };

  await t.expect(Selector(selectors.item).exists).eql(false);

  await t
    .typeText(selectors.input, "BTC")
    .click(selectors.suggestion)
    .click(selectors.submit);

  await t.debug();
  await t
    .expect(Selector(selectors.item).exists)
    .ok(`Expected new crypto item to be added to the tracker`);
});
