let name = getQueryVariable('name') || 'Anonymous';
let room = getQueryVariable('room');
let socket = io();
jQuery('#room-title').text(room);

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom',{
		name:name,
		room:room
	});
});

socket.on('message', function(message){
	let momentTimestamp = moment.utc(message.timestamp);
	let $message = jQuery('.message');
	$message.append(`<p><strong>${message.name} ${momentTimestamp.local().format('h:mm a')}</strong></p>`);
	$message.append(`<p>${message.text}</p>`);
});

//Handles submitting of new message
let $form = jQuery('#message-form');
let $text = jQuery('#TxtMessage');


$form.on('submit', function(event){
	event.preventDefault();
	socket.emit('message',{
		name: name,
		text: $text.val()
	});
	$text.val('').focus();

});