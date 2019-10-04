import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import uniqid from 'uniqid';
import Welcome from './components/welcome/Welcome.js';
import Game from './components/game/Game.js';
import './App.scss';

function App() {

  if (!localStorage.hasOwnProperty('playerId'))
    localStorage.setItem('playerId', uniqid());

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Welcome} exact />
        <Route path='/game' component={Game} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
