import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

const BOEK_TOEVOEGEN = gql `
    mutation addBoek ($titel: String!, $beschrijving: String!, $auteur: String, $prijs: Float, $verschijningsdatum: String, $categories: [CategorieIdInput], $afbeelding: String!, $taal: Taal, $uitvoering: Uitvoering) {
        addBoek(boek: {
            titel: $titel
            beschrijving: $beschrijving
            auteur: $auteur
            prijs: $prijs
            verschijningsdatum: $verschijningsdatum
            categories: $categories
            afbeelding: $afbeelding
            taal: $taal
            uitvoering: $uitvoering
        }) {
            id, titel,
        }
    }
`

const NieuwBoekPage = () => {

    const [boekTitel, setBoekTitel] = useState('');
    const [boekBeschrijving, setBoekBeschrijving] = useState('');
    const [boekAuteur, setBoekAuteur] = useState('');
    const [boekPrijs, setBoekPrijs] = useState('');
    const [boekVerschijningsdatum, setBoekVerschijvingsdatum] = useState('');
    const [boekCategories, setBoekCategories] = useState('');
    const [boekAfbeelding, setBoekAfbeelding] = useState('');
    const [boekTaal, setBoekTaal] = useState('Nederlands');
    const [boekUitvoering, setBoekUitvoering] = useState('Paperback');
    const [naarAdmin, setNaarAdmin] = useState(false);

    const [handleGqlError] = useError();

    const [addBoek] = useMutation(BOEK_TOEVOEGEN);

    const categorieLijst = useQuery(CATEGORIEN, {
        onError: handleGqlError,
        fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
        notifyOnNetworkStatusChange: true,
    });

    if (categorieLijst.networkStatus === NetworkStatus.refetch) return 'Refetching!';
    if(categorieLijst.loading) return 'loading...';
    if(categorieLijst.error) return `ERROR: ${categorieLijst.error.message}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Voeg nieuw boek toe</h2>
                    <form>
                        <label>Titel:</label><br/>
                        <input type="text" name="titel" id="titel" onChange={
                            (e) => {
                                setBoekTitel(e.target.value);
                            }
                        }></input><br/>
                        <label>Auteur:</label><br/>
                        <input type="text" name="auteur" id="auteur" onChange={
                            (e) => {
                                setBoekAuteur(e.target.value);
                            }}></input><br/>
                        <label>Uitvoering:</label><br/>
                        <select onChange={
                            (e) => {
                                setBoekUitvoering(e.target.value);
                            }}>
                            <option value="Paperback">Paperback</option>
                            <option value="Hardcover">Hardcover</option>
                            <option value="Ebook">Ebook</option>
                            <option value="Pocketboek">Pocketboek</option>
                        </select><br/>
                        <label>Taal:</label><br/>
                        <select onChange={
                            (e) => {
                                setBoekTaal(e.target.value);
                            }}>
                            <option value="Nederlands">Nederlands</option>
                            <option value="Engels">Engels</option>
                            <option value="Frans">Frans</option>
                            <option value="Duits">Duits</option>
                        </select><br/>
                        <label>Omschrijving:</label><br/>
                        <textarea type="text" name="omschrijving" id="omschrijving" onChange={
                            (e) => {
                                setBoekBeschrijving(e.target.value);
                            }}></textarea><br/>
                        <label>Prijs:</label><br/>
                        <input type="text" name="text" id="text" onChange={
                            (e) => {
                                setBoekPrijs(e.target.value);
                            }}></input><br/>
                        <label>Verschijningsdatum:</label><br/>
                        <input type="text" name="text" id="text" placeholder="dd/mm/jjjj" onChange={
                            (e) => {
                                setBoekVerschijvingsdatum(e.target.value);
                            }}></input><br/>
                        <label>Afbeelding url:</label><br/>
                        <input type="text" name="afbeelding" id="afbeelding" onChange={
                            (e) => {
                                setBoekAfbeelding(e.target.value);
                            }}></input><br/>
                        <label>Categorie:</label><br/>
                        <select multiple onChange={
                            (e) => {
                                setBoekCategories(e.target.selectedOptions);
                            }}>
                            {
                                !categorieLijst.loading && categorieLijst.data.categories.map(categorie => {
                                    return <option key={categorie.id} value={categorie.id}>{categorie.naam}</option>
                                })
                            }
                        </select>
                        <button type="submit" className="button" onClick={
                            async (e) => {
                                e.preventDefault();
                                try {
                                    console.log(boekCategories);
                                    let categories = [...boekCategories]; 
                                    categories = categories.map((categorie) => {
                                        return { id: categorie.value }
                                    })

                                    console.log(boekTaal);

                                    await addBoek({variables: {
                                        titel: boekTitel,
                                        beschrijving: boekBeschrijving,
                                        auteur: boekAuteur,
                                        categories: categories,
                                        prijs: parseFloat(boekPrijs),
                                        verschijningsdatum: boekVerschijningsdatum,
                                        afbeelding: boekAfbeelding,
                                        taal: boekTaal,
                                        uitvoering: boekUitvoering,
                                    }})

                                    setNaarAdmin(true);
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        }>Verzenden</button>
                    </form>
                    { naarAdmin ? <Redirect to={Routes.ADMIN} /> : '' }
                </div>
            </div>
        </div>
    )
}

export default NieuwBoekPage;