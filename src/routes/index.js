import { React, useContext } from 'react'
import AuthContext from '../contexts/auth'

import PublicRoutes from './public_routes'
import PrivateRoutes from './private_routes'

import '../assets/App.css'

const AppRouter = () => {

  const { signed } = useContext(AuthContext)
  console.log(signed)

  if(signed) {
    return (
      <PrivateRoutes />
    )
  } else {
    return (
      <PublicRoutes />
    )
  }
}

export default AppRouter
