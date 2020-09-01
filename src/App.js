import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './api/tmdb.js';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredMovie';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() =>{
    const loadAll = async () =>{
      // pegando a lista de filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o featured
      let originals = list.filter(item => item.slug === 'originals');
      let randomChoose = Math.floor(Math.random() * (originals[0].items.results.length -1 ));
      let chosen = originals[0].items.results[randomChoose];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);      
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData && <FeaturedMovie item={featuredData} /> }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>      
    </div>
  );
}