import React, { useEffect, useState } from 'react'
import CardImg from '../assets/cardimg.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Link } from 'react-router';

const CardList = ({ title, category }) => {
    const [data, setdata] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmVmYzBkMDJmODQ5OGU0MTNkYTE1MDI5ODVlZDMwNSIsIm5iZiI6MTc1MjM1NTEzNy40NDEsInN1YiI6IjY4NzJkMTQxYTVhOTM3MGNlMzEwNTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruflJCuTDZPvNcmaAHJ06CRCPBT-YVJRaP5pr8r3Th8'
        }
    };
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setdata(res.results))
            .catch(err => console.error(err));
    }, [category]);

    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
            <Swiper slidesPerView={"auto"} spaceBetween={10} className='mySwiper'>

                {data.map((item, index) => (

                    <SwiperSlide key={index} className="max-w-72">
                        <Link to={`/movie/${item.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={item.original_title} className="h-44 w-full object-center object-cover" />
                            <p className='text-center pt-2'>{item.original_title}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardList;
