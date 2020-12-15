import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

const App = () =>{
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBackHeader] = useState(false);

  useEffect(()=>{
    async function loadAll(){
      const response = await tmdb.getHomeList();
      setMovieList(response);

      // FILME EM DESTAQUE
      let originals = response.filter((item)=>item.slug === 'originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }
    loadAll();
  },[])

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBackHeader(true)
      }else{
        setBackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return()=>{
      window.removeEventListener('scroll', scrollListener);
    }
  },[])

  return(
    <div className="page">
      <Header
        black={blackHeader}
      />

      {featuredData && (
        <FeaturedMovie
          item={featuredData}
        />
      )}

      <div className="lists">
        {movieList.map((item, key)=>(
          <MovieRow 
            key={key} 
            title={item.title} 
            items={item.items}
          />
        ))}
      </div>

      <footer>
        Feito com <span role="img" aria-lavel="coração">❤</span> por William Dias <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && (    
        <div className="loading">
          <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/Netflix_LoadTime-scaled.gif" alt="Carregando"/>
        </div>
      )}
    </div>
  )
}

export default App;