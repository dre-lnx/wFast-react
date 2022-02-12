import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../components/navBar';

//import PageNotFound from '../PageNotFound.js';
import Dashboard from '../pages/dashboard'
import Item from '../pages/item'
import ProfileEdit from '../pages/profileEdit'
import Profile from '../pages/profile'
import Home from '../pages/home';

const Private_routes = () => {
    return (
        <BrowserRouter>
          <Switch>
          <div>
              <NavBar />
              <Route path="/" exact component={Home} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/item" exact component={Item} />
              <Route path="/profile/edit" exact component={ProfileEdit} />
              <Route path="/profile" exact component={Profile} />
          </div>
          </Switch>
        </BrowserRouter>
      )
};

export default Private_routes;