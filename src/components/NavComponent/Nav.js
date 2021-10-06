import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SigninItem from './SigninItem';
import YourAccount from './YourAccount';
import './style.css';

const Nav = (props) => {
    return (
        <header className="cus-nav navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link
                    className="navbar-brand cus-navbar-brand mx-4 ripple"
                    to="/"
                >
                    <Logo />
                </Link>

                <SearchBar />

                <ul className="nav cus-subnav mx-4">
                    {!getToken() && (
                        <li className="nav-item">
                            <SigninItem />
                        </li>
                    )}

                    {getToken() && (
                        <li className="nav-item position-relative">
                            <YourAccount />
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Nav;
