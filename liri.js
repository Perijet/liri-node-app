var fs = require('fs');
var keys = require('./keys.js');
var spotify = require('spotify');
var Twitter = require('twitter');
var request = require('request');
var client = new Twitter(keys.twitterKeys);
var argv1 = process.argv[2];
var argv2 = process.argv[3];
var nodeArgs = process.argv;


//Switch statements to select from user input========================

switch(argv1){
	case 'spotify-this-song':
		spot();
	break;

	case 'my-tweets':
		twit();
	break;

	case 'movie-this':
		movie();
	break;

	case 'do-what-it-says':
		doWhat();
	break;

	default:
		console.log('\nWhen you make a choice, you change the future\n');

}

//Spotify function===================================================
function spot(){

	var songName = "";

	for (var i=3; i<nodeArgs.length; i++){
		if (i>3 && i< nodeArgs.length){
			songName = songName + '+' + nodeArgs[i];
		}
		else {
			songName = songName + nodeArgs[i];
		}
	}

	spotify.search({ type: 'track', query: (songName || 'Whats my age again') }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    console.log('\nArtist(s): ' + data.tracks.items[0].artists[0].name); 
    console.log('Song Name: ' + data.tracks.items[0].name); 
    console.log('Preview Link: ' + data.tracks.items[0].preview_url); 
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Song Name: ' + data.tracks.items[0].name + '\n'); 
	
	});

}

//Twitter function===================================================
function twit(){
	
	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=pirejet&count=5', function(error, tweets, response){
  	
  	if(error) throw error;

  	for(var i = 0; i < tweets.length; i++){

  		console.log('\nCreated on: ' + tweets[i].created_at);
  		console.log(tweets[i].text);
  	}
  	 
	});

}