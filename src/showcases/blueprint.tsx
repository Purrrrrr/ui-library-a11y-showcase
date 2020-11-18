import { Button, Intent} from "@blueprintjs/core";

import {Showcase, stringField, booleanField, optionsField} from '../components/ComponentShowcase';
import {libraryContainerFor} from '../components/LibraryContainer';

const wrapper = libraryContainerFor("blueprint");

export const blueprintButtonShowcase : Showcase<typeof Button, {intent: Intent, text: string}>= {
  id: 'blueprint-button',
  title: "Blueprint Button",
  wrapperComponent: wrapper,
  component: Button,
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
