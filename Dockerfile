FROM node:16
ENV NODE_ENV production

WORKDIR /app

COPY . .

RUN npm install --ignore-scripts

EXPOSE 9090
CMD ["npm","start"]