import express from 'express';
import { Server } from "socket.io";

const app = express()
const io = new Server(server);
let r_storage = [];
let mx = [];
let my = [];
let r_len = 1;

const server = app.listen(process.env.PORT || 3000, listen);

app.use(express.static('public'));


io.sockets.on('connection',
// We are given a websocket object in our function
function (socket) {

  console.log("New Receiver: " + socket.id);
  
  // When this user emits, client side: socket.emit('otherevent',some data);
  socket.on('mouse',
    function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Receiver Data: 'mouse' " + data.x + " " + data.y + " " + data.testvar);
        r_storage[r_len - 1] = data.testvar;
        mx[r_len - 1] = data.x;
        my[r_len - 1] = data.y;
        r_len++;

        // Send it to all other clients
        socket.broadcast.emit('mouse', data);

    });
    
    socket.on('disconnect', function() {
        console.log("Client has disconnected");
    });
    }
);

// This call back just tells us that the server has started
function listen() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
