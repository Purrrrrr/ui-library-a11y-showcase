import React from 'react';
import { BrowserRouter, useRoutes, NavLink } from 'react-router-dom';
import './App.scss';
import {ComponentShowcase, Showcase} from './components/ComponentShowcase';
import buttonShowcases from './showcases/buttons';
import showcases from './showcases';

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
    {Object.keys(showcases).map(name => <>{' '}<NavLink to={name}>{name}</NavLink></>)}
  </nav>;
}

function Routes() {
  return useRoutes([
    {path: "/", element: <Home />},
    ...Object.entries(showcases).map(([path, pathShowcases]) => ({
      path, element: <><h1>{path}</h1><MultiShowcase showcases={pathShowcases} /></>
    }))
  ]);
}

function Home() {
  return <>
    <h1>Showcases galore!</h1>
  </>;
}

function MultiShowcase({showcases} : {showcases : {[k: string]: Showcase<any, any>}}) {
  return <>
  {Object.values(showcases).map(showcase => <ComponentShowcase showcase={showcase} />)}
  </>;
}

export default App;
