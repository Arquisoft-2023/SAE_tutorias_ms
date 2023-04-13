FROM node:16-alpine

#Creat app directory
RUN mkdir -p sae/sae_tutorias/sae_tutorias_ms
WORKDIR /sae/sae_tutorias/sae_tutorias_ms

#Install app dependencies
COPY package*.json /sae/sae_tutorias/sae_tutorias_ms/
RUN npm install

#Bundle app source
COPY . /sae/sae_tutorias/sae_tutorias_ms/

#Base de datos
ENV DB_TYPE=mongodb
ENV DB_HOST=0.0.0.0
ENV DB_PORT=27019
ENV DB_NAME=sae_tutorias_db
# ENV DB_USER =d1saebd
# ENV DB_PASSWORD =papitas_0.*rt

#Servidor
ENV PORT=3026
ENV URI=127.0.0.6
# NAME = sae_tutorias_ms
EXPOSE 3026

CMD [ "npm", "start" ]