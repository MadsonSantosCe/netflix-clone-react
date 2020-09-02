import React from 'react';
import './header.css';

export default ({black}) => {

    return (
        <header className={black ? 'black' : ''}>
            <div className='header_logo'>
                <a href="/">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt='Logo'/>
                </a>
            </div>

            <div className='header_user'>
                <a href="/">
                    <img src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png' alt='Usuário'/>
                </a>
            </div>
        </header>
    );
}