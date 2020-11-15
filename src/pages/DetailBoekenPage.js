import React from 'react';
import { NetworkStatus } from '@apollo/client';
import { useError } from '../Hooks';
import { gql, useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';


const BOEKEN = gql`
    query boek($id: ID) {
        boek(id: $id) {
            id,
            titel,
            beschrijving,
            prijs,
            auteur,
            verschijningsdatum,
            taal,
            uitvoering,
            categories {
                id,
                naam
            },
            afbeelding
        }
    }
`

const DetailBoekenPage = () => {
    const { id } = useParams();

    //Data ophalen
    const [handleGqlError] = useError();
    const { loading, error, data, networkStatus } = useQuery(BOEKEN, {
        onError: handleGqlError,
        fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
        variables: { id: id }
    });



    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(loading) return 'loading...';
    if(error) return `ERROR: ${error.message}`;

    return (
        <div className="container">
            <div className="row detailpage">
                <div className="col-6 detailpage_picture">
                    <img src={ data.boek.afbeelding } alt="boekPicture"/>
                </div>
                <div className="col-5 detailpage_info">
                    <h2>{data.boek.titel}</h2>
                    <p>{data.boek.auteur}</p>
                    <p>{data.boek.uitvoering} | {data.boek.taal}</p>
                    <h2>€ {data.boek.prijs}</h2>
                    <button className="button" onClick={ (e) => {
                        e.preventDefault();

                        let winkelmandje = localStorage.getItem('winkelmandje');

                        if (winkelmandje !== null) {
                            winkelmandje = JSON.parse(winkelmandje);
                        } else {
                            winkelmandje = [];
                        }

                        let artikelWinkelmandje = winkelmandje.find((artikel) => artikel.id === data.boek.id);

                        if (!artikelWinkelmandje) {
                            winkelmandje.push({
                               id: data.boek.id,
                               afbeelding: data.boek.afbeelding,
                               titel: data.boek.titel,
                               auteur: data.boek.auteur,
                               uitvoering: data.boek.uitvoering,
                               taal: data.boek.taal,
                               prijs: data.boek.prijs,
                               amount: 1,
                            })
                        } else {
                            artikelWinkelmandje.amount += 1;
                        }

                        localStorage.setItem('winkelmandje', JSON.stringify(winkelmandje));
                    }
                    }>Toevoegen aan winkelkar</button>
                    <p>{data.boek.beschrijving}</p>
                    <p>{data.boek.verschijningsdatum}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailBoekenPage;