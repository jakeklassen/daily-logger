const users = require('./users/users.service.js');
const links = require('./links/links.service.js');

module.exports = function initServices() {
  const app = this;
  app.configure(users);
  app.configure(links);
};
