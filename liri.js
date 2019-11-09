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
//SEE Activity OMDBAXIOS activity as guideline for this portion (DO MOVIE THIS FIRSST)

// USE SWITCH STATEMENTS FOR EACH BELOW

switch (userCommand) {
    //check if userCommand is "concert-this"
    case "movie-this":
        console.log("command = " + userCommand);
        console.log("search = " + searchQuery);

        var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(
            function (response) {
                console.log(queryUrl);
                console.log("response below ----------------");
                console.log(response.data);
                console.log("response above ----------------");
                console.log("Release Year: " + response.data.Year);
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

        break;

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