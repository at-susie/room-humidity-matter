# What It Is
Room humidity and temperature visualization prototype app using Arduino and DHT22 (temperature and humidity sensor) which send the data to Node.js server via router and socket.io. On the client side the humidity data is visualized using a 2D physics engine called [Matter.js](https://brm.io/matter-js/) so that the particles are interactive and applied 2D physics.

# How It Works

## Arduino
### Circuit
Will come soon...

### Code
Configure your WiFi network in `arduino_secrets.h`.
```
#define SECRET_SSID "Your Router's SSID"
#define SECRET_PASS "Your Router's Password"
```
And enter your server address in `arduino_nodejs.ino`.
```
char serverAddress[] = "Your server address";
```

## Server
In 'package' directory
```
$ npm install
```
And then run the server
```
$ node index.js
```
And then you should be able to see the app from [http://localhost:8080](http://localhost:8080)
