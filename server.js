//hardware controls
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var pushButton = new Gpio(17, 'in', 'both');
var printer = require('printer');

//server on the fly
var express = require('express');
// Create the app
var app = express();


//storage
var r_storage = [];
var mx = [];
var my = [];
var r_len = 1;

var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

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

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  
  if (value == 0) {
	  console.log("Switch Off");
  } else if(value == 1) {
	  if(r_storage[0] != undefined) {
		  var looprand = Math.floor(Math.random() * r_len);
		  var retrieved = r_storage[looprand];
		  console.log("Random Confession: " + retrieved);
		  getPrint(retrieved);
	  }
	  
  }
  
  LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

function getPrint(confession) {
	printer.printDirect({data: confession + "\n\r\n\r\n\r\n\r\n\r\n\r" // or simple String: "some text"
	//, printer:'Foxit Reader PDF Printer' // printer name, if missing then will print to default printer
	, type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
	, success:function(jobID){
		console.log("sent to printer with ID: "+jobID);
	}
	, error:function(err){console.log(err);}
});
}

function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c 
