FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY .env ./

COPY cert.pem ./

RUN npm install --only=production

COPY key.pem ./

COPY dist dist/

USER node

CMD [ "npm", "start" ]

EXPOSE 3000