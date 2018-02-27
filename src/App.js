import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          keyword:'',
          details:[]
        }
        this.foundkeyword=this.foundkeyword.bind(this);
        this.search=this.search.bind(this);
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
        url:`https://api.themoviedb.org/3/search/movie?api_key=618beb7230424a9d83ef94b33f200275&query=${this.state.keyword}`
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

    render() {
      return (
        <div>
            <input type='text' placeholder='Find Movies, TV shows, Celebrities and more...' onChange={this.foundkeyword} value={this.state.keyword}></input>
            <br/>
            <br/>
            <button type='button' onClick={this.search}>Search</button>
            <div>
              {
                this.state.details.map((element,index)=>{
                  var poster = `https://image.tmdb.org/t/p/w92/${element.poster_path}`
                  return(
                    <div key={index}>
                    <h2>{element.title}</h2>
                    <img src={poster} alt='img' />
                    <h6>Language: {element.original_language}</h6>
                    <h6>Rating: {element.vote_average}</h6>
                    <h6>Release Date: {element.release_date}</h6>
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
