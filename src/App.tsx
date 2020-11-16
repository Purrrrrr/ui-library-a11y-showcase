import React from 'react';
import './App.scss';
import {AxeContainer} from './components/AxeContainer';
import {ComponentShowcase, ShowCase, stringField, booleanField, optionsField} from './components/ComponentShowcase';

import { Button as ButtonBlueprint, Intent} from "@blueprintjs/core";
//import { Button as ButtonSemantic } from 'semantic-ui-react'
//import { Button as ButtonAnt } from 'antd';
import { Button as ButtonMaterial } from '@material-ui/core';
import ButtonBootstrap from 'react-bootstrap/Button';

const buttonShowcase : ShowCase<{intent: Intent,text: string, disabled: boolean, large: boolean, outlined: boolean, fill: boolean, minimal: boolean, small: boolean}, typeof ButtonBlueprint>= {
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
const bootstrapButtonShowcase : ShowCase<{variant: string, children: string, size: "lg" | "sm" | undefined, block: boolean, disabled: boolean}, typeof ButtonBootstrap>= {
  library: "bootstrap",
  component: ButtonBootstrap,
  fields: {
    variant: optionsField([
      'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link',
      'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-light', 'outline-dark', 'outline-link'
    ]),
    size: optionsField([undefined, 'lg', 'sm' ]),
    children: stringField("Text"),
    block: booleanField(),
    disabled: booleanField(),
    /*
     * large: booleanField(),
    small: booleanField(),
    outlined: booleanField(),
    minimal: booleanField(),
    fill: booleanField(), */
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
    <ComponentShowcase showcase={buttonShowcase} />
    <ComponentShowcase showcase={bootstrapButtonShowcase} />
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
