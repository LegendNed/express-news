FROM node:16
ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm seed

EXPOSE 9090
CMD ["npm","start"]