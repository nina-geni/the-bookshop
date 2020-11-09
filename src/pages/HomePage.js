import React from 'react';

import home from '../images/home.jpg';

const HomePage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Recente Non-Fictie</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Recente Fictie</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-6 home_contact_picture">
                    <img src={ home } alt="home" />
                </div>
                <div className="col-6">
                    <div className="home_contact_info">
                        <p className="home_contact_info_high">Openingsuren:</p>
                        <p>MA - ZA van 08:00 - 20:00</p>
                        <p className="home_contact_info_high">Adres:</p>
                        <p>Leedsesweg 12 9340 Lede</p>
                        <p className="home_contact_info_high">U kan ons contacteren op:</p>
                        <p>09 633 18 73</p>
                        <p>of</p>
                        <p>thebookshop@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;