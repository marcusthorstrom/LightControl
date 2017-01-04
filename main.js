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

  if (!(chanel == ("A" || "B" || "C" || "D" ))) {
    res.status(400).send("Wrong chanel");
    return;
  }
  if (!(number == (1 || 2 || 3 || 4))) {
    res.status(400).send("Wrong number");
    return;
  }
  power = power.charAt(0).toUpperCase() + power.subStr(1).toLowerCase();
  if(!(power == ("On" || "Off"))) {
    res.status(400).send("Wrong power");
    return;
  }

  child_process.exec("python test.py 5 "+ chanel +" "+number+" "+power, function(error, stdout, stderr){
      if(!error) {
        res.status(200).send("it's "+power+"!");
      } else {
        console.log(error);
      }
  })

})
