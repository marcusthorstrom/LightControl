var express = require('express')
var path = require('path')
const child_process = require('child_process')
var app = express()

app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/angularApp', express.static(__dirname + '/AngularApp'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));




app.get('/', function (req, res) {
  res.sendFile(__dirname+"/AngularApp/index.html")
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post("/:channel/:number/:power", function (req, res) {

  var chanel = req.params.channel.toUpperCase();
  var number = req.params.number;
  var power = req.params.power;
  console.log("channel: ", channel);
  console.log("number: ", number);
  console.log("power: ", power);

  if (0) {
    console.log("0 is true");
  }

  if (["A", "B", "C", "D"].indexOf(channel) == -1) {
    res.status(400).send("Wrong channel");
    return;
  }
  if (["1", "2", "3", "4"].indexOf(number) == -1) {
    res.status(400).send("Wrong number");
    return;
  }
  power = power.charAt(0).toUpperCase() + power.substring(1).toLowerCase();

console.log("Powr:",power);

  if(["On", "Off"].indexOf(power) == -1) {
    res.status(400).send("Wrong power");
    return;
  }

  child_process.exec("python test.py 5 "+ channel +" "+number+" "+power, function(error, stdout, stderr){
      if(!error) {
        res.status(200).send("it's "+power+"!");
        return;
      } else {
        console.log(error);
        res.status(500).send("Error at server "+ error);
        return;
      }
  })

})
