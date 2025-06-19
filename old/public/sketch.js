// Socket client end
var socket;
var socket2;

//universal variables
var winWidth;
var winHeight;
var soundInitialized = false;

//local storage
var r_current = 0;
var recieved_text = [];
var r_x = [];
var r_y = [];
var r_touched = [];
var r_trans = [];
var sounds = [];

var bubbleWidth = 300;
var bubbleHeight = 100;

function preload() {
  sounds[0] = loadSound('assets/recieve.mp3');
  sounds[0].setVolume(0.7);
  sounds[1] = loadSound('assets/send.mp3');
  sounds[1].setVolume(0.7);
}

function setup() {
  winWidth = windowWidth;
  winHeight = windowHeight;

  createCanvas(winWidth, winHeight);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://ec2-54-241-138-86.us-west-1.compute.amazonaws.com:9000');
  socket2 = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      if (data.testvar != undefined) {
        console.log(data.testvar);
        recieved_text[r_current] = data.testvar;
        r_trans[r_current] = 0;

        var data2 = {
          x: data.x,
          y: data.y,
          testvar: data.testvar
        };

        socket2.emit('mouse',data2);

        r_current++;

        if (soundInitialized == true) {
          sounds[0].play();
        }
        
      }
    }
  );

  soundInitialized = true;
  
}

function draw() {
  // Nothing
  background(220);
  noStroke();

  if(typeof recieved_text[0] !== 'undefined') {

      var step = 10;

      if (r_current > 25) {
        var limit = 0;
        
        if(winWidth >= 768) {
          limit = r_current - 26;
          for (i = limit + 1; i < r_current; i++) {
            
            if(r_touched[i] != true) {
              r_touched[i] = true
              r_x[i] = random(50, winWidth - bubbleWidth);
              r_y[i] = random(50, winHeight - bubbleHeight);
            }
            
            if(r_trans[i] < 200) {
              r_trans[i] += 10;
            }  
                  
            fill(0, 0, 0, r_trans[i]);
          
            rect(r_x[i], r_y[i], bubbleWidth, bubbleHeight);
          
            fill(255);
            textSize(14);
          
            if(recieved_text[i] != undefined) {
              text(recieved_text[i], r_x[i] + 10, r_y[i] + 10, bubbleWidth - 50, bubbleHeight - 50);
            }
     
            step += 110;
          }
        } else {
          limit = r_current - 5;
          for (i = r_current - 1; i > limit; i--) {
            
            if(r_touched[i] != true) {
              r_touched[i] = true
              r_x[i] = random(50, winWidth - bubbleWidth);
              r_y[i] = random(50, winHeight - bubbleHeight);
            }
            
            if(r_trans[i] < 200) {
              r_trans[i] += 10;
            }  
                  
            fill(0, 0, 0, r_trans[i]);
          
            rect(10, step, winWidth - 20, bubbleHeight);
          
            fill(255);
            textSize(14);
          
            if(recieved_text[i] != undefined) {
              text(recieved_text[i], 20, step + 10, winWidth - 30, bubbleHeight - 50);
            }
                    
            step += 110;
          }
        }

      } else {

        if(winWidth >= 768) {
          if (r_current - 25 < 1) {
            limit = -1;
          } else {
            limit = r_current - 26;
          }

          for (i = limit + 1; i < r_current; i++) {
            
            if(r_touched[i] != true) {
              r_touched[i] = true
              r_x[i] = random(50, winWidth - bubbleWidth);
              r_y[i] = random(50, winHeight - bubbleHeight);
            }
            
            if(r_trans[i] < 200) {
              r_trans[i] += 10;
            }  
                  
            fill(0, 0, 0, r_trans[i]);
          
            rect(r_x[i], r_y[i], bubbleWidth, bubbleHeight);
          
            fill(255);
            textSize(14);
          
            if(recieved_text[i] != undefined) {
              text(recieved_text[i], r_x[i] + 10, r_y[i] + 10, bubbleWidth - 50, bubbleHeight - 50);
            }
          
            step += 110;
          }
        } else {
          if (r_current - 4 < 1) {
            limit = -1;
          } else {
            limit = r_current - 5;
          }

          for (i = r_current - 1; i > limit; i--) {
            
            if(r_touched[i] != true) {
              r_touched[i] = true
              r_x[i] = random(50, winWidth - bubbleWidth);
              r_y[i] = random(50, winHeight - bubbleHeight);
            }
            
            if(r_trans[i] < 200) {
              r_trans[i] += 10;
            }  
                  
            fill(0, 0, 0, r_trans[i]);
          
            rect(10, step, winWidth - 20, bubbleHeight);
          
            fill(255);
            textSize(14);
          
            if(recieved_text[i] != undefined) {
              text(recieved_text[i], 20, step + 10, winWidth - 30, bubbleHeight - 50);
            }
          
            step += 110;
          }

        }

        
      }

  }


  

}

// function mouseDragged() {
 
// }

function windowResized() {
  winWidth = windowWidth;
  winHeight = windowHeight;
  resizeCanvas(winWidth, winHeight);
}

function keyPressed() {
  if(keyCode == ENTER) {
    sendmouse();
  }
}

// Function for sending to the socket
function sendmouse() {

  if(confInput.value() != "") {
    // Make a little object with  and y
    var data = {
      x: mouseX,
      y: mouseY,
      testvar: confInput.value()
    };

    // Send that object to the socket
    socket.emit('mouse',data);
    socket2.emit('mouse',data);
    confInput.value('');
    recieved_text[r_current] = data.testvar;
    r_trans[r_current] = 0;
    r_current++;
    sounds[1].play();
  } else {
    alert("Confession cannot be blank :(")
  }
  
}

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
