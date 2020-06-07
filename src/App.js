import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>Hats page</h1>
  </div>
)

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/shop/hats' component={HatsPage} />
          <Route exact path='/' component= {HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
