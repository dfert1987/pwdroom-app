import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
    };

    return (
        <div className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    <li
                        className='navbarListItem'
                        onClick={() => navigate('/')}>
                        <ExploreIcon
                            fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
                            width='36px'
                            height='36px'
                        />
                        <p>Explore</p>
                    </li>
                    <li
                        className='navbarListItem'
                        onClick={() => navigate('/find')}>
                        <SearchIcon
                            color={
                                pathMatchRoute('/find') ? '#2c2c2c' : '#8f8f8f'
                            }
                            width='36px'
                            height='36px'
                        />
                        <p>Search</p>
                    </li>
                    <li
                        className='navbarListItem'
                        onClick={() => navigate('/profile')}>
                        <PersonOutlineIcon
                            fill={
                                pathMatchRoute('/profile')
                                    ? '#2c2c2c'
                                    : '#8f8f8f'
                            }
                            width='36px'
                            height='36px'
                        />
                        <p>Profile</p>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
