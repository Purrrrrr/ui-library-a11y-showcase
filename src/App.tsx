import React from 'react';
import { BrowserRouter, useRoutes, NavLink } from 'react-router-dom';
import './App.scss';
import {ComponentShowcase, ShowCase} from './components/ComponentShowcase';
import buttonShowcases from './showcases/buttons';
import showCases from './showcases';

function App() {
  return <BrowserRouter>
    <Nav />
    <main>
      <Routes />
    </main>
  </BrowserRouter>;
}

function Nav() {
  return <nav>
    <NavLink to="/">🏠Home</NavLink>
    {Object.keys(showCases).map(name => <>{' '}<NavLink to={name}>{name}</NavLink></>)}
  </nav>;
}

function Routes() {
  return useRoutes([
    {path: "/", element: <Home />},
    ...Object.entries(showCases).map(([path, pathShowCases]) => ({
      path, element: <><h1>{path}</h1><MultishowCase showCases={pathShowCases} /></>
    }))
  ]);
}

function Home() {
  return <>
    <h1>Showcases galore!</h1>
  </>;
}

function MultishowCase({showCases} : {showCases : {[k: string]: ShowCase<any, any>}}) {
  return <>
  {Object.values(showCases).map(showcase => <ComponentShowcase showcase={showcase} />)}
  </>;
}

export default App;
