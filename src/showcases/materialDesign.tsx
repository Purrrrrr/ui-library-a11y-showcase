import React, {useState, ComponentProps as PropsOf} from 'react';
import { AppBar, Button, Breadcrumbs, Link, Menu, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';

import {stringField, booleanField, optional, optionsField, numberField} from '../components/ComponentShowcase';
import {getBreadcrumbTexts} from './utils/breadcrumbs';
import {showcaseCollection} from './utils/showcaseCollection';
import {controlInputValue} from './utils/controlInputValue';
import generateId, {autoGenerateId} from './utils/generateId';

const materialShowcases = showcaseCollection("Material Design", "materialDesign");
export default materialShowcases.showcases;

type ButtonProps = PropsOf<typeof Button>;
export const materialButton = materialShowcases.add<typeof Button, {children: string}>(
  "Button", {
    component: Button,
    fields: {
      variant: optionsField<ButtonProps["variant"]>("contained", "outlined", "text"),
      color: optionsField<ButtonProps["color"]>("default", "primary", "secondary"),
      size: optionsField<ButtonProps["size"]>("small", "medium", "large"),
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

export const materialBreadcrumbs = materialShowcases.add<typeof BreadcrumbWrapper>(
  "Breadcrumbs", {
    component: BreadcrumbWrapper,
    fields: {
      numberOfItems: numberField(1, {min: 1, generatedMax: 10}),
    }
  });

type AppBarColor = PropsOf<typeof AppBar>["color"];
function AppBarWrapper({color, toolbarVariant, disableGutters} :
  {color ?: AppBarColor, toolbarVariant: 'regular' | 'dense', disableGutters?: boolean}) {
  const menuId = generateId('menu', {color, toolbarVariant, disableGutters});

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => { setAnchorEl(null) };

  return <AppBar position="static" color={color}>
    <Toolbar variant={toolbarVariant} disableGutters={disableGutters}>
      <Typography variant="h6">
        News
      </Typography>
      <div style={{flexGrow: 1}} />
      <Button color="inherit">Login</Button>
      <Button color="inherit" aria-controls={"menu-"+menuId} onClick={openMenu}>Stuff</Button>
      <Menu
        id={"menu-"+menuId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
        <MenuItem onClick={closeMenu}>Stuff</MenuItem>
      </Menu>

    </Toolbar>
  </AppBar>
}

export const navigation = materialShowcases.add<typeof AppBarWrapper>(
  "Navigation", {
    component: AppBarWrapper,
    fields: {
      color: optionsField<AppBarColor>("default", "primary", "secondary"),
      toolbarVariant: optionsField<'regular' | 'dense'>("regular", "dense"),
      disableGutters: booleanField(),
    }
  });

type TextFieldProps = PropsOf<typeof TextField>;
export const textField = materialShowcases.add<typeof TextField, {value: string, label: string, helperText: string}>(
  "TextField", {
    component: autoGenerateId('textField', {exclude: ['value', 'label', 'placeholder', 'helperText']})(controlInputValue(TextField)),
    tags: ['Form Input'],
    fields: {
      color: optionsField<TextFieldProps["color"]>("primary", "secondary"),
      variant: optionsField<TextFieldProps["variant"]>("filled", "outlined", "standard"),
      size: optionsField<TextFieldProps["size"]>("medium", "small"),
      type: optionsField<TextFieldProps["type"]>("text", "password", "number"),
      fullWidth: booleanField(),
      disabled: booleanField(),
      error: booleanField(),
      value: stringField('Some value'),
      placeholder: optional(stringField('Enter some text...')),
      label: stringField('Input label'),
      helperText: stringField('Some text to help describe the input'),
    }
  });

export const multilineTextField = materialShowcases.add<typeof TextField, {value: string, label: string, helperText: string}>(
  "TextField[multiline]", {
    component: autoGenerateId('textField', {exclude: ['value', 'label', 'placeholder', 'helperText']})(controlInputValue(TextField)),
    defaults: {multiline: true},
    tags: ['Form Input'],
    fields: {
      color: optionsField<TextFieldProps["color"]>("primary", "secondary"),
      variant: optionsField<TextFieldProps["variant"]>("filled", "outlined", "standard"),
      size: optionsField<TextFieldProps["size"]>("medium", "small"),
      fullWidth: booleanField(),
      disabled: booleanField(),
      error: booleanField(),
      value: stringField('Some value'),
      placeholder: optional(stringField('Enter some text...')),
      label: stringField('Input label'),
      helperText: stringField('Some text to help describe the input'),
    }
  });

/** Form textfield
 * TextField
 *   multiline=true
 *   select=true -> <MenuItem>label</MenuItem> as children
 * type => text, password, email, number
 * There is no file input
 *
 * Checkbox
 * RadioGroup
 *
 * Slider
 * Switch
 */
