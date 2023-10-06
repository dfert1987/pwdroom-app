import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
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
                        <h2 className='listingName'>{listing.name}</h2>
                        <p className='listingLocation'>{listing.address}</p>
                        <p className='listingDescription'>
                            <i>{listing.description}</i>
                        </p>
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
                    <div className='mapArea'>
                        <p className='listingLocationTitle'>Location:</p>
                        <div className='leafletContainer'>
                            <MapContainer
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                center={[
                                    listing.geolocation.lat,
                                    listing.geolocation.lng,
                                ]}
                                zoom={13}
                                scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                                />
                                <Marker
                                    position={[
                                        listing.geolocation.lat,
                                        listing.geolocation.lng,
                                    ]}>
                                    <Popup>{listing.address}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
                <div className='listingRight'>
                    <h3 className='ratingHeader'>Rating:</h3>
                    <div className='listingRatings'>
                        <div className='ratingContainer'>
                            <p className='ratingLabel'>Overall:</p>
                            <ReactStars
                                className='bathroomPageStars'
                                count={5}
                                value={listing.overall}
                                edit={false}
                                size={25}
                                half={true}
                                color2={'#00cc66'}
                            />
                        </div>
                        <div className='ratingContainer'>
                            <p className='ratingLabel'>Cleanliness:</p>
                            <ReactStars
                                className='bathroomPageStars'
                                count={5}
                                value={listing.cleanliness}
                                edit={false}
                                size={25}
                                half={true}
                                color2={'#00cc66'}
                            />
                        </div>
                        <div className='ratingContainer'>
                            <p className='ratingLabel'>Privacy:</p>
                            <ReactStars
                                className='bathroomPageStars'
                                count={5}
                                value={listing.privacy}
                                edit={false}
                                size={25}
                                half={true}
                                color2={'#00cc66'}
                            />
                        </div>
                        <div className='ratingContainer'>
                            <p className='ratingLabel'>Surfaces:</p>
                            <ReactStars
                                className='bathroomPageStars'
                                count={5}
                                value={listing.flat}
                                edit={false}
                                size={25}
                                half={true}
                                color2={'#00cc66'}
                            />
                        </div>
                        <div className='ratingContainer'>
                            <p className='ratingLabel'>Safety:</p>
                            <ReactStars
                                className='bathroomPageStars'
                                count={5}
                                value={listing.safety}
                                edit={false}
                                size={25}
                                half={true}
                                color2={'#00cc66'}
                            />
                        </div>
                        <div className='ratingContainer'>
                            <p className='ratingLabel'>Vibes:</p>
                            <ReactStars
                                className='bathroomPageStars'
                                count={5}
                                value={listing.vibes}
                                edit={false}
                                size={25}
                                half={true}
                                color2={'#00cc66'}
                            />
                        </div>
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
                            <p className='shareText'>SHARE </p>
                            <img src={shareIcon} alt='Share Icon' />
                        </div>
                    </div>
                    {shareLinkCopied && (
                        <p className='linkCopied'>Link Copied!</p>
                    )}
                </div>
            </div>

            <hr className='listingDivider' />
        </main>
    );
}

export default Listing;
