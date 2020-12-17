import { element, div, span } from "./Elements";

const parent = {
  name: "div",
  attributes: [],
  children: [],
};

const child = {
  name: "span",
  attributes: [],
  children: [],
};

describe("Elements", () => {
  it("should return an object representing the created element", () => {
    const div = element("div", [], []);

    expect(div).toMatchObject({
      name: "div",
      attributes: [],
      children: [],
    });
  });

  it("should add children to children property", () => {
    const el = div([], [span([], [])]);

    expect(el).toMatchObject({
      ...parent,
      ...{ children: [child] },
    });
  });
});
