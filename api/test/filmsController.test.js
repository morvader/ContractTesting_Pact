var expect = require('chai').expect;
var assert = require('assert');
const sinon = require("sinon");

var filmList = require('../controllers/filmsController');

describe('Controller Test', function () {
    beforeEach(()=>{
        let reqInit = {}
        let resInit = {
            end: sinon.spy(),
            send: sinon.spy(),
            writeHead: sinon.spy()
        }
        //Init data
        filmList.list_init_data(reqInit,resInit);
    });
    it('Get all films', function () {
        let req = {}
        let res = {
            end: sinon.spy(),
            send: sinon.spy(),
            writeHead: sinon.spy()
        }
        
        filmList.list_all_films(req, res);
        var films = JSON.parse(res.end.firstCall.args[0]);
        expect(films.films[0].id).to.equal(1);
        
    });
});