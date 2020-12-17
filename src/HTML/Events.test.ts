import { onClick, onLoad } from "./Events";
import type { VEvent } from "./Events";

describe("Events", () => {
  it("should return an object representing the created event", () => {
    const handler = jest.fn();
    const evt = onClick(handler);

    const event: VEvent = {
      name: "click",
      value: handler,
      options: { delegate: true },
    };

    expect(evt).toMatchObject(event);
  });
});
