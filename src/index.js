const express = require("express");
const jose = require("node-jose");
const uuid = require("uuid");

const logPrefix = "[MOCK AUTHORIZATION DEV]";
const keyStore = jose.JWK.createKeyStore();
const PORT = 8999;

async function server() {
    const app = express();

    app.use(express.json());

    app.use("/oauth2/default/v1/token", async (req, res, next) => {
        let jwt;
        try {
            jwt = await createJWT();
        } catch (error) {
            return res.status(500).send({
                error: error?.message || "Undefined Error",
                ts: Date.now()
            });
        }
        return res.status(200).send({
            token: jwt
        });
    });

    app.use("/oauth2/default/v1/keys", (req, res, next) => {
        return res.status(200).send(keyStore.toJSON());
    });

    app.listen(PORT, () => {
        console.log(
            logPrefix,
            `Airlock Dev authorization service listening on port ${PORT}`
        );
    });
}

async function createJWK() {
    await keyStore.generate("RSA", 2048, {
        kid: uuid.v4(),
        alg: "RS256",
        use: "sig"
    });
    console.log(logPrefix, "JWK successfully created.");
}

async function createJWT() {
    const [key] = keyStore.all({ use: "sig" });
    const options = {
        compact: true,
        jwk: key,
        fields: {
            typ: "JWT"
        }
    };
    const payload = {
        aud: "api://default",
        iss: "http://localhost:8001/oauth2/default",
        exp: 4116816351,
        iat: Math.floor(Date.now() / 1000),
        jti: uuid.v4(),
        sub: "DEV_TOKEN"
    };
    let token;

    token = jose.JWS.createSign(options, key)
        .update(JSON.stringify(payload))
        .final();

    return token;
}

async function init() {
    let jwt;

    try {
        await createJWK();
    } catch (error) {
        console.error(logPrefix, error?.message);
        return;
    }

    try {
        jwt = await createJWT();
    } catch (error) {
        console.error(logPrefix, error?.message);
        return;
    }

    await server();
    console.log(logPrefix, "Your dev JWT : ", jwt);
}

init();
