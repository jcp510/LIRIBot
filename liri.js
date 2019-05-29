// Read and set environment variables with dotenv package.
require("dotenv").config();

// Import keys.js.
var keys = require("./keys.js");

// Grab axios, moment, and node-spotify-api packages.
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

// Access keys info.
var spotify = new Spotify(keys.spotify);


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
      axios.get(queryURL)
      .then(function(response) {
      // Render venue name, venue location, and date MM/DD/YYYY of event.
      // Render this info for all upcoming events.
      console.log('Upcoming events for ' + process.argv[3] + ':');
      response.data.forEach(function(obj) {
        console.log(moment(obj.datetime).format("MM DD YYYY") + ' ' + obj.venue.name + ' ' + obj.venue.city + ', ' + obj.venue.country);
      });
      })
      .catch(function(error) {
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
    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow
    * these steps in order to generate a client id and client secret:
      * Step One: Visit https://developer.spotify.com/my-applications/#!/
      * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and
      * log in.
      * Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create
      * to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these
      * fields. When finished, click the "complete" button.
      * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these
      * values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
    ******************************************************************************
    */
    var song = process.argv[3];

    // Search spotify api for song.
    spotify.search({type: 'track', query: song}).then(function(response) {
      console.log('Artist ' + '"' + response.tracks.items[0].artists[0].name + '"' + ', ' + 'Song ' + '"' + 
      response.tracks.items[0].name + '"' + ', ' + 'Preview ' + response.tracks.items[0].external_urls.spotify
      + ', ' + 'Album ' + '"' + response.tracks.items[0].album.name +'"');

      }).catch(function(err) {
      console.log(err);
      console.log('Artist "Ace of Base", Song "The Sign", Preview "https://open.spotify.com/artist/5ksRONqssB7BR161NTtJAm", Album "The Sign (US Album) [Remastered]"');
    });


    /*
    {
      "tracks": {
        "href": "https://api.spotify.com/v1/search?query=I%2BLike%2BIt&type=track&market=US&offset=5&limit=1",
        "items": [
          {
            "album": {
              "album_type": "album",
              "artists": [
                {
                  "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7qG3b048QCHVRO5Pv1T5lw"
                  },
                  "href": "https://api.spotify.com/v1/artists/7qG3b048QCHVRO5Pv1T5lw",
                  "id": "7qG3b048QCHVRO5Pv1T5lw",
                  "name": "Enrique Iglesias",
                  "type": "artist",
                  "uri": "spotify:artist:7qG3b048QCHVRO5Pv1T5lw"
                }
              ],
              "external_urls": {
                "spotify": "https://open.spotify.com/album/12HeDZhPHHzCe7VE0uEYwD"
              },
              "href": "https://api.spotify.com/v1/albums/12HeDZhPHHzCe7VE0uEYwD",
              "id": "12HeDZhPHHzCe7VE0uEYwD",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/04573d8950d45df32152088d142898e412a4d9c5",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://i.scdn.co/image/ecabd6f5a0a2af7ca8c9fb367aa174434defa8c2",
                  "width": 300
                },
                {
                  "height": 64,
                  "url": "https://i.scdn.co/image/b17cdeef022777511b9f070029eef16aeef7c34c",
                  "width": 64
                }
              ],
              "name": "Euphoria (Standard US/Latin version)",
              "release_date": "2010-01-01",
              "release_date_precision": "day",
              "total_tracks": 10,
              "type": "album",
              "uri": "spotify:album:12HeDZhPHHzCe7VE0uEYwD"
            },
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7qG3b048QCHVRO5Pv1T5lw"
                },
                "href": "https://api.spotify.com/v1/artists/7qG3b048QCHVRO5Pv1T5lw",
                "id": "7qG3b048QCHVRO5Pv1T5lw",
                "name": "Enrique Iglesias",
                "type": "artist",
                "uri": "spotify:artist:7qG3b048QCHVRO5Pv1T5lw"
              },
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
                },
                "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Pitbull",
                "type": "artist",
                "uri": "spotify:artist:0TnOYISbd1XYRBk9myaseg"
              }
            ],
            "disc_number": 1,
            "duration_ms": 231786,
            "explicit": false,
            "external_ids": {
              "isrc": "GBUM71003038"
            },
            "external_urls": {
              "spotify": "https://open.spotify.com/track/4nVyHATevhl5RC6Qmoko5H"
            },
            "href": "https://api.spotify.com/v1/tracks/4nVyHATevhl5RC6Qmoko5H",
            "id": "4nVyHATevhl5RC6Qmoko5H",
            "is_local": false,
            "is_playable": true,
            "name": "I Like It",
            "popularity": 61,
            "preview_url": null,
            "track_number": 5,
            "type": "track",
            "uri": "spotify:track:4nVyHATevhl5RC6Qmoko5H"
          }
        ],
        "limit": 1,
        "next": "https://api.spotify.com/v1/search?query=I%2BLike%2BIt&type=track&market=US&offset=6&limit=1",
        "offset": 5,
        "previous": "https://api.spotify.com/v1/search?query=I%2BLike%2BIt&type=track&market=US&offset=4&limit=1",
        "total": 12142
      }
    }
    */
}



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

/*
******************* do-what-it-says *******************************************
* node liri.js do-what-it-says
* Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of
* LIRI's commands.
* It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
* Edit the text in random.txt to test out the feature for movie-this and concert-this.
***********************************************************************************
*/