import React from 'react';
import './App.css';
import Nav from './Nav';
import Search from './Search';
import Favorites from './Favorites';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Search" component={Search} />
          <Route path="/Favorites" component={Favorites} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
