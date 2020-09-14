import Screens, { ScreensHandle } from "./Screens";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";

describe("<Screens />", () => {
  it("should render default screen", () => {
    const content = "Radio Freedom";
    const w = shallow(
      <Screens screens={{ default: () => <span>{content}</span> }} />
    );

    expect(w.html()).toContain(content);
  });

  it("should render custom default screen", () => {
    const content = "Rainy Foggy Stormy";
    const w = shallow(
      <Screens
        screens={{ weather: () => <span>{content}</span> }}
        defaultScreen="weather"
      />
    );

    expect(w.html()).toContain(content);
  });

  it("should expose an imperative ref with a handle", () => {
    let screensRef;

    mount(
      <Screens
        ref={(screens) => (screensRef = screens)}
        screens={{ default: () => "Yup" }}
      />
    );

    expect(screensRef).toBeDefined();
    expect(screensRef).toHaveProperty("setScreen");
    expect(typeof screensRef.setScreen).toBe("function");
  });

  it("should pass an imperative handle to rendered screens", () => {
    let screensRef;

    mount(
      <Screens
        screens={{
          default: (screens) => {
            screensRef = screens;
            return "Yeah";
          },
        }}
      />
    );

    expect(screensRef).toBeDefined();
    expect(screensRef).toHaveProperty("setScreen");
    expect(typeof screensRef.setScreen).toBe("function");
  });

  it("should allow controlling the selected screen with a ref", async () => {
    const screens = Array(5)
      .fill(0)
      .map(() => Math.random().toString(16).replace(".", ""))
      .reduce((screens, screen) => {
        screens[screen] = () => screen;
        return screens;
      }, {});
    const screenKeys = Object.keys(screens);
    let ref: ScreensHandle;

    let w = mount(
      <Screens
        transition={{ duration: 0 }}
        screens={screens}
        defaultScreen={screenKeys[0]}
        ref={(screens) => (ref = screens)}
      />
    );

    expect(w.html()).toContain(screenKeys[0]);

    for (const screen of screenKeys) {
      await act(async () => {
        ref.setScreen(screen);
      });
      w = w.update();

      expect(w.html()).toContain(screen);
    }
  });
});
