const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const http = require('http').Server(app);
let io = require('socket.io')(http);
let moment = require('moment');
app.use(express.static(__dirname + '/public'));
let clientInfo = {};

io.on('connection', function(socket){
	//console.log('user connected via socket.io');
	socket.on('joinRoom', function(req){
		clientInfo[socket.id]=req;
		
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name:'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});
	socket.on('message', function(message){
		//console.log('Message received:' + message.text);
		message.timestamp = moment().valueOf()
		io.to(clientInfo[socket.id].room).emit('message',message);
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment.valueOf()
	});
});
http.listen(port, function(){
	console.log('Server running! ' + port);
});