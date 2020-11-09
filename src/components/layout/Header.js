import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/Logo.png';

import * as Routes from '../../routes';

const Header = ({ children }) => {
    return (
        <header>
            <div className="container">
                <div className="row header">
                    <div className="col-8">
                        <div className="image-home">
                            <h1><img src={logo} alt="logo"/></h1>
                        </div>
                    </div>
                    <div className="col-4">
                        <nav>
                            <ul className="header_nav">
                                <li>
                                    <NavLink to={Routes.LANDING} activeClassName="active">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.BOEKEN} activeClassName="active">Boeken</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.LOGIN} activeClassName="active">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.REGISTREREN} activeClassName="active">Registreer</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.WINKELWAGEN} activeClassName="active"><i class="fas fa-shopping-cart"></i></NavLink>
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