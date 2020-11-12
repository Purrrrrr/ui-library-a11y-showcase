import React, {useState} from 'react';
import { AxeContainer } from '../AxeContainer';
import {UILibrary} from '../LibraryContainer';

import './ComponentShowcase.scss'

export type ShowCase<DefProps, Comp extends React.JSXElementConstructor<any>> = _ShowCase<DefProps, React.ComponentProps<Comp>>
type _ShowCase<DefProps, AllProps> = {
  library: UILibrary
  defaults?: Partial<AllProps>
  component: React.JSXElementConstructor<DefProps | AllProps>
  defs: PropsDef<DefProps>
}
//type PartialProps<DefProps, AllProps> = {[k in keyof AllProps]: k extends keyof DefProps ? DefProps[k] : never};

type PropsDef<P> = {
  [key in keyof P] : PropDef<NonNullable<P[key]>>
}
type PropDef<T> = {
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

export function ComponentShowcase<P,A extends React.JSXElementConstructor<any>>({showcase} : {showcase: ShowCase<P,A>}) {
  const {library, component: Component, defs: propDefs} = showcase;
  const [props, setProps] = useState<P>(getDefaultProps(propDefs))

  return <section className="componentShowcase">
    <AxeContainer library={library}>
      <Component {...props} {...showcase.defaults ?? {}}/>
    </AxeContainer>
    <ComponentSettings props={props} setProps={setProps} propDefs={propDefs} />
  </section>
}

function getDefaultProps<P>(propDefs : PropsDef<P>) : P {
  let props : Partial<P> = {}
  const keys = Object.keys(propDefs) as [keyof P];
  for (const key of keys) {
    props[key] = propDefs[key].default;
  }
  return props as P;
}

function ComponentSettings<P>({props, setProps, propDefs} : {props: P, setProps: (p: P) => void, propDefs: PropsDef<P>}) {
  const keys = Object.keys(propDefs) as [keyof P];
  return <div className="componentSettings">
    <h2>Settings</h2>
    {keys.map(key => 
    <ComponentSetting<P[typeof key]> propDef={propDefs[key]} name={String(key)} 
      value={props[key]} onChange={(value) => setProps({...props, [key]: value})} />
    )}
  </div>
}

function ComponentSetting<P>(props : SettingInputProps<P>) {
  return <div className={props.propDef.type}>
    <label htmlFor={props.name}>{props.name}</label>
    <SettingInput {...props}/>
  </div>
}

interface SettingInputProps<P> {
  name: string
  value: P 
  onChange: (p: P) => void  
  propDef: PropDef<P>
}
function SettingInput<P>(props : SettingInputProps<P>) : JSX.Element {
  const {name} = props;
  const {options} = props.propDef;
  if (options && options.length) {
    const {value, onChange} = props;
    return <select id={name} value={options.indexOf(value)} onChange={e => onChange(options[parseInt(e.target.value, 10)])}>
      {options.map((optionValue, index) => <option value={index} key={index}>{String(optionValue)}</option>)}
    </select>
  }
  if (isStringInput(props)) {
    const {value, onChange} = props;
    return <input id={name} type="text" value={value} onChange={e => {onChange(e.target.value)}} />
  }
  if (isNumberInput(props)) {
    const {value, onChange} = props;
    return <input id={name} type="number" value={value} onChange={e => {onChange(parseFloat(e.target.value))}} />
  }
  if (isBooleanInput(props)) {
    const {value, onChange} = props;
    return <input id={name} type="checkbox" checked={value} onChange={e => {onChange(e.target.checked)}} />
  }
  const {value, onChange, propDef} = props;
  const converter = propDef.converter;
  if (!converter) return <p>{String(value)}</p>
  return <input id={name} type="text" value={String(value)} onChange={e => {onChange(converter(e.target.value))}} />
}

function isStringInput(a : any) : a is SettingInputProps<string> {
  return a.propDef.type === 'string';
}
function isNumberInput(a : any) : a is SettingInputProps<number> {
  return a.propDef.type === 'number';
}
function isBooleanInput(a : any) : a is SettingInputProps<boolean> {
  return a.propDef.type === 'boolean';
}
