import React from 'react';

type ShowCase<P> = {
  component: React.JSXElementConstructor<P>
  defs: PropsDef<P>
}

type PropsDef<P> = {
  [key in keyof P] : PropDef<P[key]>
}
type PropDef<T> = {
  type: PropType<T>
  default: T
  options?: [T]
  min?: T extends number ? number : never
  max?: T extends number ? number : never
}
type PropType<T> = T extends string ? "string"
  : T extends number ? "number"
  : T extends boolean ? "boolean"
  : "other"

const defs : PropsDef<{a: string, b: number, c: "kala" | "sieni"}> = {
  a: { type: "string", default: "sad"},
  b: { type: "number", default: 2},
  c: { type: "string", default: "kala"},
};

export const a : ShowCase<{a: string, b: number}> = {
  component: (pr ) => { return <p>{pr.a} {pr.b} {pr.b}</p>},
  defs
}

export function A() {}
