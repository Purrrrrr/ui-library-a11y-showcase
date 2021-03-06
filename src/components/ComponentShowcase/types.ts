export type Showcase<Comp extends React.ComponentType<any>, Overrides = {}> = ShowcaseWithOverrides<React.ComponentProps<Comp>, Overrides>
export type ShowcaseWithOverrides<ComponentProps, Overrides> = ShowcaseWithProps<ComponentProps, Omit<ComponentProps, keyof Overrides> & Overrides>
export type ShowcaseWithProps<ComponentProps, OverriddenProps> = {
  id: string
  title: string
  tags?: string[]
  libraryName?: string,
  defaults?: Partial<ComponentProps>
  component: React.ComponentType<OverriddenProps | ComponentProps>
  //Sometimes components need to be wrapped into a wrapper for things to work. The wrapper wraps all the generated variants of the component
  wrapperComponent?: React.ComponentType<React.PropsWithChildren<{}>>
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

export type FieldComponent<T, Data = undefined, ChangedT extends T = T> = React.ComponentType<FieldComponentProps<T, Data, ChangedT>>;
/** A field for changing a value of type T. Produces values of type ChangedTextends T. Supports optional Data for field options */
export interface FieldComponentProps<T, Data = undefined, ChangedT extends T = T> {
  id: string
  label: string
  value: T
  onChange: (t: ChangedT) => void
  data: Data
}
