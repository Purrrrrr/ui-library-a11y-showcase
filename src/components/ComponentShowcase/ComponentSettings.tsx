import React from 'react';
import {FieldsDef, FieldDef, FieldComponentProps} from './types';

interface ComponentSettingsProps<P> {
  props: P
  setProps: (p: P) => void
  fields: FieldsDef<P>
  fieldFilter?: (f: FieldDef<any>) => boolean
}

export function SettingsBox({children} : {children: React.ReactNode}) {
  return <div className="componentSettings">
    <h2>Settings</h2>
    {children}
  </div>
}

export function ComponentSettings<P>({props, setProps, fields, fieldFilter} : ComponentSettingsProps<P>) {
  const keys = Object.keys(fields) as [keyof P];
  return <>
    {keys.map(key => {
      const fieldDef = fields[key];
      if (fieldFilter && !fieldFilter(fieldDef)) return null;
      const Field = fieldDef.fieldComponent;
      return <Field key={String(key)} data={fieldDef.data} label={String(key)}
        value={props[key]} onChange={(value) => setProps({...props, [key]: value})} />
    })}
  </>
}

export function StringInput({value, onChange, label} : FieldComponentProps<string>) {
  return <LabeledInput type="text" value={value} onChange={e => onChange(e.target.value)} label={label} />;
}
export function NumberInput({value, onChange, label} : FieldComponentProps<number>) {
  return <LabeledInput type="number" value={String(value)} onChange={e => onChange(parseFloat(e.target.value))} label={label} />;
}
export function BooleanInput({value, onChange, label} : FieldComponentProps<boolean>) {
  return <LabeledInput type="checkbox" className="boolean" checked={value} onChange={e => onChange(e.target.checked)} label={label} />;
}
export function OptionsInput<T>({value, onChange, label, data: options} : FieldComponentProps<T, T[]>) {
  if (!options) return <>Error</>;
  return <Labeled label={label}>
    <select id={label} value={options.indexOf(value)} onChange={e => onChange(options[parseInt(e.target.value, 10)])}>
      {options.map((optionValue, index) => <option value={index} key={index}>{String(optionValue)}</option>)}
    </select>
  </Labeled>
}

interface LabeledInputProps extends React.ComponentProps<"input">{
  label: string
}
function LabeledInput({label, className, ...props} : LabeledInputProps) {
  return <Labeled label={label} className={className}>
    <input {...props} id={label} />
  </Labeled>
}
function Labeled({label, className, children} : LabeledInputProps) {
  return <div className={className}>
    <label htmlFor={label}>{label}</label>
    {children}
  </div>
}
