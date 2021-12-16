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
let episodeList = {};



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
            episodeList = data.episodes;
            searchContainer.innerHTML = "";
            buildSearchList(episodeList);
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
// function formatSearchList(ep) {}

function buildEpisodeArticle(episodeData) {
    mainContainer.innerHTML = `<h2 id="episode title">${episodeData.title}</h2>
    <img class="episode coverart"src="${episodeData.image}"/>
    <p class="episode description">${episodeData.description}</p>
    <audio class="episode player" controls src="${episodeData.audio}">Your browser does not support the audio element</audio>`;
}

function buildSearchList(list){
    //Create search list elements
    for (let i = 0; i < list.length; i++) {
        console.log(list[i].title);
        const li = document.createElement('li');
        const liTitle = document.createElement('h3');
        const liDescrip = document.createElement('p');
    
        //Add content
        liDescrip.textContent = list[i].description;
        liTitle.textContent = list[i].title;
    
    
        //Append to DOM
        li.appendChild(liTitle);
        li.appendChild(liDescrip);
        searchContainer.appendChild(li);
    }
}





