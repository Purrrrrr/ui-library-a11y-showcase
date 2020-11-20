import React, {useState} from 'react';
import {AxeContainer} from '../AxeContainer';
import {ShowcaseWithProps, FieldsDef} from './types';
import {ComponentSettings} from './ComponentSettings';
import {BooleanInput} from './fields';
import {ComponentVariants} from './ComponentVariants';
import './ComponentShowcase.scss'

export type {Showcase, ShowcaseWithProps, FieldsDef} from './types';
export {stringField, booleanField, numberField, optionsField, field} from './fields';

export function ComponentShowcase<A,P>({showcase} : {showcase: ShowcaseWithProps<A, P>}) {
  const {wrapperComponent, title, component: Component, fields, id} = showcase;
  const [props, setProps] = useState<P>({...showcase.defaults ?? {}, ...getDefaultProps(fields)})
  const [generateVariants, setGenerateVariants] = useState(true);

  return <section className="componentShowcase">
    <h2>{title}</h2>
    <AxeContainer wrapperComponent={wrapperComponent}>
      {generateVariants ? <ComponentVariants Component={Component} props={props} fields={fields} />: <Component {...props}/>}
    </AxeContainer>
    <div className="componentSettings">
      <h2>Settings</h2>
      <BooleanInput id={id+"-show-all-variants"} label="Generate variants automatically"
        value={generateVariants} onChange={setGenerateVariants} data={undefined}/>
      <ComponentSettings id={id} props={props} setProps={setProps}
        fields={fields} fieldFilter={generateVariants ? field => !field.valueGenerator : undefined}/>
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
