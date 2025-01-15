const WebSocket = require('ws');

module.exports = strapi => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log('Received:', message);
      // Echo the message back to the client
      ws.send(`Server: ${message}`);
    });

    ws.send('Welcome to the Ayna`s World!');
  });

  strapi.wss = wss;
};
