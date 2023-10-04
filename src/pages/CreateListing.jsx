import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import Spinner from '../components/Spinner';
import {
    NeighborhoodOptions,
    DefaultNeighborhoodOption,
    BarOptions,
    DefaultBarOption,
} from '../assets/constants';
import 'react-dropdown/style.css';

function CreateListing() {
    const [loading, setLoading] = useState(false);
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        type: 'bar',
        subtype: 'dive',
        address: '',
        neighborhood: '',
        tag: '',
        description: '',
        single: false,
        gendered: true,
        overall: 0,
        cleanliness: 0,
        flat: 0,
        safety: 0,
        privacy: 0,
        vibes: 0,
        imageUrls: [],
        latitude: 0,
        longitude: 0,
    });

    const {
        type,
        name,
        subtype,
        address,
        neighborhood,
        tag,
        description,
        single,
        gendered,
        overall,
        cleanliness,
        flat,
        safety,
        privacy,
        vibes,
        imageUrls,
        latitude,
        longitude,
    } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid });
                } else {
                    navigate('/sign-in');
                }
            });
        }

        return () => {
            isMounted.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onMutate = (e) => {};

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='profile'>
            <header>
                <p className='pageHeader'>Add a Bathroom</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Bar / Restaurant</label>
                    <div className='formButtons'>
                        <button
                            type='button'
                            className={
                                type === 'bar'
                                    ? 'formButtonActive'
                                    : 'formButton'
                            }
                            id='type'
                            value='bar'
                            onClick={onMutate}>
                            Bar
                        </button>
                        <button
                            type='button'
                            className={
                                type === 'restaurant'
                                    ? 'formButtonActive'
                                    : 'formButton'
                            }
                            id='type'
                            value='restaurant'
                            onClick={onMutate}>
                            Restaurant
                        </button>
                    </div>
                    <label className='formLabel'> Subtype: </label>
                    <Dropdown
                        className='neighborhoodDropdown'
                        options={BarOptions}
                        onChange={onMutate}
                        value={subtype}
                        placeholder='Choose a bar type'
                        controlClassName='myControlClassName'
                        arrowClassName='myArrowClassName'
                        placeholderClassName='myPlaceholderClassName'
                    />
                    <label className='formLabel'>Name:</label>
                    <input
                        type='text'
                        className='formInputName'
                        id='name'
                        value={name}
                        onChange={onMutate}
                        maxLength={32}
                        minLength={5}
                        required
                    />
                    <label className='formLabel'> Neighborhood: </label>
                    <Dropdown
                        className='neighborhoodDropdown'
                        options={NeighborhoodOptions}
                        onChange={onMutate}
                        value={neighborhood}
                        placeholder='Choose a Neighborhood'
                        controlClassName='myControlClassName'
                        arrowClassName='myArrowClassName'
                        placeholderClassName='myPlaceholderClassName'
                    />
                </form>
            </main>
        </div>
    );
}

export default CreateListing;
