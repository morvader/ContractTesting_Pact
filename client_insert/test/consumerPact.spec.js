const chai = require('chai')
const path = require('path')
//const chaiAsPromised = require('chai-as-promised')
const { Pact } =  require('@pact-foundation/pact')
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9123
//chai.use(chaiAsPromised)


var FilmsService = require('../FilmsServiceClient');
// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = new Pact({
    consumer: 'Insert Films Client',
    provider: 'Films Provider',
    port: API_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2
})

var endPoint = 'http://localhost:' + API_PORT;

describe('Inserting films', () => {
    before(() => {
        filmService = new FilmsService(endPoint);
        return provider.setup();
    })

    // Write pact files to file
    after(() => {
        return provider.finalize()
    })
    describe('When insert the meaning of life', () => {
        describe('monty phyton film should be inserted', () => {
            var pact_body = {"id": 42,
                        "Name": "Meaning of life",
                        "Description": "Comedy",
                        "Year": 1986}
            before(() => {
                return provider.addInteraction({
                    state: 'Empty repository',
                    uponReceiving: 'Insert meaning of life',
                    withRequest: {
                        method: 'POST',
                        path: '/films/',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: pact_body
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: pact_body
                    }
                })
            })

            it('film is inserted', () => {
                return filmService.insertFilm(42)
                    .then(response => {
                        expect(response).to.be.not.null;
                        expect(response.id).to.equal(42);
                    });
            });
        })
    });

});