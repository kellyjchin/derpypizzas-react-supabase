import '../styles/Navbar.css';
import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';

function NavBar({ user }) {
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <>
            <nav className='desktop-menu'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about-us'>About Us</Link></li>
                    { user && <li><Link to='/profile'>Profile</Link></li> }
                    { user ? <LogOut/> : <li><Link to='/sign-up'>Log In</Link></li> }
                </ul>
            </nav>

            <nav className='mobile-menu'>
                <button 
                    onClick={ () => setIsMobileMenuOpen( prev => !prev )} 
                    className='hamburger'>
                    <img src="/assets/hamburger.png" width="40px" height='20px' alt="Mobile Menu"></img>
                </button>
                <ul className={isMobileMenuOpen ? 'open' : 'd-none'}>
                    <li><Link onClick={closeMobileMenu} to='/'>Home</Link></li>
                    <li><Link onClick={closeMobileMenu} to='/about-us'>About Us</Link></li>
                    { user && <li><Link onClick={closeMobileMenu} to='/profile'>Profile</Link></li> }
                    { user ? <LogOut onLogout={closeMobileMenu}/> : <li><Link onClick={closeMobileMenu} to='/sign-up'>Log In</Link></li> }
                </ul>
            </nav>
        </>
    );
}

export default NavBar;