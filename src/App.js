import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './api/tmdb.js';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredMovie';
import Header from './components/header';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(() =>{
    const scrollListiner = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListiner);
    return () => {
      window.removeEventListener('scroll', scrollListiner);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} /> }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
          Feito pela B7Web<br />
          Direitos de imagem para Netflix<br />
          Dados extraidos do site Themoviedb.org<br />
          Toda honra e toda glória seja dada a Deus<br />
      </footer>

      {movieList.length <=  0 &&
        <div className="loading">
          <img src="https://notresponding.net/wp-content/uploads/2018/01/Netflix_LoadTime.gif" className="carregando" alt="loading"/>
        </div>
      }      

    </div>
  );
}