import React, {useState} from 'react';
import { AxeContainer } from '../AxeContainer';
import {ShowCase, FieldsDef, FieldDef, FieldComponent} from './types';
import {SettingsBox,ComponentSettings, StringInput, NumberInput, BooleanInput, OptionsInput} from './ComponentSettings';
import {ComponentVariants} from './ComponentVariants';
import './ComponentShowcase.scss'

export type {ShowCase} from './types';

export function ComponentShowcase<P,A extends React.JSXElementConstructor<any>>({showcase} : {showcase: ShowCase<P,A>}) {
  const {library, component: Component, fields} = showcase;
  const [props, setProps] = useState<P>({...showcase.defaults ?? {}, ...getDefaultProps(fields)})
  const [generateVariants, setGenerateVariants] = useState(true);

  return <section className="componentShowcase">
    <AxeContainer library={library}>
      {generateVariants ? <ComponentVariants Component={Component} props={props} fields={fields} />: <Component {...props}/>}
    </AxeContainer>
    <SettingsBox>
      <BooleanInput label="Generate variants automatically" value={generateVariants} onChange={setGenerateVariants} data={undefined}/>
      <ComponentSettings props={props} setProps={setProps} fields={fields} fieldFilter={generateVariants ? field => !field.valueGenerator : undefined}/>
    </SettingsBox>
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
export function booleanField(defaultValue : boolean = false) : FieldDef<boolean> {
  return field(defaultValue, BooleanInput, {valueGenerator: () => [false, true]});
}
export function optionsField<T>(options: T[]) : FieldDef<T, T[]> {
  return field(options[0], OptionsInput, {data: options, valueGenerator: () => options});
}

export function field<T,D = undefined>(defaultValue: T, fieldComponent: FieldComponent<T, D>, rest : Partial<FieldDef<T, D>> = {}) : FieldDef<T, D> {
  return {
    default: defaultValue,
    fieldComponent,
    ...rest
  };
}
