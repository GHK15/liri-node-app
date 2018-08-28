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
            return console.log(+ err);
            fs.appendFile("log.txt", err, function(err, data) {
                  return console.log(err);
            });
        }
            
        var response = data.tracks.items;
        response.forEach(song => {
            var spotifyLog = ['\nSPOTIFY SEARCH RESULTS' + '\nSong: ' + song.name, '\nArtist: ' + song.artists[0].name, '\nAlbum: ' + song.album.name, '\nPreview Link: ' + song.href + '\n----------------********************----------------'];
            console.log('Song: ' + song.name)
            console.log('Artist: ' + song.artists[0].name) 
            console.log('Album: ' + song.album.name)
            console.log('Preview Link: ' + song.href)
            console.log('----------------********************----------------')
            fs.appendFile("log.txt", spotifyLog, function(err, data) {
                    console.log("log.txt was updated!");
                });
        })
    }
      )}   

    else {
        song = "The Sign"
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var response = data.tracks.items;
            console.log('You did not input a song! Please follow this convention: node liri.js spotify-this-movie "song title"')
            console.log('Here are search results on "The Sign" anyway :)')
            response.forEach(song => {
                var signLog = ['\nSPOTIFY SEARCH RESULTS' + '\nSong: ' + song.name, '\nArtist: ' + song.artists[0].name, '\nAlbum: ' + song.album.name, '\nPreview Link: ' + song.href + '\n----------------********************----------------'];
                console.log('Song: ' + song.name)
                console.log('Artist: ' + song.artists[0].name) 
                console.log('Album: ' + song.album.name)
                console.log('Preview Link: ' + song.href)
                console.log('----------------********************----------------')
                fs.appendFile("log.txt", signLog, function(err, data) {
                    console.log("log.txt was updated!");
                });
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
                var movieLog = ['\nMOVIE SEARCH RESULTS' + '\nTitle: ' + movieArray.Title, '\nYear Released: ' + movieArray.Year, '\nLeading Actors: ' + movieArray.Actors, '\nPlot: ' + movieArray.Plot, '\nIMDB Rating: ' + movieArray.Ratings[0].Value, '\nRotten Tomatoes Rating: ' + movieArray.Ratings[1].Value, '\nCountry of Production: ' + movieArray.Country, '\nLanguage(s) of Movie: ' + movieArray.Language + '\n----------------********************----------------']
                console.log('Title: ' + movieArray.Title);
                console.log(' Year Released: ' + movieArray.Year);
                console.log(' Leading Actors: ' + movieArray.Actors);
                console.log(' Plot: ' + movieArray.Plot)
                console.log(' IMDB Rating: ' + movieArray.Ratings[0].Value);
                console.log(' Rotten Tomatoes Rating: ' + movieArray.Ratings[1].Value);
                console.log(' Country of Production: ' + movieArray.Country);
                console.log(' Language(s) of Movie: ' + movieArray.Language);
                console.log('----------------********************----------------')
                fs.appendFile("log.txt", movieLog, function(err, data) {
                    if (err) {
                      return console.log(err);
                    }

                    console.log("log.txt was updated!");
                  });
            }
        });
    }
    else {
        movie = "Mr. Nobody";
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var nobodyArray = JSON.parse(body)
            var nobodyLog = ['\nMOVIE SEARCH RESULTS' + '\nTitle: ' + nobodyArray.Title, '\nYear Released: ' + nobodyArray.Year, '\nLeading Actors: ' + nobodyArray.Actors, '\nPlot: ' + nobodyArray.Plot, '\nIMDB Rating: ' + nobodyArray.Ratings[0].Value, '\nRotten Tomatoes Rating: ' + nobodyArray.Ratings[1].Value, '\nCountry of Production: ' + nobodyArray.Country, '\nLanguage(s) of Movie: ' + nobodyArray.Language + '\n----------------********************----------------']
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
            fs.appendFile("log.txt", nobodyLog, function(err, data) {
                if (err) {
                  return console.log(err);
                }

                console.log("log.txt was updated!");
              });
        }
        });
    }
}


// Bands In Town: node liri.js concert-this "band name"

function concertThis(band){

  if(band){
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function(error, response, body) {
        console.log(body);
        if (!error && response.statusCode === 200) {
            var bandArray = JSON.parse(body)
            bandArray.forEach(function(event){
                var bandLog = ['\nCONCERT SEARCH RESULTS' + '\nVenue: ' + event.venue.name, '\nCity: ' + event.venue.city, '\nDate: ' + moment(event.datetime).format('MM-DD-YYYY') + '\n----------------********************----------------'];
                console.log("Venue: " + event.venue.name)
                console.log("City: " + event.venue.city)
                console.log("Date: " + moment(event.datetime).format('MM-DD-YYYY'))
                console.log("----------------********************----------------")
                fs.appendFile("log.txt", bandLog, function(err, data) {
                    if (err) {
                      return console.log(err);
                    }

                    console.log("log.txt was updated!");
                  });
            })
        } 
        
    });
  }
  else {
    console.log('You forgot the artist! Please try again using: node liri.js concert-this "band name"');
  }
}


// Do What It Says (read file): node liri.js do-what-it-says

function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        data = data.split(',');
        var readCommand = data[0]
        var readThing = data[1]

        if(readCommand === 'spotify-this-song'){ 
            var spotOutput = spotifyThis(readThing);
            fs.appendFile("log.txt", spotOutput, function(err, data) {
                if (err) {
                    return console.log(err);
                  }
                  
                  console.log("log.txt was updated!");

                });
        } else if(readCommand === 'movie-this'){
            var movOutput = movieThis(readThing);
            fs.appendFile("log.txt", movOutput, function(err, data) {
                if (err) {
                    return console.log(err);
                  }
                  
                  console.log("log.txt was updated!");

                });
        } else if(readCommand === 'concert-this'){
            console.log(readThing)
            var concertOutput = concertThis(readThing);
            fs.appendFile("log.txt", concertOutput, function(err, data) {
                if (err) {
                    return console.log(err);
                  }
                  
                  console.log("log.txt was updated!");

                });
        } else if(readCommand === 'do-what-it-says') {
            doWhatItSays();
        }
})
}