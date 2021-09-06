import React, { useEffect, useState } from 'react';
import Input from '../UI/Input/Input';
import {JOG_EMPTY_OBJ} from '../../Constants';
import { useDispatch } from 'react-redux';
import { actions } from '../../Service';
import { toast } from 'react-toastify';
import './Jog.scss';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const JogForm = ({jog, setEdited}) => {

    const [jogValue, setJogValue] = useState(jog ? jog : JOG_EMPTY_OBJ);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(jog) {
            let j = JSON.parse(JSON.stringify(jog));
            j.date = moment.unix(jog.date).format("YYYY-MM-DD");
            setJogValue(j);
        }
    }, [])

    const handleChange = (event) => {
        let updatedJog = jogValue;
        const {name, value} = event.target;
        console.log(event.target.value)
        updatedJog = {
            ...updatedJog,
            [name]: value
        };
        setJogValue(updatedJog);
    }

    const save = () => {
        if(jog) {
            const j = {
                ...jogValue,
                jog_id: jogValue.id
            };
            delete j.id;
            dispatch(actions.JogsActions.updateJog(j))
                .then(() => {
                    setEdited();
                    toast.success("Jog updated!", {
                        position: toast.POSITION.TOP_CENTER
                      });
                })
                .catch((error) => {
                    toast.error(error.error_message, {
                        position: toast.POSITION.TOP_CENTER
                      });
                });
        } else {
            dispatch(actions.JogsActions.createJog(jogValue))
                .then(() => {
                    toast.success("Jog created!", {
                        position: toast.POSITION.TOP_CENTER
                      });
                    history.push('/');
                })
                .catch((error) => {
                    toast.error(error.error_message, {
                        position: toast.POSITION.TOP_CENTER
                      });
                });
        }
    }

    return (
        <div className='Layer'>
            <div className='Jog-form'>
                <div className='Close-btn' />
                <div className='Row-el'>
                    <p>Distance</p>
                    <Input 
                        value={jogValue.distance}
                        name='distance'
                        onChange={handleChange}
                    />
                </div>
                <div className='Row-el'>
                    <p>Time</p>
                    <Input 
                        value={jogValue.time}
                        name='time'
                        onChange={handleChange}
                    />
                </div>
                <div className='Row-el'>
                    <p>Date</p>
                    <Input 
                        value={jogValue.date}
                        name='date'
                        type='date'
                        onChange={handleChange}
                    />
                </div>
                <div className='Save-btn' onClick={save}>Save</div>
            </div>
        </div>
    );
}

export default JogForm;