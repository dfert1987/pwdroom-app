import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import pinIcon from '../assets/svg/pin.svg';
import subCategoryIcon from '../assets/svg/bookmark.svg';

function BathroomItem({ listing, id, onDelete }) {
    return (
        <li className='categoryListing'>
            <Link
                to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'>
                <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className='categoryListingImg'
                />
                <div className='categoryListingDetails'>
                    <p className='categoryListingLocation'>{listing.address}</p>
                    <p className='categoryListingName'>{listing.name}</p>
                    <ReactStars
                        className='categoryListingStars'
                        count={5}
                        value={listing.overall}
                        size={25}
                        edit={false}
                        half={true}
                        color2={'#00cc66'}
                    />
                    <p className='categoryListingTag'>{listing.tag}</p>
                    <div className='categoryListingInfoDiv'>
                        <div className='categoryListingInfoItem'>
                            <img src={subCategoryIcon} alt='sub-category' />
                            <p className='categoryListingInfoText'>
                                {listing.subtype}
                            </p>
                        </div>
                        <div className='categoryListingInfoItem'>
                            <img src={pinIcon} alt='sub-category' />
                            <p className='categoryListingInfoText'>
                                {listing.neighborhood}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            {onDelete && (
                <DeleteIcon
                    className='removeIcon'
                    fill='rgb(231, 76, 60'
                    onClick={() => onDelete(listing.id, listing.name)}
                />
            )}
        </li>
    );
}

export default BathroomItem;
