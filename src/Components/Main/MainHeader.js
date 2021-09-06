import React, {useState} from 'react';
import BearFace from '../../Assets/bear-face.svg';
import Input from '../UI/Input/Input';
import './Main.scss';

const MainHeader = ({updateFilter}) => {

    const [date, setDate] = useState({dateFrom: '', dateTo: ''});

    const handleChange = (e) => {
        const {name, value} = e.target;
        let updatedDate = date;
        updatedDate[name] = value;
        setDate(updatedDate);
        updateFilter(updatedDate.dateFrom, updatedDate.dateTo);
    }

    return (
        <div className='Rectangle'>
                <div className='Grid-cols'>
                    <div className='Small-col'>
                        <p className='Date-text'>Date from</p>
                        <Input value={date.dateFrom} 
                               name='dateFrom'
                               type={'date'}
                               onChange={handleChange}
                        />
                    </div>
                    <div className='Small-col'>
                        <p className='Date-text'>Date To</p>
                        <Input value={date.dateTo} 
                               name='dateTo'
                               type={'date'}
                               onChange={handleChange}
                        />
                    </div>
                </div>
        </div>
    );
}

export default MainHeader;