import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import * as Routes from '../routes';

const REGISTER = gql`
mutation register($email: String!, $password: String!) {
    register(user: { email: $email, password: $password}) {
        id
    }
}
`;

const RegistreerPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] =  useState('');
    const [register, { data }] = useMutation(REGISTER);

    useEffect(() => {
        if(data) { console.log(data); }
    }, [data]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Registreer</h2>
                    <form
                        onSubmit = {async e => {
                            e.preventDefault();
                            try {
                                if (password === repeatPassword) {
                                await register({ variables: { email: email, password: password} });
                                } else {
                                    throw new Error ('Wachtwoorden zijn niet gelijk!')
                                }
                            } catch (error) {
                                console.error(error.name + ': ' + error.message)
                            }
                        }}
                    >
                        <label>Email</label><br/>
                        <input type="text" name="email" id="email"
                            onChange={e => setEmail(e.target.value)}/><br/>
                        <label>Wachtwoord</label><br/>
                        <input type="password" name="password" id="password"
                            onChange={e => setPassword(e.target.value)}/><br/>
                        <label>Herhaal wachtwoord</label><br/>
                        <input type="password" name="repeatPassword" id="repeatPassword"
                            onChange={e => setRepeatPassword(e.target.value)}/><br/>
                        <button className="button">Verzenden</button>
                        {
                            data ? <Redirect to = { Routes.LOGIN }/> : ''
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistreerPage;