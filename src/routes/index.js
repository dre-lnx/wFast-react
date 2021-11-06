import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import Login from '../pages/login';
  import Home from '../pages/home';

const NavBar = () => {
      return (
      <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Login">
                                    Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                    Home
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
      </Router>
      );
  }

export default NavBar;