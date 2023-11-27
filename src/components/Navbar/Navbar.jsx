import React from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

/**
 * Navbar component for navigation.
 * @returns {JSX.Element} Navbar element with navigation links.
 */
const Navbar = () => {
    return (
        <nav className={style.nav}>
            <Link to="/">
                <Button placeholder="Home" />
            </Link>
            <Link to="/characters">
                <Button placeholder="Characters" />
            </Link>
            <Link to="/episodes">
                <Button placeholder="Episodes" />
            </Link>
            <Link to="/locations">
                <Button placeholder="Locations" />
            </Link>
        </nav>
    );
}

export default Navbar;
