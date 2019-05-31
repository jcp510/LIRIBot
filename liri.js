// Read and set environment variables with dotenv package.
require("dotenv").config();

// Use File System Node package for do-what-it-says command.
var fs = require('fs');

// Import keys.js.
var keys = require("./keys.js");

// Grab axios, moment, and node-spotify-api packages.
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

// Access keys info.
var spotify = new Spotify(keys.spotify);

function runLiriJs() {
  switch (process.argv[2]) {
    case 'concert-this':
      /*
      ***************** concert-this *******************************************
      *  node liri.js concert-this <artist/band name here>
      *  This will search the Bands in Town Artist Events API 
      *  ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      *  for an artist and render the following information about each event to the terminal:
        *  Name of the venue
        *  Venue location
        *  Date of the Event (use moment to format this as "MM/DD/YYYY") 
      ****************************************************************************
      */
  
      // If artist name has more than one word, it must be entered in quotes in the command line, otherwise node
      // will see the space and treat the words as separate arguments.
      var artist = process.argv[3];
      var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
      axios.get(queryURL).then(function(response) {
        // Render venue name, venue location, and date MM/DD/YYYY of event.
        // Render this info for all upcoming events.
        console.log('Upcoming events for ' + process.argv[3] + ':');
        response.data.forEach(function(obj) {
          console.log(moment(obj.datetime).format("MM DD YYYY") + ' ' + obj.venue.name + ' ' + obj.venue.city + ', ' + obj.venue.country);
        });
      }).catch(function(error) {
        console.log(error);
      });
      break;
  
    case 'spotify-this-song':
      /*
      ******************* spotify-this-song ****************************************
      * node liri.js spotify-this-song '<song name here>'
      * This will show the following information about the song in your terminal/bash window
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from
      * If no song is provided then your program will default to "The Sign" by Ace of Base.
      * You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
      ******************************************************************************
      */
      var song = process.argv[3];
  
      // Search spotify api for song.
      spotify.search({type: 'track', query: song}).then(function(response) {
        console.log('Artist ' + '"' + response.tracks.items[0].artists[0].name + '"' + ', ' + 'Song ' + '"' + 
        response.tracks.items[0].name + '"' + ', ' + 'Preview ' + '"' + response.tracks.items[0].preview_url + '"'
        + ', ' + 'Album ' + '"' + response.tracks.items[0].album.name +'"');
  
        }).catch(function(err) {
        console.log(err);
        console.log('Artist "Ace of Base", Song "The Sign", Preview "https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=774b29d4f13844c495f206cafdad9c86", Album "The Sign (US Album) [Remastered]"');
      });
      break;
  
    case 'movie-this':
      /*
      ******************* movie-this ***********************************************
      * node liri.js movie-this '<movie name here>'
      * This will output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
      * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
      * You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities,
      * the OMDB API requires an API key. You may use trilogy.
      *******************************************************************************
      */
      var movie = process.argv[3];
      var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie + '&type=movie';
  
      axios.get(queryURL).then(function(response) {
        console.log('Title "' + response.data.Title + '", ' + 'Year ' + response.data.Year + ' IMDB Rating ' 
        + response.data.imdbRating + ', Rotten Tomatoes Rating ' + response.data.Ratings[1].Value + ', Country ' + 
        response.data.Country + ', Language ' + response.data.Language + ', Plot "' + response.data.Plot + '", Actors ' +
        response.data.Actors);
      }).catch(function(error) {
        console.log(error);
      });
      break;
  
    case 'do-what-it-says':
      /*
      ******************* do-what-it-says *******************************************
      * node liri.js do-what-it-says
      * Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of
      * LIRI's commands.
      * It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
      ***********************************************************************************
      */
      fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArray = data.split(',');
        process.argv[2] = dataArray[0];
        process.argv[3] = dataArray[1];
        runLiriJs();
      });
      break;
  
    default: 
      console.log('Command not found');
  }
}

runLiriJs();


