import React from 'react';
import { BrowserRouter, useRoutes, NavLink } from 'react-router-dom';
import './App.scss';
import {ComponentShowcase, Showcase} from './components/ComponentShowcase';
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
    {Object.keys(showcases).map(name => <React.Fragment key={name}>{' '}<NavLink to={name}>{name}</NavLink></React.Fragment>)}
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

function MultiShowcase({showcases} : {showcases : Showcase<any, any>[]}) {
  return <>
  {showcases.map(showcase => <ComponentShowcase key={showcase.id} showcase={showcase} />)}
  </>;
}

export default App;
