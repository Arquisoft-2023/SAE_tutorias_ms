#!/bin/bash
# sudo su
if [ ! -d "SAE_tutorias_ms" ]; then
    echo "Clonando repositorio de SAE_tutorias_ms"
    git clone https://github.com/Arquisoft-2023/SAE_tutorias_ms.git
    cd SAE_tutorias_ms
    echo "PORT=3026
URI=http://0.0.0.0

DB_TYPE=mongodb
DB_USER=d1SaeTutorias
DB_PASSWORD=papitas0*rt
DB_HOST=sae_tutorias_db
DB_PORT=27017
DB_NAME=sae_tutorias_db

PORT_MS=3026
URI_MS=sae_tutorias_ms

URI_QUEUE=sae_mq
ID_QUEUE=tutorias_rpc_queue
RABBIT_HOST=rabbitmq
RABBIT_PORT=5672
RABBIT_USER=guest
RABBIT_PASSWORD=guest" > .env
cd ..
fi
if docker inspect sae_mq >/dev/null 2>&1; then
    if docker inspect -f '{{.State.Running}}' sae_mq | grep -q true; then
        echo "El contenedor sae_mq existe y está en ejecución."
    else
        echo "El contenedor sae_mq existe pero no está en ejecución."
        docker start sae_mq
    fi
else
    echo "El contenedor sae_mq no existe."
    docker run -d --name sae_mq -p 5672:5672 -p 15672:15672 --network=nodes-networks --network-alias=sae_mq rabbitmq:management-alpine
fi
cd SAE_tutorias_ms
git pull
docker-compose down
docker rmi sae_tutorias_ms:latest
docker rmi sae_servertutorias_mq:latest
docker volume rm saetutoriasms_volumen_data
docker volume rm sae_tutorias_ms_volumen_data
docker-compose up -d


