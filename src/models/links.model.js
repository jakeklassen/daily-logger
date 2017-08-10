// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function linkModel(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const links = sequelizeClient.define(
    'links',
    {
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true; // eslint-disable-line no-param-reassign
        },
      },
    },
  );

  links.associate = function associate() {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  // links.sync();

  return links;
};
