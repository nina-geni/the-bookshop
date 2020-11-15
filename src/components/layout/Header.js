import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/Logo.png';

import * as Routes from '../../routes';

const Header = ({ children }) => {
    const [token, setToken] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setToken(localStorage.getItem('token'));
        } else {
            setToken('');
        }
    }, [])

    return (
        <header>
            <div className="container">
                <div className="row header">
                    <div className="col-7">
                        <div className="image-home">
                            <h1><img src={logo} alt="logo"/></h1>
                        </div>
                    </div>
                    <div className="col-5">
                        <nav>
                            <ul className="header_nav">
                                <li>
                                    <NavLink to={Routes.LANDING} activeClassName="active">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.BOEKEN} activeClassName="active">Boeken</NavLink>
                                </li>
                                {!token ? <li><NavLink to={Routes.LOGIN} activeClassName="active">Login</NavLink></li> : ''}
                                {!token ? <li><NavLink to={Routes.REGISTREREN} activeClassName="active">Registreer</NavLink></li> : ''}
                                {token ? <li><NavLink to={Routes.ADMIN} activeClassName="active">Admin</NavLink></li> : ''}
                                {token ? <li><NavLink to={Routes.LANDING} activeClassName="active" onClick={
                                    () => {
                                        setToken('');
                                        localStorage.removeItem('token')
                                    }
                                }>Logout</NavLink></li> : ''}
                                <li>
                                    <NavLink to={Routes.WINKELWAGEN} activeClassName="active"><i className="fas fa-shopping-cart"></i></NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;