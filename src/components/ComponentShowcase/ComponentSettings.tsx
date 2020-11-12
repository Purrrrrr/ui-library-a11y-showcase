import React from 'react';
import {PropsDef, PropDef} from './types';

export function ComponentSettings<P>({props, setProps, propDefs} : {props: P, setProps: (p: P) => void, propDefs: PropsDef<P>}) {
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
