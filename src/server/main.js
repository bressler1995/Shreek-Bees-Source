import express from "express";
import ViteExpress from "vite-express";
import http from 'http';
import https from 'https';
import fs from 'fs';
import { Server } from 'socket.io';

let httpsOptions;
const certPath = 'fullchain.pem';
const keyPath = 'privkey.pem';
const mode = "development";
const app = express();

const messages = [];

const initializeSocketServer = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
  console.log(io)
  io.on('connection', (socket) => {
    console.log(socket.id + ' has connected.');

    if(messages != null && messages.length > 0) {
      for(let i = 0; i < messages.length; i++) {
        const payload = messages[i];
        io.to(socket.id).emit('all', JSON.stringify(payload));
      }
    }

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', (payload) => {
      const parsedPayload = JSON.parse(payload);
      console.log(parsedPayload);
      messages.push(parsedPayload);
      console.log('Emitting message to other clients');
      socket.broadcast.emit('message', payload);
    });
  });
}

try {
  ViteExpress.config({
    mode: mode
  });

  httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
  };

  console.log("Successfully read SSL certificate files.");
} catch (error) {
  console.error("FATAL ERROR reading SSL certificate files:", error);
  console.error(`Please ensure certificate files exist at ${certPath} and ${keyPath} and that the node process has read permissions.`);
  // Exit or prevent server start if certs are missing/unreadable
  process.exit(1);
}

if(mode == "production") {
  const server = https.createServer(httpsOptions, app);
  server.listen(3000, () => {
    console.log('Production listening on port 3000...');
  });

  initializeSocketServer(server);
} else if(mode == "development") {
  const server = ViteExpress.listen(app, 3000, () => {
    console.log('Dev listening on port 3000...');
  });

  initializeSocketServer(server);
}