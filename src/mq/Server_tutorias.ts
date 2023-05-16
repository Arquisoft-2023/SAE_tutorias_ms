// import { crear_tutoria } from "../controllers/Tutoria";
// import { Request, Response } from 'express';
import "dotenv/config";
import axios from 'axios';

var amqp = require('amqplib/callback_api');
const urlQueue = <string>process.env.URI_QUEUE;
const idQueue = <string>process.env.ID_QUEUE;

const PORT = <string>process.env.PORT_MS || 3001;
const URI = <string>process.env.URI_MS || 'http://127.0.0.1';
// const URI_MS_CLOUD = <string>process.env.URI_MS_CLOUD || 'http://127.0.0.1';

const entryPoint = "tutoria"
// const urlApi = `http://${URI_MS_CLOUD}/${entryPoint}`
const urlApi = `http://${URI}:${PORT}/${entryPoint}`

amqp.connect(`amqp://${urlQueue}/`, function(error0: any, connection: { createChannel: (arg0: (error1: any, channel: any) => void) => void; }) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1: any, channel: { assertQueue: (arg0: string, arg1: { durable: boolean; }) => void; prefetch: (arg0: number) => void; consume: (arg0: string, arg1: (msg: any) => void) => void; sendToQueue: (arg0: any, arg1: Buffer, arg2: { correlationId: any; }) => void; ack: (arg0: any) => void; }) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(idQueue, {
      durable: false
    });
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests-Tutorias');
    channel.consume(idQueue, async function reply(msg: { content: { toString: () => string; }; properties: { replyTo: any; correlationId: any; }; }) {
      var request = msg.content.toString();

      console.log(" [.] Processing: ", request);

      myQuery(request)
        .then((response) => {
          console.log(" [.] Response: ", response.toString());

          channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(response), {
              correlationId: msg.properties.correlationId
            });

          channel.ack(msg);
        })
        .catch((error) => {
          console.log(" [.] Error: ", error.toString());

          channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(error.toString()), {
              correlationId: msg.properties.correlationId
            });

          channel.ack(msg);
        });
    });
  });
});

const myQuery = async (item: any): Promise<any> =>{
  try{
    item = JSON.parse(item);
    const query = item.query;
    const data = item.data;

    let response: any = null;
    // let res: Response = {} as Response;
    // let req: Request = {} as Request;
    if(query === "testQueue"){
      sleep(60);
      response = {description: data, status_code: 200};
    }
    else if(query === "crear_tutoria"){
      console.log(" [.] Creando_tutoria");
      // req.body = data;
      // response = await crear_tutoria(req, res);
      response = await axios.post(`${urlApi}/crear`, data);
      if (response.status === 200) response = {description: response.data, status_code: 200};
    }
    else if(query === "actualizar_tutoria_c"){
      console.log(" [.] Actualizando_tutoria");
      response = await axios.put(`${urlApi}/actualizar`, data);
      if (response.status === 200) response = {description: response.data, status_code: 200};
    }
    else{
      response = {description: "Error! No se especifico la petición", status_code: 400};
    }

    const jsonMessage = JSON.stringify(response);
    const bufferMessage = Buffer.from(jsonMessage);
    
    return bufferMessage;
  }catch(e){
    try{
      console.log(" [.] Error")
      console.log(e)
      let errorAxios: any = e;
      let response = {description: errorAxios.response.data.description, status: errorAxios.response.data.status, status_code: 400};
  
      const jsonMessage = JSON.stringify(response);
      const bufferMessage = Buffer.from(jsonMessage);
      
      return bufferMessage;

    }catch(e){
      console.log(" [.] Error")
      console.log(e);
      let response = {description: "Error query", status: 400, status_code: 400};
      const jsonMessage = JSON.stringify(response);
      const bufferMessage = Buffer.from(jsonMessage);
      
      return bufferMessage;
      // throw new Error("Error");
    }
  }
};

const sleep = async (segundos: number): Promise<any> => {
  let limit: number  = segundos * 100000000;
  let cnt: number = 0;
  while(cnt < limit) cnt++;
}