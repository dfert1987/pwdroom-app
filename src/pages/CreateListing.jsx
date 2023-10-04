import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import Spinner from '../components/Spinner';
import { NeighborhoodOptions, BarOptions } from '../assets/constants';
import discoBathroom from '../assets/jpg/discobathroom.jpeg';
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
        console.log(formData);
    };

    const onMutate = (e, dropType) => {
        if (dropType === 'neighborhood') {
            setFormData((prevState) => ({
                ...prevState,
                neighborhood: e.value,
            }));
        }
        if (dropType === 'subtype') {
            console.log(e.value);
            setFormData((prevState) => ({
                ...prevState,
                subtype: e.value,
            }));
        }
        let boolean = null;
        if (e.target) {
            if (e.target.value === 'true') {
                boolean = true;
            }
            if (e.target.value === 'false') {
                boolean = false;
            }

            // Files
            if (e.target.files) {
                setFormData((prevState) => ({
                    ...prevState,
                    images: e.target.files,
                }));
            }
            // Text/Booleans
            if (!e.target.files) {
                setFormData((prevState) => ({
                    ...prevState,
                    [e.target.id]: boolean ?? e.target.value,
                }));
            }
        }
        console.log(formData);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='profile'>
            <header>
                <p className='pageHeader bathroom'>Add a Bathroom</p>
            </header>
            <main className='addBathroomFormPage'>
                <div className='formSide'>
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
                        <label className='formLabel dropLabel'>Subtype:</label>
                        <Dropdown
                            className='neighborhoodDropdown'
                            options={BarOptions}
                            onChange={(e) => onMutate(e, 'subtype')}
                            value={subtype}
                            placeholder='Choose a bar type'
                            controlClassName='myControlClassName'
                            arrowClassName='myArrowClassName'
                            placeholderClassName='myPlaceholderClassName'
                            required
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
                        <label className='formLabel'>Address:</label>
                        <textarea
                            className='formInputAddress'
                            type='text'
                            id='address'
                            value={address}
                            onChange={onMutate}
                            required
                        />
                        <label className='formLabel dropLabel'>
                            Neighborhood:
                        </label>
                        <Dropdown
                            className='neighborhoodDropdown'
                            options={NeighborhoodOptions}
                            onChange={(e) => onMutate(e, 'neighborhood')}
                            value={neighborhood}
                            placeholder='Choose a Neighborhood'
                            controlClassName='myControlClassName'
                            arrowClassName='myArrowClassName'
                            placeholderClassName='myPlaceholderClassName'
                            required
                        />
                        <label className='formLabel'>Tag:</label>
                        <p className='formInstructions'>
                            <i>
                                Enter a one-line description of the bar /
                                restaurant that users will see before they click
                                in to learn more.
                            </i>
                        </p>
                        <textarea
                            className='formInputAddress'
                            type='text'
                            id='tag'
                            value={tag}
                            onChange={onMutate}
                            minLength={3}
                            maxLength={100}
                            required
                        />
                        <label className='formLabel'>Description:</label>
                        <p className='formInstructions'>
                            <i>
                                A more detailed description of the bar /
                                restaurant.
                            </i>
                        </p>
                        <textarea
                            className='formInputAddress'
                            type='text'
                            id='description'
                            value={description}
                            onChange={onMutate}
                            maxLength={400}
                        />
                        <label className='formLabel'>Gendered / Unisex</label>
                        <div className='formButtons'>
                            <button
                                type='button'
                                className={
                                    gendered ? 'formButtonActive' : 'formButton'
                                }
                                id='gendered'
                                value={true}
                                onClick={onMutate}>
                                Gendered
                            </button>
                            <button
                                type='button'
                                className={
                                    !gendered && gendered !== null
                                        ? 'formButtonActive'
                                        : 'formButton'
                                }
                                id='gendered'
                                value={false}
                                onClick={onMutate}>
                                Unisex
                            </button>
                        </div>
                        <label className='formLabel'>
                            Multi-Stall / Private
                        </label>
                        <div className='formButtons'>
                            <button
                                type='button'
                                className={
                                    !single && single !== null
                                        ? 'formButtonActive'
                                        : 'formButton'
                                }
                                id='single'
                                value={false}
                                onClick={onMutate}>
                                Multi-Stall
                            </button>
                            <button
                                type='button'
                                className={
                                    single ? 'formButtonActive' : 'formButton'
                                }
                                id='single'
                                value={true}
                                onClick={onMutate}>
                                Private
                            </button>
                        </div>
                        <label className='formLabel'>Images:</label>
                        <p className='formInstructions'>
                            <i>The first image will be the cover (max 6)</i>
                        </p>
                        <input
                            type='file'
                            className='formInputFile'
                            id='images'
                            onChange={onMutate}
                            max='6'
                            accept='.jpg,.png,.jpeg'
                            multiple
                            required
                        />
                        <button
                            type='submit'
                            className='primaryButton createListingButton'>
                            Add Bathroom:
                        </button>
                    </form>
                </div>
                <div className='bathroomSide'>
                    <img
                        className='discoBathroom'
                        alt='disco bathroom'
                        src={discoBathroom}
                    />
                </div>
            </main>
        </div>
    );
}

export default CreateListing;
