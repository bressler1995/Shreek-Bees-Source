import express from "express";
import ViteExpress from "vite-express";
import WebSocket, { WebSocketServer } from 'ws';
import https from 'https';
import fs from 'fs';

let httpsOptions;
const certPath = 'fullchain.pem';
const keyPath = 'privkey.pem';
const mode = "development";
const app = express();

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

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

if(mode == "production") {
  const server = https.createServer(httpsOptions, app);
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected (production)');
    ws.on('message', (message) => {
      console.log('Received:', message.toString());
      ws.send('Echo: ' + message);
    });
  });

  server.listen(3000, () => {
    console.log('Production listening on port 3000...');
  });
} else if(mode == "development") {
  const server = ViteExpress.listen(app, 3000, () => {
    console.log('Dev listening on port 3000...');
  });
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected (dev)');
    ws.on('message', (message) => {
      console.log('Received:', message.toString());
      ws.send('Echo: ' + message);
    });
  });
}