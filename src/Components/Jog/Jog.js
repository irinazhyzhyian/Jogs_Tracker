import React, { useState } from 'react';
import moment from 'moment';
import './Jog.scss';
import JogForm from './JogForm';

const Jog = ({jog}) => {

    const dateString = moment.unix(jog.date).format("DD.mm.YYYY");
    const [edit, setEdit] = useState();

    const editJog = () => {
        setEdit(!edit);
        
    }

    return (
        <>
            <div className='Jog-container' onClick={editJog}>
                <div className='Joger-img'/>
                <div className='Details'>
                    <div className='Date'>{dateString}</div>
                    <div className='D-flex'>
                        <div className='Title'>Distance: </div>
                        <div className='Value'>{jog.distance} km</div>
                    </div>
                    <div className='D-flex'>
                        <div className='Title'>Time: </div>
                        <div className='Value'>{jog.time} min</div>
                    </div>
                </div>
            </div>
            { edit && <JogForm jog={jog} setEdited={() => setEdit(false)} /> }
        </>
    );
}

export default Jog;