# hello-liri

#### Liri is a CLI application that uses node packages to access movie and music data to output information relevant to the user's search query.

* [Repository](https://github.com/jshou403/hello-liri)

## How The App Works

The user has the option to run a few commands that also require a search query of their choice. Once the command and search query is entered, a request is sent to the appropriate API. Once a response is received from the API, the app returns the response to the command line. 

* `movie-this <movie name here>` returns information about the movie 
* `concert-this <artist/band name here>` returns upcoming concerts for the artist/band
* `spotify-this-song <song name here>` returns list of songs matching that title
* `do-what-it-says` takes in the command and search query from the random.txt file

## Take Liri For a Run

* In order to access the Spotify Node API, you will need to have a Spotify key and secret. Log in or create a free Spotify account and create an app here to generate the key and secret: 
    
    [Create An App](https://developer.spotify.com/my-applications/#!/applications/create)

* Once you've obtained your ID and secret, download the repository and open the keys.js file. Then update with your ID and secret and save this file. 

    ```
    exports.spotify = {
    id: your-ID-here,
    secret: your-secret-here
    };
    ```

* Then, navigate to the root directory in the command line. Here you will make sure the required node packages or dependencies are installed. 
    
    Run the following code to initiate a package.json file that shows the dependencies for this node app: 
    
    `npm init -y` 

    Then run this code to install the dependencies needed to run the app: 
    
    `npm install`

    If any of the below dependencies are not listed in your package.json file, you will need to manually install the missing dependencies: 

    `npm i axios`

    `npm i moment`

    `npm i node-spotify-api`

    `npm i dotenv`

* Once the key.js file is updated and node packages are installed, you can begin to run the app in in the command line. To start say "hello" to liri: 

    `node liri hello` 

* Say hello to liri! 
!["hello"](https://raw.githubusercontent.com/jshou403/liri-node-app/master/images/hello.png)

* Search for a movie. 
!["movie-this"](https://raw.githubusercontent.com/jshou403/liri-node-app/master/images/movie.png) 

* Find concerts for an artist or band. 
!["concert-this" userCommand](https://raw.githubusercontent.com/jshou403/liri-node-app/master/images/concert.png) 

* Find songs matching a title. 
!["spotify-this-song" userCommand](https://raw.githubusercontent.com/jshou403/liri-node-app/master/images/spotify.png) 

## Technologies Used
* Javascript
* Node.js
  * Axios 
  * OMDB, BandsInTown, Spotify APIs
  * Moment

## Developer
Jacalyn Shou 
* [Portfolio](http://www.jacalynshou.com/)
* [Github](https://github.com/jshou403)
* [LinkedIn](https://www.linkedin.com/in/jacalyn-shou/)