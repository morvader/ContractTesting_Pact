const request = require('request');
const Film = require('./model/filmClientModel');

class FilmsServiceClient {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    getAllFilms() {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/films/',
                headers: {
                    'Accept': 'application/json'
                }
            };

            request(options, (error, response, body) => {

                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const result = parsedBody.films.map((data) => Film.fromJson(data));

                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }

    getFilmById(filmId) {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/films/' + filmId,
                headers: {
                    'Accept': 'application/json'
                }
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const result = Film.fromJson(parsedBody.film);

                    resolve(result);
                } else if (response.statusCode == 404) {
                    resolve(response);
                } else {
                    reject(error);
                }
            });
        });
    }
    getFilmByYear(year) {
        return new Promise((resolve, reject) => {
            const options = {
                url: this.endpoint + '/films/',
                headers: {
                    'Accept': 'application/json'
                }
            };
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const allFilms = parsedBody.films.map((data) => Film.fromJson(data));

                    var result = allFilms.filter((Film) => Film.Anio == year);

                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }
}


module.exports = FilmsServiceClient;