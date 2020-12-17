import type { VElement, VText } from "../HTML/Elements";
import type { VAttribute } from "../HTML/Attributes";
import { curry, id, Box } from "../utils";
import type { VEvent } from "../HTML/Events";

const isEvent = (evt: VAttribute | VEvent): evt is VEvent =>
  typeof evt.value === "function";

const isAttribute = (attr: VAttribute | VEvent): attr is VAttribute =>
  typeof attr.value !== "function";

const isText = (text: VElement | VText): text is VText =>
  text.name === "TextNode";

const createElement = (name: string) => document.createElement(name);

const createTextNode = (value: string) => document.createTextNode(value);

const setAttribute = curry((attrs: VAttribute[], element: HTMLElement) =>
  Array.from(attrs).reduce((acc: HTMLElement, attr: VAttribute) => {
    acc.setAttribute(attr.name, attr.value);
    return acc;
  }, element)
);

const eventListener = (element: HTMLElement, handler: EventHandlerNonNull) => (
  event: Event
) => (event.target === element ? handler(event) : id(event));

const attachEvent = curry(
  (events: VEvent[], element: HTMLElement): HTMLElement =>
    Array.from(events).reduce((acc: HTMLElement, evt: VEvent) => {
      acc.addEventListener(evt.name, evt.value);
      return acc;
    }, element)
);

const addChildren = curry(
  (children: (HTMLElement | Text)[], element: HTMLElement): HTMLElement =>
    children.reduce((acc: HTMLElement, child: HTMLElement | Text) => {
      acc.appendChild(child);
      return acc;
    }, element)
);

const createComponent = (node: VElement): HTMLElement => {
  const { name, children, attributes } = node;
  const attrs = attributes.filter(isAttribute);
  const events = attributes.filter(isEvent);
  const htmlChildren = children.map((c: VElement | VText) =>
    isText(c) ? createTextNode(c.value) : createComponent(c)
  );

  return Box<string, HTMLElement>(name)
    .map(createElement)
    .map(setAttribute(attrs))
    .map(attachEvent(events))
    .map(addChildren(htmlChildren))
    .fold(id);
};

export default createComponent;
