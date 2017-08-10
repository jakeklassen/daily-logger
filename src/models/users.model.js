const { DataTypes } = require('sequelize');

module.exports = function userModel(app) {
  const sequelize = app.get('sequelizeClient');

  const users = sequelize.define(
    'users',
    {
      googleId: DataTypes.STRING,
      githubId: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
    },
    {
      classMethods: {
        /* eslint-disable no-unused-vars */
        associate(models) {
          /* eslint-enable no-unused-vars */
          // associations can be defined here
        },
      },

      hooks: {
        beforeCount(options) {
          options.raw = true; // eslint-disable-line no-param-reassign
        },
      },
    },
  );

  return users;
};
