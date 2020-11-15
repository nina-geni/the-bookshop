import React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../routes';


const AdresPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Vul hier uw contactgevens in.</h2>
                    <form>
                        <div className="adres_form">
                            <label>Email:</label><br/>
                            <input type="text" name="email" id="email"></input><br/>
                        </div>
                        <div className="adres_form">
                            <label>Geslacht:</label><br/>
                            <select>
                                <option>Man</option>
                                <option>Vrouw</option>
                                <option>Ander</option>
                            </select>
                            <label>Voornaam:</label><br/>
                            <input type="text" name="voornaam" id="voornaam"></input><br/>
                            <label>Achternaam:</label><br/>
                            <input type="text" name="achternaam" id="achternaam"></input><br/>
                        </div>
                        <div className="adres_form">
                            <label>Straat + huisnummer:</label><br/>
                            <input type="text" name="straatNummer" id="straatNummer"></input><br/>
                            <label>Postcode:</label><br/>
                            <input type="text" name="postcode" id="postcode"></input><br/>
                            <label>Gemeente:</label><br/>
                            <input type="text" name="gemeente" id="gemeente"></input><br/>
                        </div>
                    </form>
                    <div className="button_betaal">
                        <Link to={Routes.BETAAL}>Betaal</Link>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default AdresPage;