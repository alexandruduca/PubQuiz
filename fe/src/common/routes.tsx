import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import paths from './paths';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import TeamRegistration from '../pages/TeamRegistration';
import GameResults from '../pages/GameResults';
import FAQ from '../pages/FAQ';
import NewGameResults from '../pages/GameResults/NewGameResults';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Teams from '../pages/Teams';

const routes = createBrowserRouter([
  {
    path: paths.root,
    element: <Layout />,
    children: [
      { path: paths.root, element: <Home /> },
      { path: paths.login, element: <Login /> },
      { path: paths.register, element: <Register /> },
      { path: paths.about, element: <About /> },
      { path: paths.teamRegistration, element: <TeamRegistration /> },
      { path: paths.gameResults, element: <GameResults /> },
      { path: paths.newGame, element: <NewGameResults /> },
      { path: paths.teams, element: <Teams /> },
      { path: paths.faq, element: <FAQ /> },
      { path: paths.contact, element: <Contact /> },
    ],
  },
]);

export default routes;
