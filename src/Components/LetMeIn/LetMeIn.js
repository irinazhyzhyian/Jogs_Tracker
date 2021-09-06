import React from 'react';
import BearFace from '../../Assets/bear-face.svg';
import './LetMeIn.scss';
import {useDispatch} from "react-redux";
import {actions} from '../../Service';
import { useHistory } from 'react-router-dom';

const LetMeIn = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const letMeIn = () => {
        console.log(dispatch(actions.AuthActions.signIn()))
        dispatch(actions.AuthActions.signIn()).then(() => {
            history.push('/');
        });
    }

    return (
        <div className='Let-me-in-container'>
            <div className='Rectangle-4'>
                <div>
                    <img src={BearFace} alt='BearFace' className='bear-face'/>
                    <div className='Rectangle-2' onClick={letMeIn}>
                        <p className='Let-me-in'>Let me in</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LetMeIn;