import React from 'react';
import { Link } from 'react-router-dom';
import barCategoryImage from '../assets/jpg/barcategoryimage.jpg';
import restaurantCategoryImage from '../assets/jpg/restaurantcategoryimage.jpeg';

function Explore() {
    return (
        <div className='explore'>
            <header>
                <p className='pageHeader exploreHeader'>Welcome to PWDROOM</p>
                <p className='pageSubHeader'>
                    Your Guide to Austin's Party Bathrooms
                </p>
            </header>

            <main>
                <p className='exploreCategoryHeading'>Categories</p>
                <div className='exploreCategories'>
                    <Link to='category/bar'>
                        <img
                            src={barCategoryImage}
                            alt='bar'
                            className='exploreCategoryImg'
                        />
                        <p className='exploreCategoryName'>Bar Bathrooms</p>
                    </Link>
                    <Link to='category/restaurants'>
                        <img
                            src={restaurantCategoryImage}
                            alt='restaurant'
                            className='exploreCategoryImg'
                        />
                        <p className='exploreCategoryName'>
                            Restaurant Bathrooms
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Explore;
