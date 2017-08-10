const { authenticate } = require('feathers-authentication').hooks;
const {
  when,
  discard,
  iff,
  isNot,
  disallow,
  isProvider,
} = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: 'id',
    ownerField: 'id',
  }),
];

module.exports = {
  before: {
    all: [],
    find: [iff(isNot(isProvider('server')), disallow())],
    get: [...restrict],
    create: [iff(isNot(isProvider('server')), disallow())],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict],
  },

  after: {
    all: [when(hook => hook.params.provider, discard('googleId', 'githubId'))],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
