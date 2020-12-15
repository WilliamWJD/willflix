import React from 'react';
import './Header.css';

import profileImg from '../../assets/will.jpeg';

const Header = ({ black }) =>{
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png" alt="Netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={profileImg} alt="William Dias"/>
                </a>
            </div>
        </header>
    )
}

export default Header;