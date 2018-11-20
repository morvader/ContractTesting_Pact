const pact = require('@pact-foundation/pact-node')
const path = require('path')
const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/films_client-films_provider.json')],
  pactBroker: 'https://sngular.pact.dius.com.au',
  pactBrokerUsername: 'CpucMEre0rX3rIubjW4a2q6F9xf0Ob',
  pactBrokerPassword: '9ncimrV2kI3npTrgX4x26veB8XccFt0',
  tags: ['prod', 'test'],
  consumerVersion: '1.0.0'
}

pact.publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to https://sngular.pact.dius.com.au/ and login with')
    console.log('=> Username: CpucMEre0rX3rIubjW4a2q6F9xf0Ob')
    console.log('=> Password: 9ncimrV2kI3npTrgX4x26veB8XccFt0')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })
