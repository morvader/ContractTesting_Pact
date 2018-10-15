var expect = require('chai').expect;
var assert = require('assert');
const sinon = require("sinon");
var Film = require('../models/filmModel')
var filmList = require('../controllers/filmsController');

describe('Films Controller Test', function () {
    var res;
    var stub_getById;
    var stub_fetchAll;
    beforeEach(() => {
        res = {
            end: sinon.spy(),
            send: sinon.spy(),
            writeHead: sinon.spy()
        }
        stub_getById =  sinon.stub(filmList.filmRepository, 'getById');
        stub_fetchAll = sinon.stub(filmList.filmRepository, 'fetchAll');

    });
    afterEach(()=>{
        //Clear data
        filmList.filmRepository.clear();

        //Detach sies and stubs
        filmList.filmRepository.fetchAll.restore();
        filmList.filmRepository.getById.restore();
    });
    it('Get all films should return init films', function () {
        let req = {}
        stub_fetchAll.returns([new Film(1,'nombre','desc',1980),new Film(2,'nombre2','desc2',1990)]);

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
        stub_getById.withArgs(1).returns(new Film(1,'nombre','desc',1980));

        filmList.read_a_film(req, res);
        var films = JSON.parse(res.end.firstCall.args[0]);

        expect(films.film.id).to.equal(1);
        expect(films.film.Name).to.equal('nombre');
        expect(films.film.Description).to.equal('desc');
        expect(films.film.Year).to.equal(1980);

        expect(stub_getById.called).to.be.true;

    });
    it('Get non existing film should return 404', function () {

        let req = {
            //Id no existe
            params: {
                filmId: 1
            }
        }
        stub_getById.withArgs(1).returns(undefined);

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

        filmList.filmRepository.insert = sinon.spy();

        filmList.create_a_film(req, res);
        
        var returnData = JSON.parse(res.end.firstCall.args[0]);
        expect(returnData).to.deep.equals(newFilmData);

        //An alement is added
        expect(filmList.filmRepository.insert.called).to.be.true;


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
        
        filmList.filmRepository.insert = sinon.spy();

        stub_getById.withArgs(1).returns(new Film(1,"existing film", "existing desc", 1980));

        filmList.create_a_film(req, res);
        
        var returnCode = JSON.parse(res.writeHead.firstCall.args[0]);
        var returnResponse = JSON.parse(res.end.firstCall.args[0]);
        expect(returnCode).to.equals(500);
        expect(returnResponse).to.be.equal("Duplicate ID");

        //Didnt call insert method
        expect(filmList.filmRepository.insert.called).to.be.false;

    });

    it('Delete an existing film should remove the film', function () {
        let req = {
            //Existing ID
            params: {
                filmId: 1
            }
        }

        filmList.filmRepository.delete = sinon.spy();
        stub_getById.withArgs(1).returns(new Film(1,"existing film", "existing desc", 1980));

        filmList.delete_a_film(req, res);
        
        var returnCode = JSON.parse(res.writeHead.firstCall.args[0]);
        var returnResponse = JSON.parse(res.end.firstCall.args[0]);
        expect(returnCode).to.equals(200);
        expect(returnResponse).to.be.equal("Film Deleted");

        expect(filmList.filmRepository.delete.called).to.be.true;

        
    });
    it('Delete non existing film should return an error', function () {
        let req = {
            //Non existing ID
            params: {
                filmId: 10
            }
        }
        filmList.filmRepository.delete = sinon.spy();
        stub_getById.withArgs(10).returns(undefined);

        filmList.delete_a_film(req, res);
        
        var returnCode = JSON.parse(res.writeHead.firstCall.args[0]);
        var returnResponse = JSON.parse(res.end.firstCall.args[0]);
        expect(returnCode).to.equals(404);
        expect(returnResponse).to.be.equal("ID Not found");
        
        //Didnt call delete method
        expect(filmList.filmRepository.delete.called).to.be.false;
    });
});