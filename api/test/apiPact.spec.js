const { Verifier } = require('@pact-foundation/pact')
const { Pact,Matchers } =  require('@pact-foundation/pact')
const { eachLike, like, term, iso8601DateTimeWithMillis } = Matchers;
var path = require('path');

let clienteNormal = {
    provider:"Films Provider",
    providerBaseUrl: 'http://localhost:3000',
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