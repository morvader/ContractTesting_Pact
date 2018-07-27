'use strict';
var expect = require('chai').expect;
var server = require('supertest').agent('http://localhost:3000');


const Film = require('../models/filmModel');

describe('Pruebas integración cliente',() =>{
    beforeEach((done)=>{
        server
        .post('/init')
        .expect(200)
        .end(done);
    });
    it('Get Existing Film should return the film',(done) =>{
        server
        .get('/films/1')
        .set({ 'Accept': 'application/json' })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
            expect(res.body.film.id).to.be.eq(1);
        })
        .end(done);

    });

    it('Get Non existing film should return not found',(done) =>{
        server
        .get('/films/10')
        .set({ 'Accept': 'application/json' })
        .expect('Content-Type', /json/)
        .expect(404)
        .end(done);
    });

    it('Get All films should return the complete list',(done) =>{
        server
        .get('/films')
        .set({ 'Accept': 'application/json' })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
            expect(res.body.films.length).eq(3);
        })
        .end(done);
    });
});