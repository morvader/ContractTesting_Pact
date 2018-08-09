var expect = require('chai').expect;
var nock = require('nock');
var FilmsService = require('../FilmsServiceClient');

describe('GET Films', function () {
    beforeEach(function () {
        var allFilmsResponse = {
            "films": [{
                    "id": 1,
                    "Name": "Star Wars",
                    "Description": "Espacio",
                    "Year": 1980
                },
                {
                    "id": 2,
                    "Name": "Superman",
                    "Description": "Comic",
                    "Year": 1986
                },
                {
                    "id": 3,
                    "Name": "Indiana Jones",
                    "Description": "Adventures",
                    "Year": 1985
                }
            ]
        };

        var endPoint = 'http://localhost:3000';
 
        nock(endPoint)
            .get('/films/')
            .reply(200, allFilmsResponse);

        filmService = new FilmsService(endPoint);
    });

    it('returns all films', () => {
        return filmService.getAllFilms()
            .then(response => {
                expect(response).to.be.not.null;
                expect(response).to.have.length(3);
                expect(response[0].Descripcion).to.equal("Espacio");
            });
    });
});