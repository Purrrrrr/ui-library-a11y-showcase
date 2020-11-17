import React from 'react';
import {FieldsDef, FieldDef, FieldComponentProps} from './types';

export function SettingsBox({children} : {children: React.ReactNode}) {
  return <div className="componentSettings">
    <h2>Settings</h2>
    {children}
  </div>
}

interface ComponentSettingsProps<P> {
  id: string
  props: P
  setProps: (p: P) => void
  fields: FieldsDef<P>
  fieldFilter?: (f: FieldDef<any>) => boolean
}

export function ComponentSettings<P>({id, props, setProps, fields, fieldFilter} : ComponentSettingsProps<P>) {
  const keys = Object.keys(fields) as [keyof P];
  return <>
    {keys.map(key => {
      const fieldDef = fields[key];
      if (fieldFilter && !fieldFilter(fieldDef)) return null;
      const Field = fieldDef.fieldComponent;
      return <Field id={id+"-"+key} key={String(key)} data={fieldDef.data} label={String(key)}
        value={props[key]} onChange={(value) => setProps({...props, [key]: value})} />
    })}
  </>
}

export function StringInput({id, value, onChange, label} : FieldComponentProps<string>) {
  return <LabeledInput id={id} type="text" value={value} onChange={e => onChange(e.target.value)} label={label} />;
}
export function NumberInput({id, value, onChange, label} : FieldComponentProps<number>) {
  return <LabeledInput id={id} type="number" value={String(value)} onChange={e => onChange(parseFloat(e.target.value))} label={label} />;
}
export function BooleanInput({id, value, onChange, label} : FieldComponentProps<boolean | undefined, undefined, boolean>) {
  return <LabeledInput id={id} type="checkbox" className="boolean" checked={value ?? false} onChange={e => onChange(e.target.checked)} label={label} />;
}
export function OptionsInput<T>({id, value, onChange, label, data: options} : FieldComponentProps<T, T[]>) {
  if (!options) return <>Error</>;
  return <Labeled id={id} label={label}>
    <select id={id} value={options.indexOf(value)} onChange={e => onChange(options[parseInt(e.target.value, 10)])}>
      {options.map((optionValue, index) => <option value={index} key={index}>{String(optionValue)}</option>)}
    </select>
  </Labeled>
}

interface LabeledInputProps extends React.ComponentProps<"input">{
  id: string
  label: string
}
function LabeledInput({id, label, className, ...props} : LabeledInputProps) {
  return <Labeled id={id} label={label} className={className}>
    <input {...props} id={id} />
  </Labeled>
}
function Labeled({label, id, className, children} : LabeledInputProps) {
  return <div className={className}>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
}
