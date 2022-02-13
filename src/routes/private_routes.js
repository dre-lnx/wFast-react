import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from '../components/navBar'

import PageNotFound from '../pages/pageNotFound'
import Dashboard from '../pages/dashboard'
import Item from '../pages/item'
import ProfileEdit from '../pages/profileEdit'
import Profile from '../pages/profile'
import Home from '../pages/home'

const Private_routes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/item/:userId/:boardId" component={Item} />
        <Route path="/profile/edit" component={ProfileEdit} />
        <Route path="/profile" component={Profile} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Private_routes
