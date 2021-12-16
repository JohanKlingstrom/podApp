/* Make a random pod/episode play when pressing a button! */

// Constant variables
const mainContainer = document.getElementById('main-content');
const searchContainer = document.getElementById('search-container');


const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    searchForEpisodes();
})

// Other Variables
let searchQuery = "";
let formatedProgramInfo = {};
let episodeList = {};



function fetchData(query){
    fetch(`http://api.sr.se/api/v2/episodes/getlist?ids=${query}&format=json`)
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
            //Clear the search list just in case it's populated
            searchContainer.innerHTML = "";
            buildSearchList(episodeList);
        })
}


// Populates the object with information from the episode
function formatData(data){
    formatedProgramInfo = {
        title: data.episodes[0].title,
        description: data.episodes[0].description,
        image: data.episodes[0].imageurl,
        audio: data.episodes[0].listenpodfile.url
    }
    return formatedProgramInfo;
}

function buildEpisodeArticle(episodeData){
    mainContainer.innerHTML = `<h2 id="episode title">${episodeData.title}</h2>
    <img class="episode coverart"src="${episodeData.image}"/>
    <p class="episode description">${episodeData.description}</p>
    <audio class="episode player" controls src="${episodeData.audio}">Your browser does not support the audio element</audio>`;
}

function buildSearchList(list){
    //Create search list elements
    for (let i = 0; i < list.length; i++) {
        const li = document.createElement('li');
        const liTitle = document.createElement('h3');
        const liDescrip = document.createElement('p');
        const liButton = document.createElement('button');
    
        //Add content
        liDescrip.textContent = list[i].description;
        liTitle.textContent = list[i].title;
        liButton.textContent = 'Pick Episode';
        //Make each button numbered
        liButton.setAttribute("id", `btnChoice${i}`);
        //Set the buttons data attribute to episode ID
        liButton.setAttribute("data-id", `${list[i].id}`);
        liButton.addEventListener('click', () => {
            let chosenEp = liButton.getAttribute("data-id");
            fetchData(chosenEp);
            scroll(0,0);
        })
    
        //Append to DOM
        li.appendChild(liTitle);
        li.appendChild(liDescrip);
        li.appendChild(liButton);
        searchContainer.appendChild(li);
    }
}

// Run formatData() on the list item user picks