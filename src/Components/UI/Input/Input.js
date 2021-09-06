import React from 'react';
import './Input.scss';

const Input = (props) => {
    const {value='', name='', type='text', onChange} = props;
    return (
        <input className='Input'
               value={value}
               onChange={onChange}
               name={name}
               type={type}

        />
    );
}

export default Input;