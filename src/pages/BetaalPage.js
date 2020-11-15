import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../routes';


const BetaalPage = () => {

    const [isPayed, setIsPayed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPayed(true);
            localStorage.removeItem('winkelmandje');
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {
                        isPayed ?   <div className="paying_end">
                                        <h2>Bedankt voor uw besteling!</h2>
                                        <h2>We zorgen ervoor dat uw boeken zo snel mogelijk uw kant op komen.</h2>
                                    </div>
                     : <div className="paying">
                            <h2>We zijn uw betaling aan het verwerken ...</h2>
                        </div>
                    }
                </div>
            </div>
        </div> 
    )
}

export default BetaalPage;