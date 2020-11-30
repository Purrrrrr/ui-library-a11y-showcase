import React, {ComponentProps as PropsOf} from 'react';
import { Alignment, Button, Breadcrumbs, FormGroup, InputGroup, Intent, IBreadcrumbProps, Menu, MenuItem, Navbar, NumericInput, Popover, Position, TextArea} from "@blueprintjs/core";

import {stringField, booleanField, optional, optionsField, numberField} from '../components/ComponentShowcase';
import {getBreadcrumbTexts} from './utils/breadcrumbs';
import {showcaseCollection} from './utils/showcaseCollection';
import {controlInputValue, controlInputValueWithHandlers} from './utils/controlInputValue';
import generateId from './utils/generateId';

const blueprintShowcases = showcaseCollection("Blueprint", "blueprint");
export default blueprintShowcases.showcases;

const intentField = optional(optionsField(...Object.values(Intent)));
const popoverProps = {portalClassName: 'blueprint'};

export const button = blueprintShowcases.add<typeof Button, {text: string}>(
  'Button', {
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
  });

function BreadcrumbWrapper(
  {numberOfItems, icon} : { numberOfItems: number, icon?: boolean }
) {
  const items : IBreadcrumbProps[] = getBreadcrumbTexts(numberOfItems)
    .map(text => ({text, icon: icon ? 'home' : undefined}));
  return <div style={{maxWidth: 500}}><Breadcrumbs items={items} popoverProps={popoverProps}/></div>
}

export const breadcrumbs = blueprintShowcases.add<typeof BreadcrumbWrapper>(
  "Breadcrumbs", {
    component: BreadcrumbWrapper,
    fields: {
      numberOfItems: numberField(1, {min: 1, generatedMax: 10}),
      icon: booleanField(),
    }
  });

function NavBarWrapper() {
  const menu = <Menu>
    <MenuItem text="Child one" />
    <MenuItem text="Child two" />
    <MenuItem text="Child three" />
  </Menu>;

  return <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>Blueprint</Navbar.Heading>
      <Navbar.Divider />
      <Button minimal icon="home" text="Home" />
      <Button minimal icon="document" text="Files" />
      <Popover content={menu} position={Position.RIGHT_BOTTOM} {...popoverProps} >
        <Button minimal icon="add" text="Dropdown" />
      </Popover>
    </Navbar.Group>
  </Navbar>;
}

export const navigation = blueprintShowcases.add<typeof NavBarWrapper>(
  "Navigation", {
    component: NavBarWrapper,
    fields: {}
  });

interface CommonInputProps {
  id?: string
  disabled?: boolean
  intent?: Intent
}
type FormGroupProps = Pick<PropsOf< typeof FormGroup>, 'inline' | 'intent'> & {label?: string, helperText?: string}

function wrapWithFormGroup<P extends CommonInputProps>(idBase: string, Input: React.ComponentType<P>) : React.ComponentType<P & FormGroupProps> {
  return ({id: maybeId, disabled, inline, intent, label, helperText, ...rest}) => {
    const id = maybeId ?? generateId(idBase, {disabled, inline, intent, ...rest}, {exclude: ['id', 'placeholder']});
    const props = {...rest, intent, disabled, id} as P;

    return <FormGroup disabled={disabled} labelFor={id} inline={inline} label={label} helperText={helperText} >
      <Input {...props} />
    </FormGroup>
  }
}
const formGroupFields = {
  inline: booleanField(),
  disabled: booleanField(),
  label: optional(stringField('Input label')),
  helperText: optional(stringField('Some text to help describe the input')),
};

const WrappedTextInput = controlInputValue(wrapWithFormGroup('InputGroup',  InputGroup));
export const textInput = blueprintShowcases.add<typeof WrappedTextInput>(
  "InputGroup", {
    component: WrappedTextInput,
    tags: ['Form Input'],
    fields: {
      intent: intentField,
      type: optional(optionsField('text', 'password')),
      large: booleanField(),
      small: booleanField(),
      round: booleanField(),
      value: optional(stringField('Some value')),
      placeholder: optional(stringField('Enter some text...')),
      ...formGroupFields,
    }
  });

const WrappedTextArea = controlInputValue(wrapWithFormGroup('TextArea', TextArea));
export const textArea = blueprintShowcases.add<typeof WrappedTextArea, {value: string}>(
  "TextArea", {
    component: WrappedTextArea,
    tags: ['Form Input'],
    fields: {
      intent: intentField,
      large: booleanField(),
      small: booleanField(),
      growVertically: booleanField(),
      value: stringField('Some value'),
      placeholder: optional(stringField('Enter some text...')),
      ...formGroupFields,
    }
  });

const WrappedNumericInput = controlInputValueWithHandlers(setValue => ({onValueChange: setValue}), wrapWithFormGroup('NumericInput', NumericInput));
export const numericInput = blueprintShowcases.add<typeof WrappedNumericInput, {value: number}>(
  "NumericInput", {
    component: WrappedNumericInput,
    tags: ['Form Input'],
    fields: {
      intent: intentField,
      large: booleanField(),
      value: numberField(0),
      min: optional(numberField(-100)),
      max: optional(numberField(100)),
      placeholder: optional(stringField('Enter some text...')),
      ...formGroupFields,
    }
  });

/** Form inputs:
 * Text input (password? email?)
 * Textarea?
 * Numeric input
 * Tag input
 * File input
 *
 * HTML Select
 * React select
 *
 * Checkbox
 * Radio
 *
 * Slider
 * Switch
 */

