const test = require('ava');
const request = require('supertest');
const getPort = require('get-port');
const app = require('../../src/app');

const authentication = app.get('authentication');
let server;

test.before.cb(t => {
  getPort().then(port => {
    server = app.listen(port);
    server.once('listening', t.end);
  });
});

test.after.cb(t => server.close(t.end));

test.beforeEach(async t => {
  t.context.user = await app.service('users').create({});
  t.context.accessToken = await app.passport.createJWT(
    { userId: t.context.user.id },
    authentication,
  );
});

test('registered the service', t => {
  const service = app.service('users');

  t.truthy(service);
});

test('guests cannot list users', async t => {
  const res = await request(app).get('/users').expect(405);

  t.is(res.body.name, 'MethodNotAllowed');
});

test('authenticated users cannot list users', async t => {
  const res = await request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${t.context.accessToken}`)
    .expect(405);

  t.is(res.body.name, 'MethodNotAllowed');
});

test('guests cannot get a user', async t => {
  const res = await request(app).get('/users/1').expect(401);

  t.is(res.body.name, 'NotAuthenticated');
});

test('authenticated users cannot get other users', async t => {
  const res = await request(app).get(`/users/${t.context.user.id}`).expect(401);

  t.is(res.body.name, 'NotAuthenticated');
});

test('authenticated users can get themselves', async t => {
  const res = await request(app)
    .get(`/users/${t.context.user.id}`)
    .set('Authorization', `Bearer ${t.context.accessToken}`)
    .expect(200);

  t.is(res.body.id, t.context.user.id);
  t.falsy(res.body.githubId);
  t.falsy(res.body.googleId);
});

test('guests cannot create users', async t => {
  const res = await request(app)
    .post('/users')
    .set('Accept', 'application/json')
    .send({})
    .expect(405);

  t.is(res.body.name, 'MethodNotAllowed');
});

test('authenticated users cannot create users', async t => {
  const res = await request(app)
    .post('/users')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${t.context.accessToken}`)
    .send({})
    .expect(405);

  t.is(res.body.name, 'MethodNotAllowed');
});
