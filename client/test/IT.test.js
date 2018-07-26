'use strict';
var expect = require('chai').expect;
var server = require('supertest').agent('http://localhost:3000');


const Film = require('../model/filmClientModel');
const client = require('../FilmsServiceClient');

describe('Pruebas integración cliente',() =>{
    beforeEach((done)=>{
        server
        .post('/init')
        .expect(200)
        .end(done);
    });
    it('Get Film',(done) =>{
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
});