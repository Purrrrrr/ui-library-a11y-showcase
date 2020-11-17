import React from 'react';
import './App.scss';
import {AxeContainer} from './components/AxeContainer';
import {ComponentShowcase, ShowCase, stringField, booleanField, optionsField} from './components/ComponentShowcase';

import { Button as ButtonBlueprint, Intent} from "@blueprintjs/core";
//import { Button as ButtonSemantic } from 'semantic-ui-react'
//import { Button as ButtonAnt } from 'antd';
import { Button as ButtonMaterial } from '@material-ui/core';
import ButtonBootstrap from 'react-bootstrap/Button';

const buttonShowcase : ShowCase<typeof ButtonBlueprint, {intent: Intent, text: string}>= {
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
const bootstrapButtonShowcase : ShowCase<typeof ButtonBootstrap>= {
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

function App() {
  return <main>
    <h1>Showcase</h1>
    <AxeContainer library="blueprint">
      <ButtonBlueprint>Blueprint</ButtonBlueprint>
    </AxeContainer>
    <AxeContainer library="materialDesign">
      <ButtonMaterial>Material Design</ButtonMaterial>
    </AxeContainer>
    <ComponentShowcase id="blueprint-button" showcase={buttonShowcase} />
    <ComponentShowcase id="bootstrap-button" showcase={bootstrapButtonShowcase} />
  </main>;
}

  /*
    <div className="semantic">
      <ButtonSemantic>Semantic UI</ButtonSemantic>
    </div>
    <div className="antd">
      <ButtonAnt>Ant Design</ButtonAnt>
    </div> */

export default App;
