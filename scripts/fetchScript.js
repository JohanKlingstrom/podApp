/* Make a random pod/episode play when pressing a button! */

// Constant variables
const mainContainer = document.getElementById('main-content');
const searchContainer = document.getElementById('search-container');
const button = document.getElementById('shuffle-button');
button.addEventListener('click', () => {
    fetchData();
})
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    searchForEpisodes();
})

// Other Variables
let searchQuery = "";
let formatedProgramInfo = {};
let formatedSearchList = {};



fetchData = () => {
    fetch('http://api.sr.se/api/v2/episodes/index?programid=3718&pagination=false&fromdate=2021-01-01&format=json')
        .then(res => res.json())
        .then(data => {
            buildEpisodeArticle(formatData(data));
        });
        
}

// Search for episodes
function searchForEpisodes(){
    searchQuery = document.getElementById('searchbar').value.toLowerCase();
    fetch(`http://api.sr.se/api/v2/episodes/search/?query=${searchQuery}&format=json`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            formatSearchList(data);
        })
}


// Populates the object with information from the episode
function formatData(data) {
    formatedProgramInfo = {
        title: data.episodes[0].title,
        description: data.episodes[0].description,
        image: data.episodes[0].imageurl,
        audio: data.episodes[0].listenpodfile.url
    }
    return formatedProgramInfo;
}



// Loop through each index item of response and build an object with data
function formatSearchList(data) {
    for(let i; i < 10; i++) {
        // formatedSearchList = {
        //     title: data.episodes[i].title,
        //     image: data.episodes[i].imageurl
        // }
        buildSearchListItem(data);
    }
}

function buildEpisodeArticle(episodeData) {
    mainContainer.innerHTML = `<h2 id="episode title">${episodeData.title}</h2>
    <img class="episode coverart"src="${episodeData.image}"/>
    <p class="episode description">${episodeData.description}</p>
    <audio class="episode player" controls src="${episodeData.audio}">Your browser does not support the audio element</audio>`;
}

function buildSearchListItem(data) {
    document.createElement(`<div><h2 id="episode title">${data.episodes[i].title}</h2>
    <img class="episode coverart"src="${data.episodes[i].imageurl}"/></div>`);
}






