const chai = require('chai')
const path = require('path')
//const chaiAsPromised = require('chai-as-promised')
const { Pact } =  require('@pact-foundation/pact')
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9123
//chai.use(chaiAsPromised)

var MockResponses = require('./MockResponses')
var FilmsService = require('../FilmsServiceClient');
// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = new Pact({
    consumer: 'Films Client',
    provider: 'Films Provider',
    port: API_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: LOG_LEVEL,
    spec: 2
})

var endPoint = 'http://localhost:' + API_PORT;

describe('Test with Pact', () => {
    before(() => {
        filmService = new FilmsService(endPoint);
        return provider.setup();
    })

    // Write pact files to file
    after(() => {
        return provider.finalize()
    })
    describe('When a call is made', () => {
        describe('Get all films', () => {
            before(() => {
                return provider.addInteraction({
                    state: 'Get all Films',
                    uponReceiving: 'Get all stored films',
                    withRequest: {
                        method: 'GET',
                        path: '/films/',
                        headers: {
                            'Accept': 'application/json'
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: MockResponses.allFilmsResponse
                    }
                })
            })

            it('returns all films', () => {
                return filmService.getAllFilms()
                    .then(response => {
                        expect(response).to.be.not.null;
                        expect(response).to.have.length(3);
                        expect(response[0].Descripcion).to.equal("Espacio");
                    });
            });
        })
    });

});