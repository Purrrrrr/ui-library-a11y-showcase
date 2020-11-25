import React from 'react';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

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


function NavBarWrapper({variant} : React.ComponentProps<Navbar>) {
  return <Navbar variant={variant} bg={variant} aria-label={"Boostrap Navigation "+variant}>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls={"basic-navbar-nav-"+variant} />
    <Navbar.Collapse id={"basic-navbar-nav-"+variant}>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id={"basic-nav-dropdown-"+variant}>
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
}

export const navigation = bootstrapShowcases.add<typeof NavBarWrapper>(
  "Navigation", {
    component: NavBarWrapper,
    fields: {
      variant: optionsField(['light', 'dark']),
    }
  });
