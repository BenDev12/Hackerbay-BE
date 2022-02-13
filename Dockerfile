FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm i

COPY . ./

EXPOSE 4000

CMD ["npm", "start"]

