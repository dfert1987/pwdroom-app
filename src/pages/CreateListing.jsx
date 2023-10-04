import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

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

    console.log(formData);

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

    if (loading) {
        return <Spinner />;
    }

    return <div>CreateListing</div>;
}

export default CreateListing;
