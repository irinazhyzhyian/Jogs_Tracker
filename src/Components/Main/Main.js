import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { actions } from '../../Service';
import Footer from '../Footer/Footer';
import Jog from '../Jog/Jog';
import './Main.scss';
import MainHeader from './MainHeader';

const Main = () => {

    const processing = useSelector(state => state.jogs.processing);
    const jogs = useSelector(state => state.jogs.filteredJogs);
    const isAuth = useState(localStorage.getItem('token'));
    const dispatch = useDispatch();

    useEffect(() => {
        if(!jogs.length && isAuth) {
            dispatch(actions.JogsActions.getJogs());
        }
    }, []);

    const updateFilter = (startDate, finishDate) => {
        dispatch(actions.JogsActions.updateFilter(startDate, finishDate));
    }

    return (
        <div className='Main-container'>
            <MainHeader updateFilter={updateFilter}/>
            <div className='Jogs'>
                {processing ? <p>Loading...</p> :
                        jogs.map((jog, index) => <Jog key={index} jog={jog}/>)
                }
            </div>
            <Footer />
        </div>
    );
}

export default Main;