import React from 'react';
import { Button, Breadcrumbs, Link, Typography } from '@material-ui/core';

import {stringField, booleanField, optionsField, numberField} from '../components/ComponentShowcase';
import {getBreadcrumbTexts} from './utils/breadcrumbs';
import {showcaseWrapper} from './utils/wrapper';

const materialShowcase = showcaseWrapper("Material Design", "materialDesign");

export const materialButton = materialShowcase<typeof Button, {children: string}>(
  "Button", {
    component: Button,
    fields: {
      variant: optionsField<"contained"| "outlined"| "text" | undefined>(["contained", "outlined", "text"]),
      color: optionsField<"default"| "inherit"| "primary" | "secondary" | undefined>(["default", "primary", "secondary"]),
      size: optionsField<"small"| "large" | "medium"| undefined>(["small", "medium", "large"]),
      children: stringField("Text"),
      disabled: booleanField(),
      fullWidth: booleanField(),
      disableElevation: booleanField(),
    }
  });

function BreadcrumbWrapper(
  {numberOfItems} : { numberOfItems: number }
) {
  const texts = getBreadcrumbTexts(numberOfItems);
  return <Breadcrumbs aria-label={"Material Design Breadcrumbs #"+numberOfItems}>
    {texts.slice(0, -1).map((text,i) => <Link key={i} href="#">{text}</Link>)}
    <Typography color="textPrimary">{texts[numberOfItems-1]}</Typography>
  </Breadcrumbs>
}

export const materialBreadcrumbs = materialShowcase<typeof BreadcrumbWrapper>(
  "Breadcrumbs", {
    component: BreadcrumbWrapper,
    fields: {
      numberOfItems: numberField(1, {min: 1, generatedMax: 10}),
    }
  });
