import React from 'react';

const LoginPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Login</h2>
                    <form>
                        <label>Email</label><br/>
                        <input type="text" name="email" id="email"></input><br/>
                        <label>Wachtwoord</label><br/>
                        <input type="password" name="email" id="email"></input><br/>
                        <button className="button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;