import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/auth'

import logo from '../assets/only_logo.svg'

import avatar from '../assets/rick.jpg'

const NavBar = () => {

  const { signed, user, Logout } = useContext(AuthContext);

  const [dropDown, setDropdown] = useState(false)

  const toggle = (val) => {
    val === true ? setDropdown(false) : setDropdown(true)
  }

  return (
    <>
      <div className="nav-container">
        <i class="fas fa-bars fa-2x"></i>
        <nav className="a-list">
          <div>
            <img src={logo} alt="logo wfast" className="nav-logo" />
          </div>
          <ul>
          {signed === false &&
            <li>
              <Link to="/Login">Login</Link>
            </li>
          }
            {signed === true &&
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          }
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      
      {signed === true &&
      <>
        <div className="avatar-div" onClick={() => toggle(dropDown)}>
          <span className="avatar-title">{user.name}</span>
          <img src={avatar} alt="user avatar" className="avatar-img" />
        </div>
      </>
      }
      </div>
      {dropDown === true && (
        <div className="dropDown flex-x-end">
          <ul>
            <li>
              <div onClick={Logout}>
              <i class="fas fa-sign-out-alt"></i>Log out
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default NavBar
