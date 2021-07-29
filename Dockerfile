FROM node:14-alpine

WORKDIR /app

COPY src ./src
COPY package.json .
COPY LICENSE .
COPY package.json .
COPY package-lock.json .

RUN npm install

USER node

ENTRYPOINT ["npm", "run", "start"]

EXPOSE 8999