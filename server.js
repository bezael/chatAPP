const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const http = require('http').Server(app);
let io = require('socket.io')(http);
let moment = require('moment');
//let now = moment();
//let timestamp = now.valueOf();
//let timestampMoment = moment.utc(timestamp);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	//console.log('user connected via socket.io');
	
	socket.on('message', function(message){
		//console.log('Message received:' + message.text);
		message.timestamp = moment().valueOf()
		io.emit('message',message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application!',
		timestamp: moment.valueOf()
	});
});
http.listen(port, function(){
	console.log('Server running! ' + port);
});