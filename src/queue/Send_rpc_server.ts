var amqp = require('amqplib/callback_api');

const urlQueue = '127.0.0.1';
const idQueue = 'tutorias_rpc_queue'

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

      const response = await f(request);

      console.log(" [.] Response: ", response.toString());

      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(response), {
          correlationId: msg.properties.correlationId
        });

      channel.ack(msg);
    });
  });
});

const f = async (item: any): Promise<any> =>{
  // TODO: Procesar la solicitud
  try{
    item = JSON.parse(item);
    const query = item.query;
    const data = item.data;

    let reponse = {msg: data, status_code: 500};
    if(query === "testQueue"){
      reponse = {msg: data, status_code: 200};
    }
    //
    const jsonMessage = JSON.stringify(reponse);
    const bufferMessage = Buffer.from(jsonMessage);
    return bufferMessage;
  }catch(e){
    console.log(e);
  }
};