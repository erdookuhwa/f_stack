import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {

    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 90 }} style={{ height: 250, width: 250 }} >
            <div className="Tilt-inner"> 
                <img style={{ paddingTop: '55px'}} src={brain} alt='brain logo' />
            </div>
            </Tilt>
        </div>
    )
}

export default Logo;