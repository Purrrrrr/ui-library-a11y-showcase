import React from 'react';
import { BrowserRouter, useRoutes, NavLink } from 'react-router-dom';
import {ComponentShowcase, Showcase} from './components/ComponentShowcase';
import {Navigation} from './components/Navigation';
import showcases, {getTags, getShowcasesForTag, getLibraries, getShowcasesForLibrary} from './showcases';

import './App.scss';

function App() {
  return <BrowserRouter>
    <Nav />
    <main>
      <Routes />
    </main>
  </BrowserRouter>;
}

function Nav() {
  return <Navigation>
    <NavLink to="/">Home</NavLink>
    {" | Libraries: "}
    {getLibraries(showcases).map(name => <React.Fragment key={name}>{' '}<NavLink to={tagToUrl(name)}>{name}</NavLink></React.Fragment>)}
    {" | Element types: "}
    {getTags(showcases).map(name => <React.Fragment key={name}>{' '}<NavLink to={tagToUrl(name)}>{name}</NavLink></React.Fragment>)}
  </Navigation>;
}

function Routes() {
  return useRoutes([
    {path: "/", element: <Home />},
    ...(getTags(showcases).map(tag => ({
      path: tagToUrl(tag),
      element: <><h1>{tag}</h1><MultiShowcase showcases={getShowcasesForTag(showcases, tag)} /></>
    }))),
    ...(getLibraries(showcases).map(library => ({
      path: tagToUrl(library),
      element: <><h1>{library}</h1><MultiShowcase showcases={getShowcasesForLibrary(showcases, library)} /></>
    })))
  ]);
}

function tagToUrl(tag : string) {
  return tag.toLowerCase().replace(/[^a-z]/g, '_');
}

function Home() {
  return <>
    <h1>Showcases galore!</h1>
    <p>Click on the navigation above to load a component accessibility showcase</p>
  </>;
}

function MultiShowcase({showcases} : {showcases : Showcase<any, any>[]}) {
  return <>
  {showcases.map(showcase => <ComponentShowcase key={showcase.id} showcase={showcase} />)}
  </>;
}

export default App;
