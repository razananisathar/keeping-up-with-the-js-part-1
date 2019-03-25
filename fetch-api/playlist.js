/*
 *  Assignment: Homework Assignment #15: The Fetch API.
 *  Description: Fetch data from an external API and display it on HTML. Post data to the API using a form submission.
 *  API: YouTube Data API v3	
 *  Youtube Channel: Pirple, https://www.youtube.com/channel/UCwwFaFyKAol7hXS87fv30xg
 */

const APIKEY = "YOUR_API_KEY_HERE";  // Add API Key here.
const APIURL = "https://www.googleapis.com/youtube/v3/";

/**
 *  Fetch playlist of a youtube channel.
 */
const playlistIds = [
    "PLgTkNlNsy9gVSm7DbZbZsoSMmaQOyTh1H",
    "PLgTkNlNsy9gW0bGqjXdVjogae6sT6fhP9",
    "PLgTkNlNsy9gVvX0oby9VMZ1niTAkS_ti5"
];

// DOM elements
const fetchBTN = document.getElementById("fetch");
const refreshBTN = document.getElementById("refresh");
const coursesDIV = document.getElementById("courses");
const messagePARA = document.getElementById("message");

let isLoading = false;

// Handle loading message on screen.
const showMessage = (message) => {
    messagePARA.innerText = message;
}

// Request API to fetch data.
const fetchPlaylists = () => {
    // Get random playlist.
    let randomId = Math.floor(Math.random()* playlistIds.length);

    const playlistItemsURL = `${APIURL}playlistItems?playlistId=${playlistIds[randomId]}&key=${APIKEY}&part=snippet,contentDetails&maxResults=25`;
    
    isLoading = true;
    showMessage("Please wait, data loading....");
    
    fetch(playlistItemsURL)
        .then(response => response.json())
        .then(playlist => {
                isLoading = false;
                populatePlaylist(playlist.items);
                showMessage("");
            })
            .catch((err) => {
                console.log(err.message);
                isLoading = false;
                showMessage("");
                alert("sorry, we couldn't access the API");
            });
};

// Display fetched data.
const populatePlaylist = (videos) => {
        videos.reverse();

        for(video of videos) {
            showPlaylist(video.snippet);
        }
};

// Create DOM element.
const showPlaylist = ({position, publishedAt, title, description, resourceId:{videoId}}) => {
    let course = `<div data-courseId="${position}" class="course">
                    <p>
                    <h2>${title}</h2>
                    <iframe width="560" height="315" 
                    src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>
                        ${description}
                        <br>
                        <br>
                        <span>Published On: ${new Date(publishedAt).toLocaleString()}</span>
                    </p>
                  </div>`;    

    coursesDIV.insertAdjacentHTML("afterbegin", course);
};

// Call when refresh button clicked.
const reload = () => {
    const courseDIVs = document.querySelectorAll(".course");
    
    if(courseDIVs.length !== 0) {
        for(prop of courseDIVs) {
            coursesDIV.removeChild(prop);
        }

        fetchPlaylists();
    } else {
        showMessage("First you have to fetch data.");
    }
};
 
// Event listners.
fetchBTN.addEventListener("click", fetchPlaylists);
refreshBTN.addEventListener("click", reload);