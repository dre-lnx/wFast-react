import { React } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

  import NavBar from '../components/navBar';


  import Login from '../pages/login';
  import Home from '../pages/home';
  import '../assets/App.css'

const AppRouter = () => {


        return (
            <Router>
                <NavBar />
              <Switch>
                  <Route path="/login" >
                      <Login />
                  </Route>
                  <Route path="/" >
                      <Home />
                  </Route>
              </Switch>
            </Router>
            );
    }

export default AppRouter;