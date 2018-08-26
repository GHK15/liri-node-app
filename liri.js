// Required Packages
require('dotenv').config();
var request = require('request');
var fs = require('fs');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify ({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});


// Fire function based on command
var command = process.argv[2]; 
var thing = process.argv[3];

if(command === 'spotify-this-song'){
    spotifyThis(thing);
} else if(command === 'movie-this'){
    movieThis(thing);
} else if(command === 'concert-this'){
    concertThis(thing)
} else if(command === 'do-what-it-says') {
    doWhatItSays();
}


// SPOTIFY: node liri.js spotify-this-song "song title"

function spotifyThis(song){

    if(song) {
      spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var response = data.tracks.items;
        response.forEach(song => {
            console.log('Song: ' + song.name)
            console.log('Artist: ' + song.artists[0].name) 
            console.log('Album: ' + song.album.name)
            console.log('Preview Link: ' + song.href)
            console.log('----------------********************----------------')
        })
        });
    }
    else {
        song = "The Sign"
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var response = data.tracks.items;
            response.forEach(song => {
                console.log('You did not input a song! Please follow this convention: node liri.js spotify-this-movie "song title"')
                console.log('Here are search results on "The Sign" anyway :)')
                console.log('Song: ' + song.name)
                console.log('Artist: ' + song.artists[0].name) 
                console.log('Album: ' + song.album.name)
                console.log('Preview Link: ' + song.href)
                console.log('----------------********************----------------')
            })
        });
    }
}


// OMDB: node liri.js movie-this "movie title"

function movieThis(movie){
 
    if(movie) {
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var movieArray = JSON.parse(body)
                console.log('Title: ' + movieArray.Title);
                console.log('Year Released: ' + movieArray.Year);
                console.log('Leading Actors: ' + movieArray.Actors);
                console.log('Plot: ' + movieArray.Plot)
                console.log('IMDB Rating: ' + movieArray.Ratings[0].Value);
                console.log('Rotten Tomatoes Rating: ' + movieArray.Ratings[1].Value);
                console.log('Country of Production: ' + movieArray.Country);
                console.log('Language(s) of Movie: ' + movieArray.Language);
                console.log('----------------********************----------------')
            }
        });
    }
    else {
        movie = "Mr. Nobody";
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
            var nobodyArray = JSON.parse(body)
            console.log('You did not input a movie! Please follow this convention: node liri.js movie-this "movie title"')
            console.log('Here is some information on a movie anyway :)')
            console.log('Title: ' + nobodyArray.Title);
            console.log('Year Released: ' + nobodyArray.Year);
            console.log('Leading Actors: ' + nobodyArray.Actors);
            console.log('Plot: ' + nobodyArray.Plot)
            console.log('IMDB Rating: ' + nobodyArray.Ratings[0].Value);
            console.log('Rotten Tomatoes Rating: ' + nobodyArray.Ratings[1].Value);
            console.log('Country of Production: ' + nobodyArray.Country);
            console.log('Language(s) of Movie: ' + nobodyArray.Language);
            console.log('----------------********************----------------')
            
        });
    }
}


// Bands In Town: node liri.js concert-this "band name"

function concertThis(band){
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var bandArray = JSON.parse(body)
            bandArray.forEach(function(event){
                console.log("Venue: " + event.venue.name)
                console.log("City: " + event.venue.city)
                console.log("Date: " + moment(event.datetime).format('MM-DD-YYYY'))
                console.log("----------------********************----------------")
            })
        } else {
            console.log("Error! Please try again.")
        }
    });
}

// Do What It Says: node liri.js do-what-it-says

function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        data = data.split(',');
        thing = data[1]
        if(data[0] === 'spotify-this-song'){ 
            spotifyThis(thing);
        } else if(data[0] === 'movie-this'){
            movieThis(thing);
        } else if(data[0] === 'concert-this'){
            concertThis(thing)
        } else if(data[0] === 'do-what-it-says') {
            doWhatItSays();
        }
    })
}