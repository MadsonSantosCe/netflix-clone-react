import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './api/tmdb.js';
import MovieRow from './components/movieRow';


export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() =>{
    const loadAll = async () =>{
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      <saction className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </saction>      
    </div>
  );
}