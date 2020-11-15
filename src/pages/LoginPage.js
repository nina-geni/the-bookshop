import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import * as Routes from '../routes';

const LOGIN = gql`
    query login($email: String!, $password: String!) {
        login(user: { email: $email, password: $password}) {
            userId,
            token
        }
    }
`;

const LoginPage = () => {
    const [naarAdmin, setNaarAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data, error }] = useLazyQuery(LOGIN);

    useEffect(() => {
        if(data) { 
            console.log(data);
            localStorage.setItem('token', data.login.token); 
            setNaarAdmin(true);
        }
        if(error) { console.log(error); }
    }, [data, error]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Login</h2>
                    <form
                        onSubmit = {async e => {
                            e.preventDefault();
                            await login({ variables: { email: email, password: password} });
                        }}
                    >
                        <label>Email</label><br/>
                        <input type="text" name="email" id="email"
                            onChange={e => setEmail(e.target.value)}/><br/>
                        <label>Wachtwoord</label><br/>
                        <input type="password" name="password" id="password"
                            onChange={e => setPassword(e.target.value)}/><br/>
                        <button className="button">Verzenden</button>
                    </form>
                </div>
                { naarAdmin ? <Redirect to={Routes.ADMIN} /> : '' }
            </div>
        </div>
    )
}

export default LoginPage;