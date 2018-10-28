const {
    Verifier
} = require('@pact-foundation/pact')
var path = require('path');

describe('Pruebas integración cliente', () => {
    it('Verify Pact Insert', () => {
       
        let clienteInsert = {
            provider: "Films Provider",
            providerBaseUrl: 'http://localhost:3000',
            providerStatesSetupUrl: 'http://localhost:3000/init',
            pactUrls: [path.resolve(__dirname, '../../pacts/insert_films_client-films_provider.json')]
        };
        return new Verifier().verifyProvider(clienteInsert)
            .then(output => {
                console.log('Pact Verification Complete!')
                console.log(output)
            })
    });
    it('Verify Pact Normal', () => {
       
        let clienteNormal = {
            provider:"Films Provider",
            providerBaseUrl: 'http://localhost:3000',
            providerStatesSetupUrl: 'http://localhost:3000/init',
            pactUrls: [path.resolve(__dirname, '../../pacts/films_client-films_provider.json')]
        };
        
        return new Verifier().verifyProvider(clienteNormal)
            .then(output => {
                console.log('Pact Verification Complete!')
                console.log(output)
            })
    });

});
