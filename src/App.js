import React, { useEffect, useState } from 'react';
import tmdb from './tmdb';

import MovieRow from './components/MovieRow';

const App = () =>{
  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    async function loadAll(){
      const response = await tmdb.getHomeList();
      setMovieList(response);
    }
    loadAll();
  },[])

  return(
    <div className="page">
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