import { Selector } from "testcafe";

fixture`Getting Started`.page`http://localhost:3000/base`;

test("Base header", async (t) => {
  const header = Selector("h1");
  await t.expect(header.textContent).eql("The Base");
});
