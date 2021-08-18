# authorization-service

Mock authorization service for offline development.

# How to use

Start the service with

`docker compose up`

A default user token will show up at startup. If you need a studio token you can use

`% curl --location --request GET 'http://localhost:8999/oauth2/default/v1/token?token_type=studio'`
