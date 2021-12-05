import { React } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from '../components/navBar'

import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Home from '../pages/home'
import Item from '../pages/item'
import ProfileEdit from '../pages/profileEdit'
import Profile from '../pages/profile'
import '../assets/App.css'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <div>
          <NavBar />
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/item" exact component={Item} />
          <Route path="/profile/edit" exact component={ProfileEdit} />
          <Route path="/profile" exact component={Profile} />
        </div>
      </Switch>
    </Router>
  )
}

export default AppRouter
