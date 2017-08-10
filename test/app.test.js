const test = require('ava');
const request = require('supertest');
const getPort = require('get-port');
const app = require('../src/app');

let server;

test.before.cb(t => {
  getPort().then(port => {
    server = app.listen(port);
    server.once('listening', t.end);
  });
});

test.after.cb(t => server.close(t.end));

test('start and shows the index page', async t => {
  const res = await request(app).get('/').expect(200);

  t.truthy(res.text.indexOf('<html>') !== -1);
});

test('shows a 404 HTML page', async t => {
  const res = await request(app)
    .get('/path/to/nowhere')
    .set('Accept', 'text/html')
    .expect(404);

  t.truthy(res.text.indexOf('<html>') !== -1);
});

test('shows a 404 JSON error without stack trace', async t => {
  const res = await request(app)
    .get('/path/to/nowhere')
    .set('Accept', 'application/json')
    .expect(404);

  t.is(res.statusCode, 404);
  t.is(res.body.code, 404);
  t.is(res.body.message, 'Page not found');
  t.is(res.body.name, 'NotFound');
});
