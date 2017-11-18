const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const http = require('http').Server(app);


app.use(express.static(__dirname + '/public'));
http.listen(port, function(){
	console.log('Server running! ' +port);
});