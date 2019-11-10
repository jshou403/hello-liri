require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");
// moment().format();

//capture command that user puts in
var userCommand = process.argv[2];
var userInput = process.argv; // captures all of the userInput 
var searchQuery = ""; // stores the user input after the user command

// loops through the userInput and stores the info after the command 
// if more than one word, will store into the searchQuery
// else will store the word as the searchQuery
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

            console.log("");
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
                console.log("Error = ", error.message);
            }
            console.log(error.config);
        });
}

function runBandsInTown() {

    var queryUrl = "https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            // console.log(queryUrl);
            // console.log("START response.data ----------------");
            // console.log(response.data);
            // console.log("END response.data ----------------");

            console.log("");
            console.log("Here are the next 5 " + response.data[0].artist.name + " Concerts: ");
            console.log("");

            for (var i = 0; i < 5; i++) {

                // if there is a result after i, keep running
                // if there is no result after i, display "no more concerts!"

                var num = i + parseInt("1");

                var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");

                console.log(num);
                console.log("Concert Date: " + concertDate);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("");

            }

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
                console.log("Error = ", error.message);
            }
            console.log(error.config);
        });
}

function runSpotify() {

    spotify.search({ type: 'track', query: searchQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < 3; i++) {

            // if there is a result after i, keep running
            // if there is no result after i, display "no more concerts!"

            var num = i + parseInt("1");

            // var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");

            console.log("");
            console.log(num);
            console.log("Song Title: " + data.tracks.items[i].name);
            console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);

        }

        // console.log("START DATA -------------------------------");
        // console.log(data.tracks.items[0]);
        // console.log("END DATA ---------------------------------");

        // console.log("Preview Link: " + data.tracks.items[0].preview_url); 
        // console.log("Artist: " + data.tracks.items[0].artists[0].name);
        // console.log("Song Name: " + data.tracks.items[0].name);
        // console.log("Album: " + data.tracks.items[0].album.name);

    });

}

switch (userCommand) {

    // if userCommand = hello
    case "hello":
        console.log("Hi! Welcome to Liri! Try one of these commands: ");
        console.log("     movie-this <movie name here>");
        console.log("     concert-this <artist/band name here>");
        console.log("     spotify-this-song <song name here>");
        console.log("     do-what-it-says");
        break;

    // if userCommand = movie-this
    case "movie-this":

        if (searchQuery == "") {
            var searchQuery = "mr+nobody";
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);

            console.log("");
            console.log("Liri says: You didn't provide a movie.");
            console.log("Liri says: Here's some info about my favorite!");

            runOmdb();

            break;

        } else {
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);
            runOmdb();

            break;
        }

    // if userCommand = movie-this
    case "concert-this":

        if (searchQuery == "") {
            console.log("");
            console.log("Liri says: Please try the 'concert-this' command with a band or artist!");
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);

            break;

        } else {
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);

            runBandsInTown();

            break;
        }

    // if userCommand = spotify-this-song
    case "spotify-this-song":

        if (searchQuery == "") {
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);
            // console.log("Liri says: Please try the 'spotify-this-song' command with a song title!");

            console.log("");
            console.log("Liri says: You didn't provide a song.");
            console.log("Liri says: Check out my favorites!");

            var searchQuery = "ritual+union";

            runSpotify();

            break;

        } else {
            // console.log("command = " + userCommand);
            // console.log("search = " + searchQuery);

            console.log("");
            console.log("Here are the top 3 matches: ");

            runSpotify();

            break;
        };

    case "do-what-it-says":
        console.log("");
        console.log("'Do-What-It-Says' Command Initiated!");
        console.log("");

        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {

                return console.log(error);
                
            } else {

                // console.log("data = " + data);
                // console.log("data[0] = " + data[0]); 
                // console.log("data[1] = " + data[1]);

                // Then split it by commas
                var dataArr = data.split(",");

                // console.log("dataArr = " + dataArr);
                // console.log("dataArr[0] = " + dataArr[0]); 
                // console.log("dataArr[1] = " + dataArr[1]);

                var userCommand = dataArr[0];
                console.log("userCommand = " + userCommand);

                var searchQuery = dataArr[1].split(" ").join("+");
                console.log("searchQuery = " + searchQuery);

            }

        });

        break;

    default:
        console.log("Sorry, Liri doesn't understand that command yet! Try one of these:");
        console.log("     movie-this <movie name here>");
        console.log("     concert-this <artist/band name here>");
        console.log("     spotify-this-song <song name here>");
        console.log("     do-what-it-says");

}