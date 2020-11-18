import React from 'react';
import {FieldDef, FieldComponent, FieldComponentProps} from './types';

export function stringField(defaultValue : string = "") : FieldDef<string> {
  return field(defaultValue, StringInput);
}
export function numberField(defaultValue : number = 0) : FieldDef<number> {
  return field(defaultValue, NumberInput);
}
export function booleanField(defaultValue : boolean = false) : FieldDef<boolean | undefined, undefined, boolean> {
  return field<boolean | undefined, undefined, boolean>(defaultValue, BooleanInput, {valueGenerator: () => [false, true]});
}
export function optionsField<T>(options: T[]) : FieldDef<T, T[]> {
  return field(options[0], OptionsInput, {data: options, valueGenerator: () => options});
}

export function field<T,D = undefined, ChangedT extends T= T>(defaultValue: T, fieldComponent: FieldComponent<T, D, ChangedT>, rest : Partial<FieldDef<T, D, ChangedT>> = {}) : FieldDef<T, D, ChangedT> {
  return {
    default: defaultValue,
    fieldComponent,
    ...rest
  };
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
