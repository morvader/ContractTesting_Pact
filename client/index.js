const FilmsServiceClient = require('./FilmsServiceClient');

const filmsServiceClient = new FilmsServiceClient('http://localhost:3000');

filmsServiceClient.getAllFilms()
    .then((films) => {
        console.log(films);
    })
    .catch((error) => {
        console.log(error);
    })
;

filmsServiceClient.getFilmById(1)
    .then((films) => {
        console.log(films);
    })
    .catch((error) => {
        console.log(error);
    })
;