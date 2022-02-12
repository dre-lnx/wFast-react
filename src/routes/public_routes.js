import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../components/navBar';

import PageNotFound from '../pages/pageNotFound';
import LogIn from '../pages/login'
import SignUp from '../pages/signUp'
import Home from '../pages/home'

const Public_routes = () => {
    return (
        <BrowserRouter>
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <div>
            <NavBar />
            <Route path="/" exact component={Home} />
            <Route path="*" component={PageNotFound} />
          </div>
        </Switch>
      </BrowserRouter>
    );
};

export default Public_routes;