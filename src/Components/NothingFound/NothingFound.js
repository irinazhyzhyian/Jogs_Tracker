import React from 'react';
import { useHistory } from 'react-router';
import './NothingFound.scss';

export default function NothingFound () {
    
    const history = useHistory();

    return (
        <div className='Container'>
            <div className='Picture' />
            <div className='Text'>Nothing is there</div>
            <div className='Btn' onClick={() => history.push('/jog-form')}>
                <p>Creare yout jog first</p>
            </div>
        </div>
    );
}