import React, { useState } from 'react';
import './Header.scss';
import { Link, useHistory } from 'react-router-dom';


const Header = () => {

    const isAuth = localStorage.getItem('token');
    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);

    const togleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <div className='Header'>
            <div className='Logo' onClick={() => history.push('/')} />
            {isAuth && 
                <>
                    <div className='Menu-Items'>
                        <Link className='Link' to='/'>JOGS</Link>
                        <Link className='Link' to='/info'>INFO</Link>
                        <Link className='Link' to='/contact-us'>CONTACT US</Link>
                        <div className='Filter' />
                    </div>
                    <div className='Mobile-Menu' onClick={togleMenu}/>
                </>
            }
            {openMenu && 
                <div className='Mobile-Menu-Items'>
                    <Link onClick={togleMenu} className='Link' to='/'>JOGS</Link>
                    <Link onClick={togleMenu} className='Link' to='/info'>INFO</Link>
                    <Link onClick={togleMenu} className='Link' to='/contact-us'>CONTACT US</Link>
                </div>
            }
        </div>
    );
}

export default Header;