const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('user connected via socket.io');
	
	socket.on('message', function(message){
		console.log('Message received:' + message.text);
		socket.broadcast.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application!'
	});
});
http.listen(port, function(){
	console.log('Server running! ' + port);
});

