import React from 'react';
import { Button, Breadcrumbs, Intent, IBreadcrumbProps} from "@blueprintjs/core";

import {Showcase, stringField, booleanField, optionsField, numberField} from '../components/ComponentShowcase';
import {libraryContainerFor} from '../components/LibraryContainer';
import {getBreadcrumbTexts} from './utils/breadcrumbs';

const wrapper = libraryContainerFor("blueprint");

const intentField = optionsField(Object.values(Intent));
const popoverProps = {portalClassName: 'blueprint'};

export const blueprintButton : Showcase<typeof Button, {intent: Intent, text: string}>= {
  id: 'blueprint-button',
  title: "Blueprint Button",
  wrapperComponent: wrapper,
  component: Button,
  fields: {
    intent: intentField,
    text: stringField("Text"),
    large: booleanField(),
    small: booleanField(),
    outlined: booleanField(),
    minimal: booleanField(),
    disabled: booleanField(),
    fill: booleanField(),
  }
}

function BreadcrumbWrapper(
  {numberOfItems, icon} : {
    numberOfItems: number
    icon?: boolean
  }
) {
  const items : IBreadcrumbProps[] = getBreadcrumbTexts(numberOfItems)
    .map(text => ({text, icon: icon ? 'home' : undefined}));
  return <div style={{maxWidth: 500}}><Breadcrumbs items={items} popoverProps={popoverProps}/></div>
}

export const blueprintBreadcrumbs: Showcase<typeof BreadcrumbWrapper>= {
  id: 'blueprint-button',
  title: "Blueprint Button",
  wrapperComponent: wrapper,
  component: BreadcrumbWrapper,
  fields: {
    numberOfItems: numberField(1, {min: 1, generatedMax: 10}),
    icon: booleanField(),
  }
}
