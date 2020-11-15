import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NetworkStatus, useMutation } from '@apollo/client';
import { useError } from '../Hooks';
import { gql, useQuery } from '@apollo/client';

import * as Routes from '../routes';

const CATEGORIEN = gql`
    {
        categories {
            id,
            naam
        }
    }
`

const BOEKEN = gql`
    {
        boeken {
            id,
            titel,
            beschrijving,
            auteur,
            taal,
            prijs,
            verschijningsdatum,
            uitvoering
            categories {
                id,
                naam
            },
            afbeelding
        }
    }
`

const CATEGORIE_VERWIJDEREN = gql`
    mutation deleteCategorie ($id: ID!) {
        deleteCategorie(categorieId: $id) {
            id, naam
        }
    }
`

const CATEGORIE_TOEVOEGEN = gql `
    mutation addCategorie ($naam: String!) {
        addCategorie(categorie:{
            naam: $naam
        }) {
            id, naam
        }
    }
`

const CATEGORIE_UPDATEN = gql`
    mutation updateCategorie ($id: ID!, $naam: String) {
        updateCategorie ( categorie: {
            naam: $naam
        }, categorieId: $id) {
            id, naam
        }
    }
`
const BOEK_VERWIJDEREN = gql`
    mutation deleteBoek ($id: ID!) {
        deleteBoek(boekId: $id) {
            id, titel
        }
    }
`



const AdminPage = () => {

    const [handleGqlError] = useError();
    const [categorieNaam, setCategorieNaam] = useState('');
    const [categorieId, setCategorieId] = useState('');

    const categorieLijst = useQuery(CATEGORIEN, {
        onError: handleGqlError,
        fetchPolicy: "network-and-cache", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    const boekenLijst = useQuery(BOEKEN, {
        onError: handleGqlError,
        fetchPolicy: "network-only", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    const [deleteCategorie] = useMutation(CATEGORIE_VERWIJDEREN);
    const [addCategorie] = useMutation(CATEGORIE_TOEVOEGEN);
    const [updateCategorie] = useMutation(CATEGORIE_UPDATEN);
    const [deleteBoek] = useMutation(BOEK_VERWIJDEREN);

    if(categorieLijst.loading) return 'loading...';
    if(categorieLijst.error) return `ERROR: ${categorieLijst.error.message}`;

    if (boekenLijst.networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(boekenLijst.loading) return 'loading...';
    if(boekenLijst.error) return `ERROR: ${boekenLijst.error.message}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>categorieën</h2>
                    <form>
                        <label>Voeg een nieuwe categorië toe.</label><br/>
                        <input onChange={
                                    (e) => {
                                        setCategorieNaam(e.target.value);
                                    }
                        }type="text" name="categorie" id="categorie" value={categorieNaam}></input><br/>
                        <button onClick={
                                    async () => {
                                        if (categorieId === '') {
                                            await addCategorie({variables: { naam:categorieNaam}})
                                            setCategorieNaam("");
                                        } else {
                                            await updateCategorie({variables: {naam:categorieNaam, id:categorieId}});
                                            setCategorieNaam("");
                                            setCategorieId("");
                                        }
                                        await categorieLijst.refetch();
                                    }
                        } className="button">Verzenden</button>
                    </form>                          
                            {
                                categorieLijst.data && categorieLijst.data.categories.map(categorie => {
                                    return (<div key={categorie.id} className="admin_categorie">
                                                <div className="admin_categorie_name"><p key={categorie.id}>{categorie.naam}</p></div>
                                                <i className="fas fa-edit" onClick= {
                                                    () => {
                                                        setCategorieNaam(categorie.naam);
                                                        setCategorieId(categorie.id);
                                                    }
                                                }></i>
                                                <i className="fas fa-trash-alt" onClick={async () => {
                                                    try {
                                                        await deleteCategorie({variables: {id: categorie.id}});
                                                        categorieLijst.refetch();
                                                    } catch (error) {
                                                        console.log(error.message);
                                                    }
                                                }}></i>
                                            </div>)
                                })
                            }
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Artikelen</h2>
                    <div className="newBoek">
                        <Link to={Routes.NIEUW_BOEK}>Voeg een nieuw boek toe</Link>
                    </div>
                    <div className="cards admin_cards">
                        {
                            !boekenLijst.loading && boekenLijst.data.boeken.map(boek => (
                                <div key={boek.id} className="card">
                                    <div className="card_picture">
                                        <img src={ boek.afbeelding} alt="boekPicture"/>
                                    </div>
                                    <div className="card_info">
                                        <p className="card_info_title">{boek.titel}</p>
                                        <p>{boek.auteur}</p>
                                        <Link to={Routes.EDIT_BOEK.replace(':id', boek.id)} className="admin_article_edit"><i className="fas fa-edit"></i></Link><br/>
                                        <button className="admin_article_delete" onClick= { async () => {
                                            try {
                                                await deleteBoek({variables: {id: boek.id}});
                                                await boekenLijst.refetch();
                                            } catch (error) {
                                                console.log(error.message);
                                            }
                                        }

                                        }><i className="fas fa-trash-alt"></i></button>
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

export default AdminPage;