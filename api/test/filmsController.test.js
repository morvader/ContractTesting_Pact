var expect = require('chai').expect;
var assert = require('assert');
const sinon = require("sinon");

var filmList = require('../controllers/filmsController');

describe('Films Controller Test', function () {
    beforeEach(() => {
        let reqInit = {}
        let resInit = {
            end: sinon.spy(),
            send: sinon.spy(),
            writeHead: sinon.spy()
        }
        //Init data
        filmList.list_init_data(reqInit, resInit);
    });
    it('Get all films should return intt films', function () {
        let req = {}
        let res = {
            end: sinon.spy(),
            writeHead: sinon.spy()
        }

        filmList.list_all_films(req, res);
        var films = JSON.parse(res.end.firstCall.args[0]);
        expect(films.films[0].id).to.equal(1);

    });

    it('Get one film should return data of the specific film', function () {

        let req = {
            params: {
                filmId: 1
            }
        }
        let res = {
            end: sinon.spy(),
            writeHead: sinon.spy()
        }

        filmList.read_a_film(req, res);
        var films = JSON.parse(res.end.firstCall.args[0]);
        expect(films.film.id).to.equal(1);

    });
    it('Get non existing film should return 404', function () {

        let req = {
            //Id no existe
            params: {
                filmId: 10
            }
        }
        let res = {
            end: sinon.spy(),
            writeHead: sinon.spy()
        }

        filmList.read_a_film(req, res);
        var returnCode = JSON.parse(res.writeHead.firstCall.args[0]);
        expect(returnCode).to.equal(404);

    });

    it('Create a new Film should add the film to repository', function () {
        var newFilmData = {
            id: 10,
            Name: "New Test Film",
            Description: "New Film Description",
            Year: 2020
        }
        let req = {
            body: newFilmData
        }
        let res = {
            end: sinon.spy(),
            writeHead: sinon.spy()
        }

        filmList.create_a_film(req, res);
        
        var returnData = JSON.parse(res.end.firstCall.args[0]);
        expect(returnData).to.deep.equals(newFilmData);

    });

    it('Create same ID Film should return an error', function () {
        var newFilmData = {
            id: 1,
            Name: "New Test Film",
            Description: "New Film Description",
            Year: 2020
        }
        let req = {
            body: newFilmData
        }
        let res = {
            end: sinon.spy(),
            writeHead: sinon.spy()
        }

        filmList.create_a_film(req, res);
        
        var returnCode = JSON.parse(res.writeHead.firstCall.args[0]);
        var returnResponse = JSON.parse(res.end.firstCall.args[0]);
        expect(returnCode).to.equals(500);
        expect(returnResponse).to.be.equal("Duplicate ID");

    });
});