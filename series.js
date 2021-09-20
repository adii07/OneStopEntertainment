var searchBar=document.querySelector("#user-input")
var btnSearch=document.getElementById("search-btn")

btnSearch.addEventListener("click",onClickAction)

function onClickAction(){
    var Userinput=searchBar.value
    var validURL=getValidURL(Userinput)

    fetch(validURL)
    .then(response=> response.json())
    .then(json=>{
        var movieDirector=json.Director
        var movieYear=json.Year
        var movieGenre=json.Genre
        var movieActors=json.Actors
        var movieAwards=json.Awards
        var movieRating=json.Ratings[0].Value
        var moviePlot=json.Plot
        var movieSeasons=json.totalSeasons
        var moviePoster=json.Poster
        console.log(movieDirector,movieYear,movieGenre,movieActors,movieAwards,movieRating,moviePlot,moviePoster,movieSeasons)
        setValues(movieDirector,movieYear,movieGenre,movieActors,movieAwards,movieRating,moviePlot,moviePoster,movieSeasons)
    })
    .catch(errorHandler)
}

function getValidURL(input){
    var url= "http://www.omdbapi.com/?t="+input+"&apikey=4ee074d"
    return url
}

function errorHandler(error) {
    console.log("error occurred" + error)
}

function setValues(movieDirector,movieYear,movieGenre,movieActors,movieAwards,movieRating,moviePlot,moviePoster,movieSeasons){
  //  $("#hidden").toggle();
    document.getElementById("movieDirector").innerText=movieDirector
    document.getElementById("movieYear").innerText=movieYear
    document.getElementById("movieGenre").innerText=movieGenre
    document.getElementById("movieActors").innerText=movieActors
    document.getElementById("movieAwards").innerText=movieAwards
    document.getElementById("movieRating").innerText=movieRating
    document.getElementById("moviePlot").innerText=moviePlot
    document.getElementById("moviePoster").src=moviePoster
    document.getElementById("movieSeasons").innerText=movieSeasons
    
}
