const logger = require('winston');
const Sequelize = require('sequelize');

const opts = {
  dialect: 'postgres',
  logging: false,
  define: {
    freezeTableName: true,
  },
};

async function run() {
  logger.info('pre test script');

  let sequelize = new Sequelize(
    'postgres://postgres:postgres@db:5432/postgres',
    opts,
  );

  await sequelize
    .authenticate()
    .catch(error => {
      logger.info('auth error:', error.message);

      sequelize.close();

      throw new Error('Error connecting to postgres database');
    })
    .then(() =>
      sequelize
        .query('DROP DATABASE IF EXISTS daily_log_test')
        .then(() => sequelize.query('CREATE DATABASE daily_log_test'))
        .then(() => logger.info('test database created'))
        .then(() => sequelize.close())
        .catch(() => sequelize.close()),
    );

  sequelize = new Sequelize('daily_log_test', 'postgres', 'postgres', opts);

  await sequelize.authenticate();

  sequelize.close();
}

run().catch(error => logger.error('run error:', error.message));
