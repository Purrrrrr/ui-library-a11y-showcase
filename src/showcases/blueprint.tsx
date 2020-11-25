import React from 'react';
import { Alignment, Button, Breadcrumbs, Intent, IBreadcrumbProps, Menu, MenuItem, Navbar, Popover, Position} from "@blueprintjs/core";

import {stringField, booleanField, optionsField, numberField} from '../components/ComponentShowcase';
import {getBreadcrumbTexts} from './utils/breadcrumbs';
import {showcaseCollection} from './utils/showcaseCollection';

const blueprintShowcases = showcaseCollection("Blueprint", "blueprint");
export default blueprintShowcases.showcases;

const intentField = optionsField(Object.values(Intent));
const popoverProps = {portalClassName: 'blueprint'};

export const button = blueprintShowcases.add<typeof Button, {intent: Intent, text: string}>(
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
