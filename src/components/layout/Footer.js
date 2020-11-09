import React from 'react';

const Footer = ({ children }) => {
    return (
        <footer>
            <div className="container">
                <div className="row footer">
                    <div className="col-5 footer_text">
                        <p>© Nina Genitello</p>
                    </div>
                    <div className="col-6 footer_social">
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-instagram-square"></i>
                        <i class="fab fa-twitter-square"></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;