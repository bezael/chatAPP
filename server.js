const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const http = require('http').Server(app);
let io = require('socket.io')(http);
let moment = require('moment');
app.use(express.static(__dirname + '/public'));
let clientInfo = {};

// Sends current users to provided socket
function sendCurrentUsers(socket){
	var info = clientInfo[socket.id];
	var users =[];

	if(typeof info === 'undefined'){
		return; 
	}

	Object.keys(clientInfo).forEach(function(socketId){
		let userInfo = clientInfo[socketId];		
		
		if(info.room === userInfo.room){
			users.push(userInfo.name);
		}
	});
	socket.emit('message', {	
		name: 'System',
		text: 'Current users :' + users.join(', '),
		timestamp: moment().valueOf()
	});
}


io.on('connection', function(socket){
	//console.log('user connected via socket.io');
	socket.on('disconnect', function(){
		let userData = clientInfo[socket.id];

		if(typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name:'System',
				text:userData.name + ' has left!',
				timestamp: moment().valueOf()
			});
		}
		delete userData;
	});
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
		if(message.text === '@currentUsers'){
			sendCurrentUsers(socket);
		}else{
			message.timestamp = moment().valueOf()
			io.to(clientInfo[socket.id].room).emit('message', message);
		}		
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});
http.listen(port, function(){
	console.log('Server running! ' + port);
});