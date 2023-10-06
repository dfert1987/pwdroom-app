import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import ReactStars from 'react-stars';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import StarIcon from '../assets/svg/star-solid.svg';

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            }
        };
        fetchListing();
    }, [navigate, params.listingId]);

    console.log(listing);

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            {/* slider goes here */}
            <div className='listingDetailContainer'>
                <div className='listingLeft'>
                    <div className='listingDetails'>
                        <h3 className='listingName'>{listing.name}</h3>
                        <p className='listingLocation'>{listing.address}</p>
                        <p className='listingType'>
                            {listing.type} --
                            <i className='listingSubType'> {listing.subtype}</i>
                        </p>
                        <p className='listingType'>{listing.neighborhood}</p>
                    </div>
                    <div className='listingDetailsTwo'>
                        {listing.gendered ? (
                            <h4 className='booleanDetail first'>
                                Gendered: Male/Female
                            </h4>
                        ) : (
                            <h4 className='booleanDetail'>Gendered: Unisex</h4>
                        )}
                        {listing.single ? (
                            <h4 className='booleanDetail'>Private Room: Yes</h4>
                        ) : (
                            <h4 className='booleanDetail'>Private Room: No</h4>
                        )}
                    </div>
                    <div className='buttonsDiv'>
                        <button className='addComment'>
                            <p>Add Review</p>
                            <img
                                src={StarIcon}
                                alt='star'
                                height={'30px'}
                                fill={'white'}
                            />
                        </button>
                        <div
                            className='shareIconDiv'
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    window.location.href
                                );
                                setShareLinkCopied(true);
                                setTimeout(() => {
                                    setShareLinkCopied(false);
                                }, 2000);
                            }}>
                            <img src={shareIcon} alt='Share Icon' />
                        </div>
                    </div>
                    {shareLinkCopied && (
                        <p className='linkCopied'>Link Copied!</p>
                    )}
                </div>
                <div className='listingRight'></div>
            </div>
            <hr className='listingDivider' />
        </main>
    );
}

export default Listing;
