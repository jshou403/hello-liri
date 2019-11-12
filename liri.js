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

function runOmdb(searchQuery) {

    var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            // console.log(queryUrl);
            // console.log("START response.data ----------------");
            // console.log(response.data);
            // console.log("END response.data ----------------");

            if (response.data.Response == "False") {

                console.log("");
                console.log("Liri says: We couldn't find a movie matching that name. Try another?");

            } else {

                console.log("");
                console.log("Movie Name: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Production Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

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

function runBandsInTown(searchQuery) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp";

    // console.log("query URL " + queryUrl);

    axios.get(queryUrl).then(
        function (response) {

            // console.log(queryUrl);
            // console.log("START response.data ----------------");
            // console.log(response.data);
            // console.log("END response.data ----------------");

            if (response.data.length > 0) {

                console.log("");
                console.log("Liri says: We found " + response.data.length + " upcoming concerts for " + response.data[0].artist.name + "!");
                console.log("");

                for (var i = 0; i < response.data.length; i++) {

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

            } 

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log("---------------Data---------------");
                // console.log(error.response.data);
                // console.log("---------------Status---------------");
                // console.log(error.response.status);
                // console.log("---------------Status---------------");
                // console.log(error.response.headers);
                console.log("Liri says: We couldn't find any concerts for that artist. Try another?")
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                // console.log(error.request);
                console.log("Liri says: We couldn't find any concerts for that artist. Try another?")
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log("Error = ", error.message);
                console.log("Liri says: We couldn't find any concerts for that artist. Try another?")

            }
            // console.log(error.config);
        });
}

function runSpotify(searchQuery) {

    spotify.search({ type: 'track', query: searchQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            // console.log("START DATA -------------------------------");
            // console.log(data.tracks.items[0]);
            // console.log("END DATA ---------------------------------");

            if (data.tracks.items.length > 0) {

                console.log("");
                console.log("Liri says: We found " + data.tracks.items.length + " matches!");
                console.log("");

                for (var i = 0; i < data.tracks.items.length; i++) {

                    var num = i + parseInt("1");

                    console.log(num);
                    console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
                    console.log("Song Title: " + data.tracks.items[i].name);
                    console.log("Album Name: " + data.tracks.items[i].album.name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);

                }
            } else {
                console.log("");
                console.log("Liri says: We couldn't find any songs matching that name. Try another?");
            }
        }

    });

}

switch (userCommand) {

    // for userCommand = hello
    case "hello":
        console.log("");
        console.log("Hi! Welcome to Liri! Try one of these commands: ");
        console.log("     movie-this <movie name here>");
        console.log("     concert-this <artist/band name here>");
        console.log("     spotify-this-song <song name here>");
        console.log("     do-what-it-says");
        break;

    // for userCommand = movie-this
    case "movie-this":

        // if no searchQuery provided 
        // runOmdb function with searchQuery defined
        if (searchQuery == "") {
            var searchQuery = "mr+nobody";
            console.log("");
            console.log("Liri says: You didn't provide a movie.");
            console.log("Liri says: Here's some info about my favorite!");
            runOmdb(searchQuery);
            break;

        // if searchQuery provided
        // runOmdb function with the provided searchQuery
        } else {
            runOmdb(searchQuery);
            break;
        }

    // for userCommand = concert-this
    case "concert-this":

        // if no searchQuery provided 
        // display text that tells user to provide a band/artist
        if (searchQuery == "") {
            console.log("");
            console.log("Liri says: Please try the 'concert-this' command with a band or artist!");
            break;

        // otherwise, use the user provided searchQuery
        // runBandsInTown function with user provided searchQuery
        } else {
            runBandsInTown(searchQuery);
            break;
        }

    // for userCommand = spotify-this-song
    case "spotify-this-song":

        // if no searchQuery provided 
        // display text that says "you didnt provide a song" and "here's my fav"
        // runSpotify function with pre-defined searchQuery
        if (searchQuery == "") {
            console.log("");
            console.log("Liri says: You didn't provide a song.");
            console.log("Liri says: Check out my favorite!");

            var searchQuery = "lover+chanting";

            spotify.search({ type: 'track', query: searchQuery }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    console.log("");
                    console.log("Artist Name: " + data.tracks.items[i].artists[0].name);
                    console.log("Song Title: " + data.tracks.items[i].name);
                    console.log("Album Name: " + data.tracks.items[i].album.name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);
                }
            })

            break;

        // otherwise, use the user provided searchQuery
        // runSpotify function with user provided searchQuery
        } else {
            runSpotify(searchQuery);
            break;
        };

    // for userCommand = do-what-it-says
    // display text saying "do what it says command initiated"
    case "do-what-it-says":
        console.log("");
        console.log("'Do-What-It-Says' Command Initiated!");

        // read the text from the random.txt file
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {

                return console.log(error);

            } else {

                // console.log(data);

                // split the data with a comma
                var dataArr = data.split(",");

                    // console.log("dataArr = " + dataArr);
                    // console.log("dataArr[0] = " + dataArr[0]);
                    // console.log("dataArr[1] = " + dataArr[1]);

                // the value of index 0 will be the userCommand
                var userCommand = dataArr[0];
                    // console.log("userCommand = " + userCommand);

                // the value of index 1 will be the searchQuery
                var searchQuery = dataArr[1].split(" ").join("+");
                    // console.log("searchQuery = " + searchQuery);

                if (userCommand == "spotify-this-song") {
                    runSpotify(searchQuery);
                } else if (userCommand == "movie-this") {
                    runOmdb(searchQuery);
                } else if (userCommand == "concert-this") {
                    searchQuery = searchQuery.slice(1, -1);
                    // console.log("do-what-it-says: " + userCommand);
                    // console.log("searchQuery: " + searchQuery);
                    runBandsInTown(searchQuery);
                }
            }

        });

        break;

    // if anything besides the above userCommands are given, this is the response that will be output
    default:
        console.log("");
        console.log("Sorry, Liri doesn't understand that command yet! Try one of these:");
        console.log("     movie-this <movie name here>");
        console.log("     concert-this <artist/band name here>");
        console.log("     spotify-this-song <song name here>");
        console.log("     do-what-it-says");

}