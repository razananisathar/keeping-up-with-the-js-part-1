/*
 *  Assignment: Homework Assignment #18: The Geolocation API.
 *  Description: Build a standalone webpage that shows a map of the user's current location using HTML5 Geolocation API. 
 *  Video Component: https://youtu.be/LA8DDvpsxBc
 */

 /**
  * 1. Get the API Key.
  * 2. Enable Google Geocoding API and Maps Embed API.
  */
const API_KEY = "YOUR_API_KEY_HERE";

// DOM elements
const locationBTN = document.getElementById("btnLocation");
const msgPARA = document.getElementById("message");
const locationDIV = document.getElementById("location");

const displayMessage = (msg, className ="") => {
    msgPARA.innerText = msg;
    if(className !== "") msgPARA.classList.add(className);
}

const clearMessge = () => {
    msgPARA.innerText = "";
    msgPARA.classList.remove("error");
};

const getGeolocation = () => {
        
    displayMessage("Loading...");
    
    if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {

            const latlng = `${position.coords.latitude},${position.coords.longitude}`;
            const gcurl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${API_KEY}`;

            // Get city, country, and place ID.
            fetch(gcurl)
                .then(result => result.json())
                .then(data => {
                    try {
                        if(data.results.length > 0) {
                            const {plus_code:{compound_code}, results:[{place_id}]} = data;
                            
                            const query = compound_code.substr(8, compound_code.length).split(", ").join("+"); // city+country
                            const url = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=place_id:${place_id}&destination=Library+${query}&avoid=tolls|highways`;

                            const map = document.createElement("div");
                            map.setAttribute("id", "map");
                            map.innerHTML = `<iframe width="100%" height="450" frameborder="0" style="border:0"
                                                    src="${url}" allowfullscreen>
                                            </iframe>`;

                            if(locationDIV.hasChildNodes()) {
                                locationDIV.removeChild(locationDIV.firstChild);                                    
                            }
                            locationDIV.append(map);
                            clearMessge("");

                        } else throw data.error_message;
                    } catch(e) {
                        console.log(e);
                    }
                })
                .catch(err => console.log(err));

        }, error => displayMessage("Unable to retrieve your location.", "error"));

    } else console.log("Geolocation is not supported by this browser.");
};

// Event handler.
const getDirection = (e) => {
    e.preventDefault();
    getGeolocation();
};

locationBTN.addEventListener("click", getDirection);