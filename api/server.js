var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
Film = require('./models/filmModel'),
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/filmsRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Film list RESTful API server started on: ' + port);