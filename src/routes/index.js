import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import Login from '../pages/login';
  import Home from '../pages/home';

  import logo from '../assets/wfast-logo.png';

  import '../assets/App.css'

const NavBar = () => {
      return (
      <Router>
            <div className="nav-container">
                <nav className="a-list">
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