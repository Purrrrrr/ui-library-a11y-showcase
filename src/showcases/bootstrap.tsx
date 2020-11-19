import Button from 'react-bootstrap/Button';

import {Showcase, stringField, booleanField, optionsField} from '../components/ComponentShowcase';
import {libraryContainerFor} from '../components/LibraryContainer';

const wrapper = libraryContainerFor("bootstrap");

export const bootstrapButton: Showcase<typeof Button>= {
  id: 'bootstrap-button',
  title: "Bootstrap Button",
  wrapperComponent: wrapper,
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
}
