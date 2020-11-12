import React, {useState} from 'react';
import { AxeContainer } from '../AxeContainer';
import {ShowCase, PropsDef} from './types';
import {ComponentSettings} from './ComponentSettings';
import './ComponentShowcase.scss'

export type {ShowCase} from './types';


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

