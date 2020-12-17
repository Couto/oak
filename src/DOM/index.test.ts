import { div, span, text } from "../HTML/Elements";
import { className, id } from "../HTML/Attributes";
import { onClick } from "../HTML/Events";
import dom from "./";

describe("DOM", () => {
  it("should convert to DOM elements", () => {
    const element = div(
      [id("test"), onClick(jest.fn())],
      [
        span([className("hello")], [text("Hello World")]),
        span([className("bye")], [text("Bye World")]),
      ]
    );

    expect(dom(element)).toMatchInlineSnapshot(`
      <div
        id="test"
      >
        <span
          class="hello"
        >
          Hello World
        </span>
        <span
          class="bye"
        >
          Bye World
        </span>
      </div>
    `);
  });

  it("should attach events", () => {
    const element = div(
      [id("test"), onClick(jest.fn())],
      [
        span([className("hello")], [text("Hello World")]),
        span([className("bye")], [text("Bye World")]),
      ]
    );

    expect(dom(element)).toMatchInlineSnapshot(`
      <div
        id="test"
      >
        <span
          class="hello"
        >
          Hello World
        </span>
        <span
          class="bye"
        >
          Bye World
        </span>
      </div>
    `);
  });
});
