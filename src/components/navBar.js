import React from 'react';
import { Link } from "react-router-dom";

import logo from '../assets/only_logo.svg';


const NavBar = () => {
    return (
        <div className="nav-container">
        <nav className="a-list">
            <div>
                <img src={logo} alt="logo wfast" className="nav-logo"/>
            </div>
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
    );
};

export default NavBar;