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
function choose(argv1, nodeArgs){
switch(argv1){
	case 'spotify-this-song':
		spot(nodeArgs);
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
}

choose(process.argv[2],  process.argv);


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
	
	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=pirejet&count=10', function(error, tweets, response){
  	
  	if(error) throw error;

  	for(var i = 0; i < tweets.length; i++){

  		console.log('\nCreated on: ' + tweets[i].created_at);
  		console.log(tweets[i].text);
  	}
  	 
  	console.log('\n');
	});

}

//Movie Function=====================================================
function movie(){

	var movieName = "";

	for (var i=3; i<nodeArgs.length; i++){
		if (i>3 && i< nodeArgs.length){
			movieName = movieName + '+' + nodeArgs[i];
		}
		else {
			movieName = movieName + nodeArgs[i];
		}
	}
 
	var queryUrl = 'http://www.omdbapi.com/?t=' + (movieName || 'Mr. Nobody') +'&y=&plot=short&r=json&tomatoes=true';
	  
	console.log(queryUrl);

	request(queryUrl, function (error, response, body) {

		if (!error && response.statusCode == 200) {

			var movieInfo = JSON.parse(body);

			console.log('\nTitle: ' + movieInfo.Title); 
			console.log('Year: ' + movieInfo.Year);
			console.log('IMDB Rating: ' + movieInfo.Rated);
			console.log('Country: ' + movieInfo.Country);
			console.log('Language: ' + movieInfo.Language);
			console.log('Plot: ' + movieInfo.Plot);
			console.log('Actors: ' + movieInfo.Actors);
			console.log('Tomato Rating: ' + movieInfo.tomatoRating);
			console.log('Tomato URL: ' + movieInfo.tomatoURL + '\n');
		}
	});

}

//Do what it says function===========================================
function doWhat(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		
		var input1 = data.split(',')[0];
		var input2 = data.split(',')[1].replace(/['"]+/g, '');

		choose(input1, input2);

	});

}