# What It Is
Room humidity and temperature visualization prototype app using Arduino and DHT22 (temperature and humidity sensor) which send the data to Node.js server via router and socket.io. On the client side the humidity data is visualized using a 2D physics engine called [Matter.js](https://brm.io/matter-js/) so that the particles are interactive and applied 2D physics.

[Example]: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/814c2024-5a90-415c-a12c-fe86a51e54b7/demo_humidity_matter.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210112T054423Z&X-Amz-Expires=86400&X-Amz-Signature=8c73b0174b277db20f63ea69474f7630d5e87664fcfdbb1a4fde5ef90ac98e3e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22demo_humidity_matter.gif%22 "Example Image"

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
