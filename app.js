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
        console.log(movieDirector)
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
