const FilmsServiceClient = require('./FilmsServiceClient');

const filmsServiceClient = new FilmsServiceClient('http://localhost:3000');

filmsServiceClient.getAllFilms()
    .then((films) => {
        console.log(films);
    })
    .catch((error) => {
        console.log(error);
    });

filmsServiceClient.getFilmById(1)
    .then((film) => {
        if (film.statusCode == 404)
            console.log("The film you are looking for does not exist");
        else {
            console.log(film);
        }
    })
    .catch((error) => {
        console.log(error);
    });

filmsServiceClient.getFilmByYear(1980)
    .then((film) => {
        if (film.statusCode == 404)
            console.log("The film you are looking for does not exist");
        else {
            console.log(film);
        }
    })
    .catch((error) => {
        console.log(error);
    });