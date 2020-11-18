import React, {useState} from 'react';
import { AxeContainer } from '../AxeContainer';
import {ShowcaseWithProps, FieldsDef, FieldDef, FieldComponent} from './types';
import {ComponentSettings, StringInput, NumberInput, BooleanInput, OptionsInput} from './ComponentSettings';
import {ComponentVariants} from './ComponentVariants';
import './ComponentShowcase.scss'

export type {Showcase} from './types';

export function ComponentShowcase<A,P>({id: propId, showcase} : {id?: string, showcase: ShowcaseWithProps<A, P>}) {
  const {library, title, component: Component, fields, id: showcaseId} = showcase;
  const id = propId ?? showcaseId;
  const [props, setProps] = useState<P>({...showcase.defaults ?? {}, ...getDefaultProps(fields)})
  const [generateVariants, setGenerateVariants] = useState(true);

  return <section className="componentShowcase">
    <h2>{title}</h2>
    <AxeContainer library={library}>
      {generateVariants ? <ComponentVariants Component={Component} props={props} fields={fields} />: <Component {...props}/>}
    </AxeContainer>
    <div className="componentSettings">
      <h2>Settings</h2>
      <BooleanInput id={id+"-show-all-variants"} label="Generate variants automatically" value={generateVariants} onChange={setGenerateVariants} data={undefined}/>
      <ComponentSettings id={id} props={props} setProps={setProps} fields={fields} fieldFilter={generateVariants ? field => !field.valueGenerator : undefined}/>
    </div>
  </section>
}

function getDefaultProps<P>(propDefs : FieldsDef<P>) : P {
  let props : Partial<P> = {}
  const keys = Object.keys(propDefs) as [keyof P];
  for (const key of keys) {
    props[key] = propDefs[key].default;
  }
  return props as P;
}

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
