import React from 'react';
import './App.scss';
import {AxeContainer} from './components/AxeContainer';

import { Button as ButtonBlueprint } from "@blueprintjs/core";
//import { Button as ButtonSemantic } from 'semantic-ui-react'
//import { Button as ButtonAnt } from 'antd';
import { Button as ButtonMaterial } from '@material-ui/core';
import ButtonBootstrap from 'react-bootstrap/Button';


function App() {
  return <main>
    <h1>Showcase</h1>
    <AxeContainer library="blueprint">
      <ButtonBlueprint>Blueprint</ButtonBlueprint>
    </AxeContainer>
    <AxeContainer library="bootstrap">
      <ButtonBootstrap variant="danger">Bootstrap Design</ButtonBootstrap>
      <input type="text" />
      <button></button>
    </AxeContainer>
    <AxeContainer library="materialDesign">
      <ButtonMaterial>Material</ButtonMaterial>
    </AxeContainer>
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
