import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Signup from './Signup';
import './style.css';

const Nav = (props) => {
    return (
        <header className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand mx-4" to="/">
                    <Logo />
                </Link>

                <SearchBar />

                <ul className="nav mx-4">
                    <li className="nav-item">
                        <Signup />
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Nav;