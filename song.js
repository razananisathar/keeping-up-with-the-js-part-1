/*
    Assignment: Homework Assignment #1: Data Types.
    Description: Favorite song attributes.
*/

//Title of the song.
var title = "Try Everything";

//Name of the artist.
var artist = "Shakira";

//Name of the album. 
var album = "Zootopia";

//Duration of the song.
var durationInSeconds = 202;
 
//Name of the record company.
var label = "Walt Disney Records"; 

//Song released type and release date.
var release = {
    type : "Single",
    date : "2016-02-15",
};

//Song recoreded year, month and the studio name.
var recorded = {
    year: "2015",
    month: "November",
    studio: "Westlake Recording Studios",
};

//Types of genres.
var genre = ["Pop", "Dance-Pop"];

//Names of the songwriters.
var composers = ["Sia Furler", "Tor Hermansen", "Mikkel Eriksen"];

//Name of the producer.
var producer = "Stargate";

//Name of the copyright owner.
var copyright = "Disney Enterprises, Inc.";

//Song ratings.
var ratings = 7.4;

//Status of song translated in other languages.
var isTranslation = true;

//Translations of the song: language and title.
var versions = [
    {
        language: "Chinese Mandarin",
        title: "Try everything",
    },
    {
        language: "Hindi",
        title: "I will not Give up",
    },
    {
        language: "Korean",
        title: "Do your best",
    },
    {
        language: "Ukrainian",
        title: "I won't give up",
    },
]

//External links: song lyrics, official youtube link and amazon link.
var links = {
    coverArt: "https://upload.wikimedia.org/wikipedia/en/4/44/Try_Everything_%28Shakira%29.jpg",
    lyrics: "http://www.metrolyrics.com/try-everything-lyrics-shakira.html",
    youtube: "https://www.youtube.com/watch?v=c6rP-YP4c5I", 
    amazon: "http://smarturl.it/zsama1",
};

//Write to the console.
console.log("Title of the song: ", title);
console.log("Performer name: ", artist);
console.log("Name of the album: ", album);
console.log("Length of the song:", durationInSeconds, " seconds");
console.log("Name of the record company: ", label);
console.log("Song release date and release type:", release.date, ",", release.type);
console.log("Song recorded:",recorded.month, recorded.year, ",", recorded.studio);
console.log("Song genres: ", genre.join(", "));
console.log("Names of the songwriters: ", composers.join(", "));
console.log("Name of the song producer: ", producer);
console.log("Copyright ownership:", copyright);
console.log("Song ratings: ", ratings, "/", parseInt("10"));
console.log("Was the song ", title, "translated into other languages?", isTranslation);
console.log("URL of the song cover art: ", links.coverArt);
console.log("URL of the song lyrics: ", links.lyrics);
console.log("YouTube: ", links.youtube);
console.log("Amazon: ", links.amazon);

console.log(release);
console.log(recorded);
console.log(versions);
console.log(links);