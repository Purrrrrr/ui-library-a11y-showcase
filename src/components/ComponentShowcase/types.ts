import {UILibrary} from '../LibraryContainer';

export type ShowCase<DefProps, Comp extends React.JSXElementConstructor<any>> = _ShowCase<DefProps, React.ComponentProps<Comp>>
type _ShowCase<DefProps, AllProps> = {
  library: UILibrary
  defaults?: Partial<AllProps>
  component: React.JSXElementConstructor<DefProps | AllProps>
  fields: FieldsDef<DefProps>
}

export type FieldsDef<P> = {
  [key in keyof P] : FieldDef<P[key], any>
}
export type FieldDef<T, Data = undefined> = {
  default: T
  data?: Data
  valueGenerator?: () => T[]
  fieldComponent: FieldComponent<T, Data>
}

export type FieldComponent<T, Data = undefined> = React.JSXElementConstructor<FieldComponentProps<T, Data>>;
export interface FieldComponentProps<T, Data = undefined> {
  label: string
  value: T
  onChange: (t: T) => void
  data: Data
}
