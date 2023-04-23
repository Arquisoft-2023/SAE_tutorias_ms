# SAE Tutorias
Proyecto Sistema de Acompañamiento Estudiantil (SAE) en la facultad de medicina de la Universidad Nacional de Colombia - Sede Bogotá

Microservicio Tutorias

# Autor
Sebastián Hernández Cerón

# Comando ejecutar script de cola de mensajes RabbitMQ RPC (send)
    
1 Instalar el servicio de RabbitMQ en la maquina local

    choco install rabbitmq

2 Ejecutar el siguiente comando en la carpeta raiz del proyecto:

    npm run queque

# Comandos de despliegue

## Despliegue Base de datos

    docker pull mongo

    docker run -d -p 27018:27017 -v \X:/data/db --name db_mongo_client mongo
    
    X: Direccion de la carpeta donde de sea guardar la persistencia de los datos.

## Despliegue de Microservicio

    docker build --no-cache -t sae_tutorias_ms .

    docker run -p 3002:3002 -e DB_TYPE=mongodb -e DB_HOST=X -e DB_PORT=27018 -e DB_NAME=sae_tutorias_db -e URI=127.0.0.1 -e PORT=3002 --name sae_tutorias_ms sae_tutorias_ms

    X: Direccion de ipv4 de la computadora local

# Comandos de despliegue con docker-compose

1 Si no se ha creado la red de docker para los microservicios, ejecutar el siguiente comando:

    docker network create nodes-networks

2 Contruir y ejecutar el contenedor:

    docker-compose build --no-cache
    
    docker-compose up

3 Detener y eliminar el contenedor:

    docker-compose down

# Comandos para configurar contraseña de la base de datos

1 Ingresar al contenedor de la base de datos:

    docker exec -it db_mongo_client bash

2 Ingresar a la base de datos:

    mongosh -u <user> -p <password>

3 Seleccionar la base de datos:

    use sae_tutorias_db

4 Ingreser el usuario y la contraseña:

    db.createUser({user: "xxxx", pwd: "xxx", roles: [{ role: "readWrite", db: "sae_tutorias_db" }]})
