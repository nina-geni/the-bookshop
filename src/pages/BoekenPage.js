import React, { useEffect, useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useError } from '../Hooks';
import { gql, useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import * as Routes from '../routes';


//query die boeken ophaald
const BOEKEN = gql`
    {
        boeken {
            id,
            titel,
            auteur,
            taal,
            uitvoering
            categories {
                id,
                naam
            },
            afbeelding
        }
    }
`
const CATEGORIEN = gql`
    {
        categories {
            id,
            naam
        }
    }
`

//component
const BoekenPage = () => {
    const [categorie, setCategorie] = useState('');
    const [taal, setTaal] = useState('');
    const [uitvoering, setUitvoering] = useState('');
    const [filterBoeken, setFilterBoeken] = useState([]);

    //Data ophalen
    const [handleGqlError] = useError();

    const boekenLijst = useQuery(BOEKEN, {
        onError: handleGqlError,
        fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    const categorieLijst = useQuery(CATEGORIEN, {
        onError: handleGqlError,
        fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (boekenLijst.data) {
            setFilterBoeken(boekenLijst.data.boeken);
        }
    }, [boekenLijst.data])

    if (boekenLijst.networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(boekenLijst.loading) return 'loading...';
    if(boekenLijst.error) return `ERROR: ${boekenLijst.error.message}`;

    if (categorieLijst.networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(categorieLijst.loading) return 'loading...';
    if(categorieLijst.error) return `ERROR: ${categorieLijst.error.message}`;

    const boekenFilter =  (categorie, uitvoering, taal) => {
        let boeken = [];
        console.log(boekenLijst.data);
        
        if (categorie === '') {
            boeken = boekenLijst.data.boeken;
        } else {
            boeken = boekenLijst.data.boeken.filter((boek) => {
                let exist = false;
                boek.categories.forEach((category) => {
                    if (category.id === categorie) {
                        exist = true;
                    }
                })

                return exist;
            })
        }

        if (uitvoering !== '') {
            boeken = boeken.filter((boek) => {
                return boek.uitvoering === uitvoering;
            })
        }

        if (taal !== '') {
            boeken = boeken.filter((boek) => {
                return boek.taal === taal
            })
        }

        setFilterBoeken(boeken);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Onze boeken</h2>
                    <form className="filter">
                        <div className="boeken_categories">
                            <label>Categorie:</label>
                            
                            <select onChange={(e) => {
                                console.log('hello');
                                boekenFilter(e.target.value, uitvoering, taal);
                                setCategorie(e.target.value)
                            }}>
                                <option value="">All</option>
                            {
                                !categorieLijst.loading && categorieLijst.data.categories.map(categorie => {
                                    return <option key={categorie.id} value={categorie.id}>{categorie.naam}</option>
                                })
                            }
                            </select>
                        </div>
                        <div className="boeken_uitvoering">
                            <label>Uitvoering:</label>
                            <select onChange={(e) => {
                                boekenFilter(categorie, e.target.value, taal);
                                setUitvoering(e.target.value)
                            }}>
                                <option value="">All</option>
                                <option value="Paperback">Paperback</option>
                                <option value="Hardcover">Hardcover</option>
                                <option value="Ebook">Ebook</option>
                                <option value="Pocketboek">Pocketboek</option>
                            </select>
                        </div>
                        <div className="boeken_taal">
                            <label>Taal:</label>
                            <select onChange={(e) => {
                                boekenFilter(categorie, uitvoering, e.target.value);
                                setTaal(e.target.value)
                            }}>
                                <option value="">All</option>
                                <option value="Nederlands">Nederlands</option>
                                <option value="Engels">Engels</option>
                                <option value="Frans">Frans</option>
                                <option value="Duits">Duits</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="cards">
                        {
                            !boekenLijst.loading && filterBoeken.map(boek => (
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
        </div>
    )
}

export default BoekenPage;