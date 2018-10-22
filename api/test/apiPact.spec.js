const { Verifier } = require('@pact-foundation/pact')
var path = require('path');

let clienteNormal = {
    provider:"Films Provider",
    providerBaseUrl: 'http://localhost:3000',
    //providerStatesUrl: 'http://localhost:9000/states',
    providerStatesSetupUrl: 'http://localhost:3000/init',
    pactUrls: [path.resolve(__dirname, '../../pacts/films_client-films_provider.json')]
};


new Verifier().verifyProvider(clienteNormal).then(() => {
    console.log('success');
    process.exit(0);
}).catch((error) => {
    console.log('failed', error);
    process.exit(1);
});