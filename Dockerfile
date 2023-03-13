FROM node:16-alpine

#Creat app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Insall app dependencies
COPY package*.json /usr/src/app/
RUN npm install

#Bundle app source
COPY . /usr/src/app/

EXPOSE 8080
CMD [ "npm", "start" ]