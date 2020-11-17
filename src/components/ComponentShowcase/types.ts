import {UILibrary} from '../LibraryContainer';

export type ShowCase<Comp extends React.JSXElementConstructor<any>, Overrides = {}> = ShowCaseWithOverrides<React.ComponentProps<Comp>, Overrides>
export type ShowCaseWithOverrides<ComponentProps, Overrides> = ShowCaseWithProps<ComponentProps, Omit<ComponentProps, keyof Overrides> & Overrides>
export type ShowCaseWithProps<ComponentProps, OverriddenProps> = {
  library: UILibrary
  defaults?: Partial<ComponentProps>
  component: React.JSXElementConstructor<OverriddenProps | ComponentProps>
  fields: FieldsDef<OverriddenProps>
}

export type FieldsDef<P> = {
  [key in keyof P] : FieldDef<P[key], any, any>
}
export type FieldDef<T, Data = undefined, ChangedT extends T = T> = {
  default: T
  data?: Data
  valueGenerator?: () => T[]
  fieldComponent: FieldComponent<T, Data, ChangedT>
}

export type FieldComponent<T, Data = undefined, ChangedT extends T = T> = React.JSXElementConstructor<FieldComponentProps<T, Data, ChangedT>>;
/** A field for changing a value of type T. Produces values of type ChangedTextends T. Supports optional Data for field options */
export interface FieldComponentProps<T, Data = undefined, ChangedT extends T = T> {
  label: string
  value: T
  onChange: (t: ChangedT) => void
  data: Data
}
