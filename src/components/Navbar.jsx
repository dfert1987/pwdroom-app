import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
    return (
        <div className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    <li className='navbarListItem'>
                        <ExploreIcon
                            fill='#2c2c2c'
                            width='36px'
                            height='36px'
                        />
                        <p>Explore</p>
                    </li>
                    <li className='navbarListItem'>
                        <SearchIcon width='36px' height='36px' />
                        <p>Search</p>
                    </li>
                    <li className='navbarListItem'>
                        <PersonOutlineIcon
                            fill='#2c2c2c'
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
