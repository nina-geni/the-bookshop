import React from 'react';
import { NetworkStatus } from '@apollo/client';
import { useError } from '../Hooks';
import { gql, useQuery } from '@apollo/client';

import test from '../images/test.jpg';
import { Link } from 'react-router-dom';

import * as Routes from '../routes';

const BOEKEN = gql`
    {
        boeken {
            id,
            titel,
            auteur,
            categories {
                id,
                naam
            },
            afbeelding
        }
    }
`

const BoekenPage = () => {
    const [handleGqlError] = useError();
    const { loading, error, data, networkStatus } = useQuery(BOEKEN, {
        onError: handleGqlError,
        fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(loading) return 'loading...';
    if(error) return `ERROR: ${error.message}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Onze boeken</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="cards">
                        {
                            !loading && data.boeken.map(boek => (
                                <div key={boek.id} className="card">
                                    <div className="card_picture">
                                        <img src={ test } alt="boekPicture"/>
                                    </div>
                                    <div className="card_info">
                                        <p className="card_info_title">{boek.titel}</p>
                                        <p>{boek.auteur}</p>
                                        <Link to={Routes.BOEK_DETAIL.replace(':id', boek.id)} className="card_info_button">Meer info</Link>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoekenPage;