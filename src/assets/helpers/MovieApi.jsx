import React, { useEffect, useState } from "react";

// sort puede ser
// 'popularity' por popularidad
// 'vote_average' mas "popular en votos"
// 'vote_count' mas votada "cantidad de votos"
// 'title' alfabetico 

// type puede ser
// 'tv'
// 'movie'

// order
// desc
// asc
const MovieApi = ({
  type = "movie",
  page = 1,
  sort = "popularity",
  order = "desc",
}) => {
  const [movies, setMovies] = useState([]);

  

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?api_key=773243072698134e8a05b7f35c91fafb&language=es-AR&sort_by=${sort}.${order}&page=${page}`
      );
      const data = await res.json();

      const moviesVisible = data.results.map((movie) => ({
        ...movie,
        visible: true,
      }));

      setMovies(moviesVisible);
    };

    fetchMovies();
  }, [page,sort,order]);

return (
    <div>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
};

export default MovieApi;

// lo estoy probando en layout/pageslayout
//  <MovieApi type="movie" sort="popularity"/>