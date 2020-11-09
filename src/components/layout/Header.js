import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/Logo.png';

import * as Routes from '../../routes';

const Header = ({ children }) => {
    return (
        <header>
            <div className="container">
                <div className="row header">
                    <div className="col-5">
                        <div className="image-home">
                            <img src={logo} alt="logo"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <nav>
                            <ul className="header_nav">
                                <li>
                                    <NavLink to={Routes.LANDING} >Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.BOEKEN} >Boeken</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.WINKELWAGEN} ><i class="fas fa-shopping-cart"></i></NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.LOGIN} >Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to={Routes.REGISTREREN} >Registreer</NavLink>
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