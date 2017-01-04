var express = require('express')
const child_process = require('child_process')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post("/:chanel/:number/:power", function (req, res) {
  var chanel = req.params.chanel;
  var number = req.params.number;
  var power = req.params.power;
  console.log("chanel: ", chanel);
  console.log("number: ", number);
  console.log("power: ", power);

  child_process.exec("python test.py 5 "+ chanel +" "+number+" "+power, function(error, stdout, stderr){
      if(!error) {
        res.status(200);
      } else {
        console.log(error);
      }
  })

})
