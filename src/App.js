import React, { Component } from 'react';
import './App.css'
import axios from 'axios'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          keyword:'',
          details:[],
          category:'movie'
        }
        this.foundkeyword=this.foundkeyword.bind(this);
        this.search=this.search.bind(this);
        this.getCategory=this.getCategory.bind(this);
    }

    //sets the keyword state to whatever you print in the search text field
    foundkeyword(event){
      this.setState({
        keyword: event.target.value
      })
    }

    //Searches the movie using keyword
    search(){
      axios({
        method:'get',
        url:`https://api.themoviedb.org/3/search/${this.state.category}?api_key=618beb7230424a9d83ef94b33f200275&query=${this.state.keyword}`
      })
      .then((obj)=>{
        this.setState({
          details:obj.data.results
        })
      })
      .catch((error)=>{
        alert('Could not connect to the server');
      })
    }

    //gets the category for the search from the combo list
    getCategory(event){
      this.setState({
        category:event.target.value
      })
    }

    render() {
      return (
        <div>
            <input type='text' placeholder='Search...' onChange={this.foundkeyword} value={this.state.keyword}></input>
            <select onChange={this.getCategory}>
              <option value='movie'>Movie</option>
              <option value='person'>Actor/Actress</option>
              <option value='person'>Director</option>
              <option value='person'>Producer</option>
            </select>
            <button type='button' onClick={this.search}>Search</button>
            <div>
              {
                this.state.details.map((element,index)=>{
                  var poster = `https://image.tmdb.org/t/p/w92/${element.poster_path}`;
                  return(
                    <div className='movieList' key={index}>
                    <img className='image' src={poster} alt='img' />
                    <h2 className='movieTitle'>{element.title}</h2>
                    <h6 className='movieLanguage'>Language: {element.original_language}</h6>
                    <h6 className='movieRating'>Rating: {element.vote_average}</h6>
                    <h6 className='movieReleaseDate'>Release Date: {element.release_date}</h6>
                    </div>
                  )
                })
              }
            </div>
        </div>
      );
    }
}

export default App;
