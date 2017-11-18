const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

io.on('connection', function(){
	console.log('user connected via socket.io');
});
http.listen(port, function(){
	console.log('Server running! ' +port);
});

