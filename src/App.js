import React from "react";
import "./App.css";
import Nav from "./Nav";
import Search from "./Search";
import Favorites from "./Favorites";
import { BrowserRouter, Switch, Route } from "react-router-dom";
require('dotenv').config();

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/Favorites" component={Favorites} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
