//Tmdb api
const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

getMovies(API_URL);

getGenre();

var selectedGenre = []
function getGenre(){
    tagsEl.innerHTML=''

    genres.forEach(genre=>{
        const genre_holder=document.createElement('div')
        genre_holder.classList.add('tags')
        genre_holder.id=genre.id
        genre_holder.innerText=genre.name
        genre_holder.addEventListener('click',()=>{
            console.log("Genre id : "+genre.id)
            if(selectedGenre.length==0){
                selectedGenre.push(genre.id)
                genre_holder.style.backgroundColor="#0A81AB"
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                            genre_holder.style.backgroundColor="#083355"
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                    genre_holder.style.backgroundColor="#0A81AB"
                }
            }
            console.log(selectedGenre)
            //Filter the movies based on genres
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
        })
        tagsEl.append(genre_holder)
    })
}

function getMovies(url) {
    lastUrl = url;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            if (data.results.length !== 0) {
                showMovies(data.results);
            } else {
                main.innerHTML = `<h1 class="no-results" style="color: white;">No Results Found</h1>`
            }

        })

}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview,
            id
        } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/>
            </div>
        
        `

        main.appendChild(movieEl);
    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Removing the hightlighted genre tags as soon as the search command is given

    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.style.backgroundColor='#083355'
        })
    }


    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL);
    }

})