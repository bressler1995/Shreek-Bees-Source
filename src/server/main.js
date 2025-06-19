import express from "express";
import ViteExpress from "vite-express";
import https from 'https';
import fs from 'fs';

let httpsOptions;
const certPath = 'fullchain.pem';
const keyPath = 'privkey.pem';
const mode = "development";
const app = express();

const messages = [];

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
  https.createServer(httpsOptions, app).listen(3000, () => {
    console.log('Production listening on port 3000...');
  });
} else {
  ViteExpress.listen(app, 3000, () => {
    console.log('Dev listening on port 3000...');
  });
}