FROM node:16
ENV NODE_ENV production

WORKDIR /app

COPY . .

RUN npm install --ignore-scripts

RUN npm seed

EXPOSE 9090
CMD ["npm","start"]