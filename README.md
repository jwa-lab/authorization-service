# authorization-service

Mock authorization service for offline development.

## How to use

Start the service with

`docker compose up`

A default user token will show up at startup. If you need a studio token you can use the `token_type` parameter.

```
% curl --location --request GET 'http://localhost:8999/oauth2/default/v1/token?token_type=studio'
```

It is also possible to change the default `studio_id` and `user_id` stored in the token with the following parameters:

-   `studio_id=my_studio_a`: Will define the user / studio token `cid` to `my_studio_a`

-   `user_id=my_user_id_a`: Will define the user token `uid` to `my_user_id_a`

## Available parameters

-   `token_type`: Change the kind of token generated.
    -   Accepted values
        -   `studio`
        -   `user` (default)
-   `studio_id`: Changes the default `cid` in the generated token.
    -   Accepted values
        -   `Any String` (default=studio_id)
-   `user_id`: Changes the default `uid` in the generated **user** token.
    -   Accepted values
        -   `Any String` (default=unique_user_id)
