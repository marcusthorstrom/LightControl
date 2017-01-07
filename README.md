# LightControl

Testproject for contoling lights using 433 MHz transmitter from a RPi.


Transmitter:  [from Kjell](https://www.kjell.com/se/sortiment/el-verktyg/elektronik/fjarrstyrning/tx433n-sandarmodul-433-mhz-p88901) 

Reciever:     EMW200R from Clas Ohlson 



To get set up:
* Connect the Data of the transmitter to pin 5 (can be changed on line 51 of [this file](https://github.com/marcusthorstrom/LightControl/blob/master/main.js), by changing the 5 to a desired port).
* Get the repository using git
* run `npm install` to install dependencies 
* run `node main.js` to start the server (or use pm2 or some other manager to restart the server in case of power failure)
* Go to http://[server-ip]:3000 to access the control panel.

To change the lamps in the control panel:
* Find the channel and number of the lamps
* Go to [line 25](https://github.com/marcusthorstrom/LightControl/blob/master/AngularApp/angular.js) and enter the name, number and channel to edit the list.
* Then update the control panel. 

Since the 433 MHz frequency has no feedback, there is no way to tell if a lamp is on or off or if it recieved the command. To compensate for this, the command is sent 10 times with 0.009 delay each time.

Wishlist (TODO):
* Port the pythonscript to node using [pi-gipo](https://www.npmjs.com/package/pi-gpio)
* Add functionality to turn on/off all lamps, or add groups.
* Add timer functionality. 
