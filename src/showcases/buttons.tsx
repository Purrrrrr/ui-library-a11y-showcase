import { Button as ButtonBlueprint, Intent} from "@blueprintjs/core";
import { Button as ButtonMaterial } from '@material-ui/core';
import ButtonBootstrap from 'react-bootstrap/Button';

import {Showcase, stringField, booleanField, optionsField} from '../components/ComponentShowcase';

export const blueprintButtonShowcase : Showcase<typeof ButtonBlueprint, {intent: Intent, text: string}>= {
  id: 'blueprint-button',
  title: "Blueprint Button",
  library: "blueprint",
  component: ButtonBlueprint,
  fields: {
    intent: optionsField(Object.values(Intent)),
    text: stringField("Text"),
    large: booleanField(),
    small: booleanField(),
    outlined: booleanField(),
    minimal: booleanField(),
    disabled: booleanField(),
    fill: booleanField(),
  }
}
export const bootstrapButtonShowcase : Showcase<typeof ButtonBootstrap>= {
  id: 'bootstrap-button',
  title: "Bootstrap Button",
  library: "bootstrap",
  component: ButtonBootstrap,
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
}
export const materialButtonShowcase : Showcase<typeof ButtonMaterial, {children: string}>= {
  id: 'material-button',
  title: "Material Design Button",
  library: "materialDesign",
  component: ButtonMaterial,
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

const buttonShowcases = {
  material: materialButtonShowcase,
  blueprint: blueprintButtonShowcase,
  bootstrap: bootstrapButtonShowcase,
};
export default buttonShowcases;
