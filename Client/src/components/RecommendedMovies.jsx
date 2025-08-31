import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const RecommendedMovies = ({movieTitles}) => {
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmVmYzBkMDJmODQ5OGU0MTNkYTE1MDI5ODVlZDMwNSIsIm5iZiI6MTc1MjM1NTEzNy40NDEsInN1YiI6IjY4NzJkMTQxYTVhOTM3MGNlMzEwNTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruflJCuTDZPvNcmaAHJ06CRCPBT-YVJRaP5pr8r3Th8'
  }
};
  const [movie,setMovie] = useState([]);
  const [Loading,setLoading] = useState(true);
  const fetchMovies = async(title)=>{
    const encodedTitle= encodeURIComponent(title);
    const url=`https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`
    try{
        const res= await fetch(url,options);
        const data= await res.json();
        return data.results?.[0]||null;
    }
    catch(error){
        console.error("Error fetching movie details:",error);
        return null;
    }
  };
  useEffect(()=>{
    const LoadMovies= async()=>{
        setLoading(true);
        const results = await Promise.all(movieTitles.map(title=>fetchMovies(title)));
        setMovie(results.filter(movie=>movie!==null));
        setLoading(false);
    };
    if(movieTitles?.length){
        LoadMovies();
    }
  },[movieTitles]);
  if(Loading){
    return <p>Loading...</p>
  }
  console.log(movie);
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {movie.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-[#232323] rounded-lg overflow-hidden"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="w-full h-48 object-cover"
            />
          ) : (
            <>No Image</>
          )}

          <div className="p-2">
            <h3 className="text-sm font-semibold text-white truncate">
              {movie.title}
            </h3>
            <p className="text-xs text-gray-400">
              {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RecommendedMovies