require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//capture command that user puts in
var userCommand = process.argv[2];
var userInput = process.argv;
var searchQuery = ""; // everything after index of 3 and later

for (var i = 3; i < userInput.length; i++) {

    if (i > 3 && i < userInput.length) {
        searchQuery = searchQuery + "+" + userInput[i];
    } else {
        searchQuery += userInput[i];
    }

}

// console.log(process.argv);

function runOmdb() {

    var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            // console.log(queryUrl);
            // console.log("START response.data ----------------");
            // console.log(response.data);
            // console.log("END response.data ----------------");

            console.log("Movie Name: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Production Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//SEE Activity OMDBAXIOS activity as guideline for this portion (DO MOVIE THIS FIRSST)

// USE SWITCH STATEMENTS FOR EACH BELOW

switch (userCommand) {
    
    //check if userCommand is "movie-this"
    case "movie-this":

        if (searchQuery == "") {
            var searchQuery = "mr+nobody";
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);

            runOmdb();

            break;

        } else {
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);
            runOmdb();

            break;
        }

    case "concert-this":
        console.log("command = " + userCommand);
        console.log("search = " + searchQuery);
        break;

    case "spotify-this-song":
        console.log("command = " + userCommand);
        console.log("search = " + searchQuery);
        break;

    case "do-what-it-says":
        console.log("command = do what it says in the text file!");
        break;

    default:
        console.log("Error! Try one of these:");
        console.log("- 'movie-this moviename'");
        console.log("- 'concert-this artistname'");
        console.log("- 'spotify-this-song songname'");
        console.log("- 'do-what-it-says'");

}

//check if userCommand is "concert-this" OK

    // run API call using axios to bands-in-town API

    // inject users search term into queryURL 
    // hint: hw instructions provides more guidance to each API call 

    // display 1) venue 2) venue location 3) date of event

    // use moment to format date of event to MM/DD/YYYY

//check if userCommand is "spotify-this-song"

    // Using Spotify Node package info, make call to Spotify API

    // Display to user 1) artist name 2) song name 3) previrw link of song from spotify 4) album that song is from 

    // If user does not provide argument, display default song

//check if userCommand is "movie-this" 

//check if userCommand is"do-what-it-says" 

//otherwise, display mesage to user to try again 