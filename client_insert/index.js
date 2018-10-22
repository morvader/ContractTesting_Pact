const FilmsServiceClient = require('./FilmsServiceClient');

const filmsServiceClient = new FilmsServiceClient('http://localhost:3000');

filmsServiceClient.insertFilm(42)
    .then((film) => {
        console.log(film);
    })
    .catch((error) => {
        console.log(error);
    });