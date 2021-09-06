import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {

    const history =useHistory();

    const goToForm = () => {
        history.push('/jog-form');
    }

    return (
        <div className='Footer'>
            <div className='Add' onClick={goToForm}/>
        </div>
    );
}

export default Footer;