import { id } from "./Attributes";

describe("Attributes", () => {
  it("should return an object representing the created element", () => {
    const attr = id("foo");

    expect(attr).toMatchObject({
      name: "id",
      value: "foo",
    });
  });
});
