FROM node:16

ENV NODE_ENV production

WORKDIR /app

COPY . /app

RUN npm install
RUN npm seed

CMD ["npm","start"]