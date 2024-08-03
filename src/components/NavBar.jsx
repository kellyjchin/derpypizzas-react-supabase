import '../styles/Navbar.css';
import React  from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';

function NavBar({ user }) {
    
    return (
        <nav>
            <ul className='desktop-menu'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about-us'>About Us</Link></li>
                { user ? <LogOut/> : <li><Link to='/sign-up'>Log In</Link></li> }
            </ul>
        </nav>
    );
}

export default NavBar;