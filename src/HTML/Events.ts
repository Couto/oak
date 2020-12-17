/**
 * Events are special attributes, however instead of being an object are a function
 */

import { curry } from "../utils";

type HTMLEventNames =
  | "load"
  | "unload"
  | "abort"
  | "error"
  | "select"
  | "change"
  | "submit"
  | "reset"
  | "focus"
  | "resize"
  | "scroll";

type MouseEventNames =
  | "click"
  | "mousedown"
  | "mouseup"
  | "mouseover"
  | "mousemove"
  | "mouseout";

type EventNames = HTMLEventNames | MouseEventNames;

type EventHandler = (e: Event) => void;

type EventOptions = {
  delegate: boolean;
};

export type VEvent = {
  name: EventNames;
  value: EventHandler;
  options: EventOptions;
};

const defaultOptions: EventOptions = {
  delegate: true,
};

type EventCreator = (name: EventNames, handler: EventHandler) => VEvent;

const createEvent: EventCreator = (name, handler) => ({
  name,
  value: handler,
  options: defaultOptions,
});

type EventCreatorWithOptions = (
  name: EventNames,
  handler: EventHandler,
  options: Partial<EventOptions>
) => VEvent;

const createEventWithOptions: EventCreatorWithOptions = (
  name,
  handler,
  options
) => ({
  name,
  value: handler,
  options: { ...defaultOptions, ...options },
});

export const event = curry(createEvent);
export const eventWithOptions = curry(createEventWithOptions);

// HTML Events
export const onLoad = event("load");
export const onUnload = event("unload");
export const onAbort = event("abort");
export const onError = event("error");
export const onSelect = event("select");
export const onChange = event("change");
export const onSubmit = event("submit");
export const onReset = event("reset");
export const onFocus = event("focus");
export const onResize = event("resize");
export const onScroll = event("scroll");

// Mouse Events
export const onClick = event("click");
export const onMouseDown = event("mousedown");
export const onMouseUp = event("mouseup");
export const onMouseOver = event("mouseover");
export const onMouseMove = event("mousemove");
export const onMouseOut = event("mouseout");
