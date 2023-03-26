FROM node:16-alpine

#Creat app directory
# /usr/src/app
RUN mkdir -p /sae_tutorias_ms
WORKDIR /sae_tutorias_ms

#Insall app dependencies
#/usr/src/app/
COPY package*.json /sae_tutorias_ms/
RUN npm install

#Bundle app source
#/usr/src/app/
COPY . /sae_tutorias_ms/

EXPOSE 3002
CMD [ "npm", "start" ]