import React from 'react';
import Tilt from 'react-tilt';
import logo from './erdoo_logo.png';
import './Logo.css';

const Logo = () => {

    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 90 }} style={{ height: 100, width: 150, borderRadius: '45px' }} >
            <div className="Tilt-inner"> 
                <img style={{ paddingTop: '28px'}} src={logo} alt='brain logo' />
            </div>
            </Tilt>
        </div>
    )
}

export default Logo;