import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../routes';

import test from '../images/test.jpg';

const WinkelkarPage = () => {
    const [winkelmandje, setWinkelmandje] = useState([]);
    const [totaal, setTotaal] = useState(0);
    const [vernieuw, setVernieuw] = useState(true);

    useEffect(() => {
        let kar = localStorage.getItem('winkelmandje');

        if (kar !== null) {
            kar = JSON.parse(kar);
        } else {
            kar = [];
        }

        const berekenTotaal = () => {
            let totaalBedrag = 0;
    
            winkelmandje.forEach((item) => {
                totaalBedrag += item.prijs * item.amount;
            })
    
            return totaalBedrag;
        }

        setTotaal(berekenTotaal())
        setWinkelmandje(kar);
        setVernieuw(false);
    }, [vernieuw])


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Je winkelwagen</h2>
                </div>
            </div>
            { winkelmandje && winkelmandje.length > 0 ? 
                <div>
                    <div className="row">
                { winkelmandje.map((item) => {
                            return (
                                <div key={item.id} className="col-12">
                                    <div className="shopcart_items">
                                        <div className="shopcart_items_pic">
                                            <img src={ item.afbeelding } alt="boekPicture"/>
                                        </div>
                                        <div className="shopcart_items_info">
                                            <p className="high">{item.titel}</p>
                                            <p>{item.auteur}</p>
                                            <p>{item.uitvoering} | {item.taal}</p>
                                            <p>€ {item.prijs}</p>
                                        </div>
                                        <div className="shopcart_items_quantity">
                                            <i className="fas fa-minus" onClick={() => {
                                                item.amount = item.amount > 0 ? item.amount -= 1 : 0;
                                                const artikel = winkelmandje.find((artikel) => artikel.id === item.id);
                                                artikel.amount = item.amount;
                                                localStorage.setItem('winkelmandje', JSON.stringify(winkelmandje));
                                                setVernieuw(true);
                                            }}></i>
                                            <input type="number" min="0" value={item.amount} onChange={(e) => {
                                                
                                            }}></input>
                                            <i className="fas fa-plus" onClick={() => {
                                                item.amount += 1;
                                                const artikel = winkelmandje.find((artikel) => artikel.id === item.id);
                                                artikel.amount = item.amount;
                                                localStorage.setItem('winkelmandje', JSON.stringify(winkelmandje));
                                                setVernieuw(true);
                                            }}></i>
                                            <p className="high">€ {item.prijs}</p>
                                        </div>
                                        <div className="shopcart_items_delete">
                                            <i className="fas fa-trash-alt" onClick={
                                                () => {
                                                    const resterend = winkelmandje.filter((artikel) => artikel.id !== item.id);
                                                    localStorage.setItem('winkelmandje', JSON.stringify(resterend));
                                                    setVernieuw(true);
                                                }
                                            }></i>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                }
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="shopcart_total">
                        <p className="total">Totaalbedrag</p>
                        <div className="shopcart_total_price">
                            <p>incl. btw</p>
                            <p className="price">€ {totaal.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 button_order">
                    <Link to={Routes.ADRES}>Bestel</Link>
                </div>
            </div>
                </div>
            : <div className="row">
                <div className="col-12">
                    <p>Je winkelwagentje is leeg</p>
                </div>
            </div>}
        </div>
    )
}

export default WinkelkarPage;