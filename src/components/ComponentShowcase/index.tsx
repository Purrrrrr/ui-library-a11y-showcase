import React from 'react';
import {AxeContainer} from '../AxeContainer';
import {ShowcaseWithProps} from './types';
import {useComponentSettings} from './ComponentSettings';
import {ComponentVariantsView} from './ComponentVariantsView';

import './ComponentShowcase.scss'

export type {Showcase, ShowcaseWithProps, FieldsDef} from './types';
export * from './fields';

export function ComponentShowcase<A,P>({showcase} : {showcase: ShowcaseWithProps<A, P>}) {
  const {wrapperComponent, title, component: Component} = showcase;
  const {props, variants, settingsFields} = useComponentSettings(showcase);

  return <section className="componentShowcase">
    <h2>{title}</h2>
    <div className="component">
      {variants && <p>Showing {variants.count} variants</p>}
      <AxeContainer wrapperComponent={wrapperComponent}>
        {variants
          ? <ComponentVariantsView component={Component} variants={variants} />
          : <Component {...props}/>
        }
      </AxeContainer>
    </div>
    <div className="componentSettings">
      <h2>Settings</h2>
      {settingsFields}
    </div>
  </section>
}
