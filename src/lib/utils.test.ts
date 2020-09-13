import * as utils from "./utils";

describe("classed", () => {
  it("should combine given class names", () => {
    expect(utils.classed("fresh", "and", "cool")).toBe("fresh and cool");
  });

  it("should omit empty or falsey classes", () => {
    expect(utils.classed("bright", null, "and", undefined, "loud")).toBe(
      "bright and loud"
    );
  });
});

describe("asyncable", () => {
  it("should immediately dispatch plain actions", () => {
    const dispatch = jest.fn();
    const action = { type: "Eat the cake, seriously" };
    const state = { cakesEaten: 0 };
    const dispatcher = utils.asyncable(state, dispatch);

    expect(dispatch).not.toHaveBeenCalled();
    dispatcher(action);
    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it("should pass control to an asyncable action", async () => {
    const eatIt = { type: "The Yummy awaits" };
    const dispatch = jest.fn();
    const state = { yummiesYummied: 0 };

    const dispatcher = utils.asyncable(state, dispatch);
    expect(dispatch).not.toHaveBeenCalled();

    return new Promise((res) => {
      const asyncableAction = async (dispatch) => {
        await blink();
        dispatch(eatIt);
        await blink();
        dispatch(eatIt);
        res();
      };

      dispatcher(asyncableAction);
    }).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    function blink() {
      return new Promise((res) => setTimeout(res));
    }
  });
});

describe("serialise", () => {
  it("should set the given value to localStorage", () => {
    const key = "hairyValue";
    const value = { hairy: true };

    utils.serialize(key, value);
    expect(global.window.localStorage.getItem(key)).toEqual(
      JSON.stringify(value)
    );
  });

  it("should throw when passed a non-serialisable value", () => {
    const key = "loophole";
    const value = { value: null };
    value.value = value;

    expect(() => utils.serialize(key, value)).toThrow();
  });
});

describe("deserialise", () => {
  it("should restore the given key from localStorage", () => {
    const layers = ["tasty", "creamy", "fresh", "creamy again"];
    const key = "cake";
    global.window.localStorage.setItem(key, JSON.stringify(layers));

    expect(utils.deserialize(key, [])).toEqual(layers);
  });

  it("should return default value when given key does not exist", () => {
    const key = Math.random().toString(16).replace(".", "");
    const defaultValue = { theBest: true };

    expect(utils.deserialize(key, defaultValue)).toStrictEqual(defaultValue);
  });
});

describe("isServer", () => {
  /**
   * The opposite scenario is tested in a separate file.
   * utis.node.test.js
   */
  it("should detect that Jest emulates window", () => {
    expect(utils.isServer()).toBe(false);
  });
});

describe("isBrowser", () => {
  /**
   * The opposite scenario is tested in a separate file.
   * utis.node.test.js
   */
  it("should detect that Jest emulates window", () => {
    expect(utils.isBrowser()).toBe(true);
  });
});

describe("debounce", () => {
  it("should only call given function after a delay", async () => {
    const debby = jest.fn();
    const debounced = utils.debounce(debby, 10);

    // Ofcourse, will not wait for exactly 5ms
    // between tests, but will do for the test case.
    debounced();
    expect(debby).not.toHaveBeenCalled();
    await wait(5);
    expect(debby).not.toHaveBeenCalled();
    await wait(5);
    expect(debby).toHaveBeenCalled();

    function wait(ms) {
      return new Promise((res) => setTimeout(res, ms));
    }
  });
});

describe("identity", () => {
  it("should return whatever passed to it", () => {
    expect(utils.identity(0)).toBe(0);
    expect(utils.identity(global)).toBe(global);
    expect(utils.identity("yeah")).toBe("yeah");
  });
});

describe("noop", () => {
  it("should do nothing", () => {
    expect(() => utils.noop()).not.toThrow();
    expect(utils.noop()).toBeUndefined();
  });
});
