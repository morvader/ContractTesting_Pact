const FilmsServiceClient = require('./FilmsServiceClient');

const filmsServiceClient = new FilmsServiceClient('http://localhost:3000');

filmsServiceClient.getAllFilms()
    .then((films) => {
        console.log("ALL FILMS:");
        console.log(films);
    })
    .catch((error) => {
        console.log(error);
    });

filmsServiceClient.getFilmById(1)
    .then((film) => {
        console.log("FILM ID[1]:");
        if (film.statusCode == 404)
            console.log("The film you are looking for does not exist");
        else {
            console.log(film);
        }
    })
    .catch((error) => {
        console.log(error);
    });

filmsServiceClient.getFilmByYear(1985)
    .then((film) => {
        console.log("FILM ON 1985:");
        if (film.statusCode == 404)
            console.log("The film you are looking for does not exist");
        else {
            console.log(film);
        }
    })
    .catch((error) => {
        console.log(error);
    });