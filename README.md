# daily-log

> Track links for your daily log

## Getting Started

### Development

Start the application using `docker-compose up`.

This will create two containers: `daily-log-server` and `daily-log-db`.

To access the node server use: `docker exec -it -u node daily-log-server bash`

### Tests

After starting the application stack via `docker-compose`, login with `docker exec -it -u node daily-log-server bash` and run `yarn test`.
