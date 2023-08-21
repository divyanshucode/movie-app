
import React from "react";
import { useState ,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import removeFavourites from "./components/removeFavourites";
 console.log(process.env);



const App =()=>{
  const [movies,setMovies] = useState([])
  const [searchValue,setSearchValue] = useState('')
  const [favourites,setFavourites] = useState([])
  const getMoviesRequest= async(searchValue)=>{
 
   const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_API_KEY}`
   const response = await fetch(url)
   const responseJson = await response.json();
   if(responseJson.Search){
   setMovies(responseJson.Search)
   }

  }
   const addFavouriteMovie=(movie)=>{
     const newFavourite = [...favourites,movie]
     setFavourites(newFavourite)
     saveToLocalStorage(newFavourite)
   }

   const removeFavouriteMovie = (movie)=>{
    const newFavourite=
    favourites.filter
    ((favourites)=>favourites.imdbID !== movie.imdbID)
    setFavourites(newFavourite)
    saveToLocalStorage(newFavourite)
   }
  useEffect(()=>{
      getMoviesRequest(searchValue);
  },[searchValue])
  
  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);
  const saveToLocalStorage = (items)=>{
      localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
  }
  
  return(
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading  heading = "Movies" />
        <SearchBox  searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
         <MovieList  movies={movies} 
         handleFavouritesClick={addFavouriteMovie}
         favouriteComponent = {AddFavourites}
         />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading  heading = "Favourites" />
      </div>
      <div className="row">
         <MovieList  movies={favourites} 
         handleFavouritesClick={removeFavouriteMovie}
         favouriteComponent = {removeFavourites}
         />
      </div>



    </div>
  )
}

export default App