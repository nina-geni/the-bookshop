import React, { useEffect, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useError } from '../Hooks';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import * as Routes from '../routes';

import home from '../images/home.jpg';

//query die boeken ophaald
const BOEKEN = gql`
    {
        boeken {
            id,
            titel,
            auteur,
            toevoegingsdatum,
            categories {
                id,
                naam
            },
            afbeelding
        }
    }
`

const HomePage = () => {
    const [handleGqlError] = useError();
    const [fictieBoeken, setFictieBoeken] = useState([]);
    const [nonFictieBoeken, setNonFictieBoeken] = useState([]);

    const boekenLijst = useQuery(BOEKEN, {
        onError: handleGqlError,
        fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (boekenLijst.data) {
            const boeken = [...boekenLijst.data.boeken];
            
            let fictie = boeken.filter(boek => {
                let exist = false;

                boek.categories.forEach((category) => {
                    if (category.naam.toLowerCase() === 'fictie') {
                        exist = true;
                    }
                })

                return exist;
            });

            fictie.sort((a, b) => {
                if (a.toevoegingsdatum > b.toevoegingsdatum) {
                    return -1;
                }

                if (a.toevoegingsdatum < b.toevoegingsdatum) {
                    return 1;
                }

                return 0;
            })

            fictie = fictie.slice(0, 3);

            setFictieBoeken(fictie);

            let nonFictie = boeken.filter(boek => {
                let exist = false;

                boek.categories.forEach((category) => {
                    if (category.naam.toLowerCase() === 'non-fictie') {
                        exist = true;
                    }
                })

                return exist;
            });

            nonFictie.sort((a, b) => {
                if (a.toevoegingsdatum > b.toevoegingsdatum) {
                    return -1;
                }

                if (a.toevoegingsdatum < b.toevoegingsdatum) {
                    return 1;
                }

                return 0;
            })

            nonFictie = nonFictie.slice(0, 3);

            setNonFictieBoeken(nonFictie);
        }
    }, [boekenLijst.data]);

    if (boekenLijst.networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(boekenLijst.loading) return 'loading...';
    if(boekenLijst.error) return `ERROR: ${boekenLijst.error.message}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Recente Non-Fictie</h2>
                    <div className="cards">
                    {
                        nonFictieBoeken && nonFictieBoeken.map(boek => (
                            <div key={boek.id} className="card">
                                <div className="card_picture">
                                    <img src={ boek.afbeelding } alt="boekPicture"/>
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
            <div className="row">
                <div className="col-12">
                    <h2>Recente Fictie</h2>
                    <div className="cards">
                    {
                        fictieBoeken && fictieBoeken.map(boek => (
                            <div key={boek.id} className="card">
                                <div className="card_picture">
                                    <img src={ boek.afbeelding } alt="boekPicture"/>
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