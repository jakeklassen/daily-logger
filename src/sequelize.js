const Sequelize = require('sequelize');

module.exports = function connection() {
  const app = this;
  const connectionString = app.get('postgres');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
    },
  });

  app.set('sequelizeClient', sequelize);

  app.setup = (...args) => {
    const result = app.set(args);

    // Set up data relationships
    const models = sequelize.models;
    app.set('models', models);

    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    return result;
  };
};
