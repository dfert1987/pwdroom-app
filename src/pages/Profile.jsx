import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import bathroomIcon from '../assets/svg/toilet-sign-svgrepo-com.svg';

function Profile() {
    const auth = getAuth();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const [changeDetails, setChangeDetails] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();
        navigate('/');
    };

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                await updateDoc(userRef, {
                    name,
                });
            }
        } catch (error) {
            toast.error('Could not update profile details.');
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className='profile'>
            <header className='profileHeader'>
                <p className='pageHeader'>My Profile</p>
                <button type='button' className='logOut' onClick={onLogout}>
                    Logout
                </button>
            </header>
            <main>
                <div className='profileDetailsHeader'>
                    <p className='profileDetailsText'>Personal Info</p>
                    <p
                        className='changePersonalDetails'
                        onClick={() => {
                            changeDetails && onSubmit();
                            setChangeDetails((prevState) => !prevState);
                        }}>
                        {changeDetails ? 'Done' : 'Update'}
                    </p>
                </div>
                <div className='profileCard'>
                    <form>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            className={
                                !changeDetails
                                    ? 'profileName'
                                    : 'profileNameActive'
                            }
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <label htmlFor='email'>Email:</label>

                        <input
                            type='text'
                            id='email'
                            className={
                                !changeDetails
                                    ? 'profileEmail'
                                    : 'profileEmailActive'
                            }
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>
                <Link to='/create-listing' className='createListing'>
                    <img src={bathroomIcon} alt='toilet' height={'50px'} />
                    <p>Add a bathroom listing +</p>
                    <img src={arrowRight} alt='arrow right' />
                </Link>
            </main>
        </div>
    );
}

export default Profile;
