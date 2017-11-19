let socket = io();
socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	console.log('New message:');
	console.log(message);
	jQuery('.message').append(`<p>${message.text}</p>`);
});

//Handles submitting of new message
let $form = jQuery('#message-form');
let $text = jQuery('#TxtMessage');
$form.on('submit', function(event){
	event.preventDefault();
	socket.emit('message',{
		text: $text.val()
	});
	$text.val('').focus();

});