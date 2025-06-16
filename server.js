var express = require('express');
// Create the app
var app = express();


//storage
var r_storage = [];
var mx = [];
var my = [];
var r_len = 1;

var server = app.listen(process.env.PORT || 3000, listen);

app.use(express.static('public'));

var io = require('socket.io')(server);

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
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
