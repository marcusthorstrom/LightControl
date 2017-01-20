var gpio = require("pi-gpio");
var sleep = require('sleep');

var exports = module.exports = {}

var on = "1111"
var off = "1110"
var one = "0111"
var two = "1011"
var three = "1101"
var four = "1110"
var pone = "10001110"
var pzero = "10001000"

function get_sequence(s) {
  var seq = ""
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '1') {
      seq += pone
    } else {
      seq += pzero
    }
  }
  return seq
}


exports.sendcommand = function (pin, group, socket, command, callback) {
  seq=""
  // Group
  switch (group) {
    case "A":
      seq += get_sequence(one)
      break;
    case "B":
      seq += get_sequence(two)
      break;
    case "C":
      seq += get_sequence(three)
      break;
    case "D":
      seq += get_sequence(four)
      break;
    default:
      break;
  }
  //Socket
  switch (socket) {
    case 1:
      seq += get_sequence(one)
      break;
    case 2:
      seq += get_sequence(two)
      break;
    case 3:
      seq += get_sequence(three)
      break;
    case 4:
      seq += get_sequence(four)
      break;
    default:
      break;
    }
    // Command
    if (command == "On") {
      seq += get_sequence(on)
    } else if (command == "Off") {
      seq += get_sequence(off)
    }

    gpio.open(pin, "output", function(err) {		// Open pin 16 for output
      console.log(seq);
      for (var repeat = 0; repeat < 10; repeat++) {
        for (var i = 0; i < seq.length; i++) {
            if (seq[i] == '1') {
              gpio.write(pin, 1);
            } else {
              gpio.write(pin, 0);
            }
            sleep.msleep(2)
        }
        // End sequence
        gpio.write(pin, 1)
        sleep.msleep(2)
        gpio.write(pin, 0)
        sleep.msleep(9)
      }
    });
    callback();
}
