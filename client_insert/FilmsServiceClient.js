const request = require('request');

class FilmsServiceClient {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    insertFilm(id) {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/films/',
                method: 'POST',
                json: true,
                body: {
                    "id": id,
                    "Name": "Meaning of life",
                    "Description": "Comedy",
                    "Year": 1986
                },
                headers: {
                    'Accept': 'application/json'
                }
            };

            request(options, (error, response, body) => {

                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    };
}


module.exports = FilmsServiceClient;