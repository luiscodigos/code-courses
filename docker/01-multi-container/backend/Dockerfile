FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV MONGODB_USER=faos
ENV MONGODB_PASS=soaf

EXPOSE 80

CMD [ "npm", "start" ]