import { curry } from "../utils";
import type { VAttribute } from "./Attributes";
import type { VEvent } from "./Events";

export type VElement = {
  name: string;
  attributes: (VAttribute | VEvent)[];
  children: (VElement | VText)[];
};

export type VText = {
  name: "TextNode";
  value: string;
};

// Not really required, but makes the annotation looks nicer and simpler
type ElementCreator = (
  name: string,
  attributes: (VAttribute | VEvent)[],
  children: (VElement | VText)[]
) => VElement;

const createElement: ElementCreator = (name, attributes, children) => ({
  name,
  attributes,
  children,
  value: null,
});

export const text = (text: string): VText => ({
  name: "TextNode",
  value: text,
});

export const element = curry(createElement);
export const div = element("div");
export const span = element("span");
export const button = element("button");
export const input = element("input");
