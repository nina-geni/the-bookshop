import React from 'react';

const Footer = ({ children }) => {
    return (
        <footer>
            <div className="container">
                <div className="row footer">
                    <div className="col-10 footer_text">
                        <p>© Nina Genitello</p>
                    </div>
                    <div className="col-2 footer_social">
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-instagram-square"></i>
                        <i className="fab fa-twitter-square"></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;