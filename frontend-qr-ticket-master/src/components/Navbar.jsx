// src/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <nav onClick={handleClick} className='navbar'>
            <h1>Ticket app </h1>
        </nav>
    );
};

export default Navbar;

