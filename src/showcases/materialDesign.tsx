import { Button } from '@material-ui/core';

import {Showcase, stringField, booleanField, optionsField} from '../components/ComponentShowcase';

export const materialButtonShowcase : Showcase<typeof Button, {children: string}>= {
  id: 'material-button',
  title: "Material Design Button",
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
}
