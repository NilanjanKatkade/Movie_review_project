// import { Play } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { Link, Links, useParams } from 'react-router';

// const Tvpage = () => {
//     const { id } = useParams();
//     const [movie, setMovie] = useState(null);
//     const [trailerKey, setTrailerKey] = useState(null);
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmVmYzBkMDJmODQ5OGU0MTNkYTE1MDI5ODVlZDMwNSIsIm5iZiI6MTc1MjM1NTEzNy40NDEsInN1YiI6IjY4NzJkMTQxYTVhOTM3MGNlMzEwNTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruflJCuTDZPvNcmaAHJ06CRCPBT-YVJRaP5pr8r3Th8'
//         }
//     };


//     useEffect(() => {

//         fetch(`https://api.themoviedb.org/3/tv/${id}/season/season_number/episode/episode_number?language=en-US`, options)
//             .then(res => res.json())
//             .then(res =>
//                 setMovie(res)
//             )
//             .catch(err => console.error(err));

//         fetch('https://api.themoviedb.org/3/tv/series_id/season/season_number/videos?language=en-US', options)
//             .then(res => res.json())
//             .then(res => {
//                 const trailer = res.results?.find(
//                     (vid) => vid.site === "YouTube" && vid.type === "Trailer"
//                 );
//                 setTrailerKey(trailer?.key || null);
//             })
//             .catch(err => console.error(err));
//     })
//     if (!movie) {
//         return <p className='text-white text-center'>Loading...</p>
//     }

//     return (
//         <div className="min-h-screen bg-[#181818] text-white">
//             <div
//                 className="relative h-[60vh] flex item-end"
//                 style={{
//                     backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                 }}
//             ><div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
                

//             </div>

//         </div>
//     )
// }

// export default Tvpage
