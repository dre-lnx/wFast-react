import React from 'react';
import { Link } from "react-router-dom";

import logo from '../assets/only_logo.svg';

import avatar from '../assets/rick.jpg';


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
                <li>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>
        </nav>
        <div className="avatar-div">
            <span className="avatar-title">Rick</span>
            <img src={avatar} alt="user avatar" className="avatar-img" />
        </div>
        </div>
    );
};

export default NavBar;