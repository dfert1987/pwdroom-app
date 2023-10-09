import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Spinner from './Spinner';
import 'swiper/swiper-bundle.css';

function Slider() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');
            const q = query(
                listingsRef,
                orderBy('timestamp', 'desc'),
                limit(5)
            );
            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listings);
            setLoading(false);
        };
        console.log(listings);
        fetchListings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        listings && (
            <>
                <p className='exploreHeading'>Recommended</p>
                <Swiper
                    className='swiper mySwiper'
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Navigation, A11y, Pagination, Scrollbar]}>
                    {listings.map(({ data, id }) => (
                        <SwiperSlide
                            key={id}
                            onClick={() =>
                                navigate(`/category/${data.type}/${id}`)
                            }>
                            <div
                                className='swiperSlideDiv'
                                style={{
                                    height: '25em',
                                    width: '100%',
                                    marginLeft: 'auto',
                                    marginTop: '1em',
                                    marginRight: 'auto',
                                    backgroundImage: `url(${data.imageUrls[0]})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundPositionY: 'center',
                                    backgroundSize: 'cover',
                                }}>
                                {' '}
                                <p className='swiperSlideText'>{data.name}</p>
                                <p className='swiperSlidePrice'>
                                    {data.overall} Stars
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    );
}

export default Slider;
