'use strict';
var expect = require('chai').expect;
var server = require('supertest').agent('http://localhost:3000');


const Film = require('../models/filmModel');

describe('Pruebas integración cliente', () => {
    beforeEach((done) => {
        server
            .post('/init')
            .expect(200)
            .end(done);
    });
    it('GET Existing Film should return the film', (done) => {
        let existingFilmId = 1;
        server
            .get('/films/' + existingFilmId)
            .set({
                'Accept': 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.film.id).to.be.eq(1);
            })
            .end(done);

    });

    it('GET Non existing film should return not found', (done) => {
        let nonExistingFilmId = 10;
        server
            .get('/films/' + nonExistingFilmId)
            .set({
                'Accept': 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(404)
            .end(done);
    });

    it('GET All films should return the complete list', (done) => {
        server
            .get('/films')
            .set({
                'Accept': 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.films.length).eq(3);
            })
            .end(done);
    });

    it('DELETE an existing film should erase the film', (done) => {
        let existingFilmId = 1;
        let serverResponse = "Film Deleted";
        //Deletes the film and then check is not returned again
        server.del('/films/' + existingFilmId)
            .set({
                'Accept': 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body).eq(serverResponse);
            }).end(() => {
                server.get('/films').set({
                        'Accept': 'application/json'
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.films.length).eq(2);
                        expect(res.body.films[0].id).not.eq(1);
                    }).end(done);
            });
    });
    it('DELETE an non existing film should return 404', (done) => {
        let nonExistingFilmId = 10;
        server.del('/films/' + nonExistingFilmId)
            .set({
                'Accept': 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(404)
            .end(done);
    });

    it('POST a new film should insert the fils', (done) => {
        let newFilm = new Film (10,"It Test Name", "It Test Description", "2000");
        //Post new film and check if returned back in the next call
        server.post('/films/')
            .set({
                'Accept': 'application/json'
            }).send(newFilm)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body).eq(newFilm);
            }).end(() => {
                server.get('/films').set({
                        'Accept': 'application/json'
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.films.length).eq(4);
                        expect(res.body.films[3].id).eq(newFilm.id);
                        expect(res.body.films[3].Name).eq(newFilm.Name);
                    }).end(done);
            });
        });
});