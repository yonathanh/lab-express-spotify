
// Client ID: 9117e5c887a54330a375897b652db037
// Client Secret: b603296cb6dc4b47bcfe8c146f6b4a27 


const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

// Remember to paste here your credentials
const clientId = '9117e5c887a54330a375897b652db037';
const clientSecret = 'b603296cb6dc4b47bcfe8c146f6b4a27';

var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function (err) {
    console.log('Something went wrong when retrieving an access token', err);
  });

//And telling our Express app that HBS will be in charge of rendering the HTML:
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials'); // partials

// Make everything inside of public/ available
app.use(express.static('public'));


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.render('index')
});


app.post('/search', (req, res, next) => {

  const theInput = req.body.artist;

  spotifyApi.searchArtists(theInput)
    .then(data => {
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      console.log( data.body.artists);
      let url = data.body.artists.items[0].images[0].url;
      res.render('artists', {artist: data.body.artists.items[0], url});

    })
    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
      console.log(err);
    });

})


app.get('/albums/:artistId', (req, res) => {
  // code
});


// app.get('/artists', (req, res, next) => {

//   res.render('artists')

// });




// Server Started
app.listen(3000, () => {
  console.log('My app is listening on port 3000!');
});

// Server Started short version
// app.listen(3000, () => console.log('Example app listening on port 3000!'))




//------------------------- Nots



// // our first Route:
// app.get('/', (request, response, next) => {
//   response.sendFile(__dirname + '/views/index.html');
// });

// // about route:
// app.get('/about', (request, response, next) => {
//   response.sendFile(__dirname + '/views/about-page.html');
// });

// // gallery route:
// app.get('/gallery', (request, response, next) => {
//   response.sendFile(__dirname + '/views/gallery-page.html');
// });



// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));


// app.post('/accountDetails', (req, res, next)=>{

//     const theUsername = req.body.theUserNameThing;
//     const thePass     = req.body.thePasswordThing;


//     res.render('accountDetails', {usr: theUsername, pss: thePass})

// })


// app.get('/profile/:username', function (req, res) {
//   res.render('index', {theUserNameVariable: req.params.username})
// })



// app.get('/search', function (req, res) {
//     res.send('<h1>'+req.query +'</h1>')
//   })








