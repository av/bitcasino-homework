/**
 * @jest-environment node
 */

import * as utils from "./utils";

describe("isServer", () => {
  it("should return true in node environment", () => {
    expect(utils.isServer()).toBe(true);
  })
});

describe("isBrowser", () => {
  it("should return false in node environment", () => {
    expect(utils.isBrowser()).toBe(false);
  });
});
