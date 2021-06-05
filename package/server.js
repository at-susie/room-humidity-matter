var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var http = require('http').createServer(app);

var io = require('socket.io')(http);

// Send index.html page on GET /
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

// you need a  body parser:
app.use(bodyParser.urlencoded({ extended: false })); // for application/x-www-form-urlencoded

// this is the POST handler:
app.all('/*', function (request, response) {
	console.log('Got a ' + request.method + ' request');
	// the parameters of a GET request are passed in
	// request.body. Pass that to formatResponse()
	// for formatting:
	// console.log(request.headers);

	// Humidity
	const humidityOrigin = request.body.hum;

	// Temp
	const tempOrigin = request.body.temp;


	if (request.method == 'GET') {
		console.log(request.query);

	} else {
		console.log("Humidity is:" + humidityOrigin);
		console.log("Temp is:" + tempOrigin);
		io.emit('humidityLevel', humidityOrigin);
		io.emit('tempLevel', tempOrigin);
	}

	// send the response:
	response.send('OK');
	response.end();

});

// start the server:
http.listen(8080, () => {
	console.log('Hey now it is listening on *:8080');
});

