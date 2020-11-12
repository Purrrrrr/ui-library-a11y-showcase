import {UILibrary} from '../LibraryContainer';

export type ShowCase<DefProps, Comp extends React.JSXElementConstructor<any>> = _ShowCase<DefProps, React.ComponentProps<Comp>>
type _ShowCase<DefProps, AllProps> = {
  library: UILibrary
  defaults?: Partial<AllProps>
  component: React.JSXElementConstructor<DefProps | AllProps>
  defs: PropsDef<DefProps>
}
//type PartialProps<DefProps, AllProps> = {[k in keyof AllProps]: k extends keyof DefProps ? DefProps[k] : never};

export type PropsDef<P> = {
  [key in keyof P] : PropDef<NonNullable<P[key]>>
}
export type PropDef<T> = {
  type: PropType<T>
  default: T
  options?: [T]
  //min?: T extends number ? number : never
  //max?: T extends number ? number : never
} & Convertible<T>
type Convertible<T> = T extends (number | string | boolean) ? {converter?: never} : {converter: (s: string) => T}

type PropType<T> = T extends string ? "string"
  : T extends number ? "number"
  : T extends boolean ? "boolean"
  : "other"
