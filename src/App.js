import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

const App = () =>{
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

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

  return(
    <div className="page">
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
    </div>
  )
}

export default App;