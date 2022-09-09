FROM node:16

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm seed

CMD ["npm","start"]