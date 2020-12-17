import { curry } from "../utils";

export type VAttribute = {
  name: string;
  value: string;
};

// Not really required, but makes the annotation looks nicer and simpler
type AttributeCreator = (name: string, value: string) => VAttribute;

const createAttribute: AttributeCreator = (name, value) => ({ name, value });

export const attribute = curry(createAttribute);
export const id = attribute("id");
export const className = attribute("class");

export const _type = attribute("type");

// we need to interpolate the rest of the attribute name
export const data = curry((prop: string, value: string) =>
  createAttribute(`data-${prop}`, value)
);
