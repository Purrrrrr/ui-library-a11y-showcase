import React from 'react';
import './App.scss';
import {AxeContainer} from './components/AxeContainer';
import {ComponentShowcase, ShowCase} from './components/ComponentShowcase';

import { Button as ButtonBlueprint } from "@blueprintjs/core";
//import { Button as ButtonSemantic } from 'semantic-ui-react'
//import { Button as ButtonAnt } from 'antd';
import { Button as ButtonMaterial } from '@material-ui/core';
import ButtonBootstrap from 'react-bootstrap/Button';

const buttonShowcase : ShowCase<{text: string, disabled: boolean}, typeof ButtonBlueprint>= {
  library: "blueprint",
  component: ButtonBlueprint,
  defs: {
    text: { type: "string", default: "Text" },
    disabled: { type: "boolean", default: false },
  }
}

function App() {
  return <main>
    <h1>Showcase</h1>
    <AxeContainer library="blueprint">
      <ButtonBlueprint>Blueprint</ButtonBlueprint>
    </AxeContainer>
    <AxeContainer library="bootstrap">
      <ButtonBootstrap variant="danger">Bootstrap Design</ButtonBootstrap>
    </AxeContainer>
    <AxeContainer library="materialDesign">
      <ButtonMaterial>Material</ButtonMaterial>
    </AxeContainer>
    <ComponentShowcase showcase={buttonShowcase} />
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
