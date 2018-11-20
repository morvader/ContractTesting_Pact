const { Verifier } = require('@pact-foundation/pact')
const { Pact,Matchers } =  require('@pact-foundation/pact')
const { eachLike, like, term, iso8601DateTimeWithMillis } = Matchers;
var path = require('path');

let clienteNormal = {
    provider:"Films Provider",
    providerBaseUrl: 'http://localhost:3000',
    providerStatesSetupUrl: 'http://localhost:3000/init',
    //pactUrls: [path.resolve(__dirname, '../../pacts/films_client-films_provider.json')],
    pactBrokerUrl: 'https://sngular.pact.dius.com.au',
    tags: ['prod'],
    pactBrokerUsername: 'CpucMEre0rX3rIubjW4a2q6F9xf0Ob',
    pactBrokerPassword: '9ncimrV2kI3npTrgX4x26veB8XccFt0',
    publishVerificationResult: true,
    providerVersion: '1.0.0'
};


new Verifier().verifyProvider(clienteNormal).then(() => {
    console.log('success');
    process.exit(0);
}).catch((error) => {
    console.log('failed', error);
    process.exit(1);
});