const test = require('ava');
const app = require('../../src/app');

test('registered the service', t => {
  const service = app.service('links');

  t.truthy(service, 'Registered the service');
});
