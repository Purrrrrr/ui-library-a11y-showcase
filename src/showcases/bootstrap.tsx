import React from 'react';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import {stringField, booleanField, optionsField, numberField} from '../components/ComponentShowcase';
import {getBreadcrumbTexts} from './utils/breadcrumbs';
import {showcaseCollection} from './utils/showcaseCollection';

const bootstrapShowcases = showcaseCollection("Bootstrap", "bootstrap");
export default bootstrapShowcases.showcases;

export const bootstrapButton = bootstrapShowcases.add<typeof Button>(
  "Button", {
    component: Button,
    fields: {
      variant: optionsField([
        'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link',
        'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-light', 'outline-dark', 'outline-link'
      ]),
      size: optionsField([undefined, 'lg', 'sm' ]),
      children: stringField("Text"),
      disabled: booleanField(),
      block: booleanField(),
    }
  });

function BreadcrumbWrapper(
  {numberOfItems} : { numberOfItems: number }
) {
  const texts = getBreadcrumbTexts(numberOfItems);
  return <Breadcrumb label={"Bootstrap Breadcrumbs #"+numberOfItems}>
    {texts.slice(0, -1).map((text,i) => <Breadcrumb.Item key={i} href="#">{text}</Breadcrumb.Item>)}
    <Breadcrumb.Item active color="textPrimary">{texts[numberOfItems-1]}</Breadcrumb.Item>
  </Breadcrumb>
}

export const bootstrapBreadcrumbs = bootstrapShowcases.add<typeof BreadcrumbWrapper>(
  "Breadcrumbs", {
    component: BreadcrumbWrapper,
    fields: {
      numberOfItems: numberField(1, {min: 1, generatedMax: 15}),
    }
  });
