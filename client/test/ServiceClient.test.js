var expect = require('chai').expect;
var nock = require('nock');
var FilmsService = require('../FilmsServiceClient');
var MockResponses = require('./MockResponses')

describe('GET Films', function () {
    beforeEach(function () {
    
        var endPoint = 'http://localhost:3000';

        nock(endPoint)
            .get('/films/')
            .reply(200,MockResponses.allFilmsResponse);

        nock(endPoint)
            .get('/films/1')
            .reply(200, MockResponses.oneFilmResponse);

        nock(endPoint)
            .get('/films/99')
            .reply(404);

        filmService = new FilmsService(endPoint);
    });

    it('returns all films', () => {
        return filmService.getAllFilms()
            .then(response => {
                expect(response).to.be.not.null;
                expect(response).to.have.length(3);
                expect(response[0].Descripcion).to.equal("Space");
            });
    });

    it('returns film by existing ID', () => {
        return filmService.getFilmById(1)
            .then(response => {
                expect(response).to.be.not.null;
                expect(response.id).to.equal(1);
            });
    });
    it('returns film by existing ID', () => {
        return filmService.getFilmById(99)
            .then(response => {
                expect(response).to.be.not.null;
                expect(response.statusCode).to.equal(404);
            });
    });
    it('If there is only one film should only one result', () => {
        var year = 1980;
        return filmService.getFilmByYear(year)
            .then(response => {
                expect(response).to.be.not.null;
                expect(response.length).to.equal(1);
                expect(response[0].Anio).to.equal(year);
            });
    });

    it('If there is no films with year selected should return empty array', () => {
        var year = 1900;
        return filmService.getFilmByYear(year)
            .then(response => {
                expect(response).to.be.not.null;
                expect(response.length).to.equal(0);
            });
    });
});