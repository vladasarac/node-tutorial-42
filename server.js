const express = require('express');
const hbs = require('hbs');//paket handlebars, templateing engine
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');//folder sa partialsima hbs view-ova
app.set('view engine', 'hbs');
 
//middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  // console.log(`${ now }, requestMethod: ${ req.method }, requestUrl: ${ req.url }`);
  //pri svakom requestu middleware pravi log sa treenutnim vremenom, metodom(GET, POST itd..) i URL -om koji je trazen
  var log = `${ now }, requestMethod: ${ req.method }, requestUrl: ${ req.url }`;
  console.log(log);
  //upisujemo log u fajl server.log
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log.');
  });  
  next();
});

//ovaj middleware nema next() tako da se kod njega prekida tok i nece biti ucitana ni jedna stranica
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//hbs helper koji se moze pozivati u hbs vjuovima, vraca trenutnu godinu
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
//hbs helper koji se moze pozivati u hbs vjuovima, pretvara string u uppercase
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//home ruta
app.get('/', (req, res) => {
  res.render('home.hbs', { pageTitle: 'Home Page', welcomeMessage: 'Welcome to my website.' });
});

//about ruta
app.get('/about', (req, res) => {
  res.render('about.hbs', { pageTitle: 'About Page' });
});

//bad ruta
app.get('/bad', (req, res) => {
  res.send({
  	errorMessage: 'Unable to handle request!'
  });
});

//pozivamo server da slusa
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);	
});















