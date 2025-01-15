'use strict';
const WebSocket = require('ws');
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // bootstrap(/*{ strapi }*/) {},


  // bootstrap({ strapi }) {
  //   // Start the WebSocket server
  //   const wss = new WebSocket.Server({ port: 8080 });

  //   wss.on('connection', (ws) => {
  //     ws.on('message', (message) => {
  //       console.log('Received:', message);
  //       // Echo the message back to the client
  //       ws.send(`Server: ${message}`);
  //     });

  //     ws.send('Welcome to Aynas`s World!');
  //   });

  //   strapi.wss = wss; // Attaching the WebSocket server to the Strapi instance
  //   console.log('WebSocket server is running on ws://localhost:8080');
  // },
  bootstrap({ strapi }) {
    const wss = new WebSocket.Server({ noServer: true });

    // When a client connects
    wss.on('connection', (ws) => {
      console.log('New client connected');

      // When a message is received
      ws.on('message', (message) => {
        console.log('Received:', message);
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    const server = strapi.server.httpServer;
    
    // Integrate the WebSocket server with the existing HTTP server
    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    console.log('WebSocket server is running');
  },
};
