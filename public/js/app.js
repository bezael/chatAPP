let socket = io();
socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	console.log('New message:');
	console.log(message);
});

//Handles submitting of new message
let $form = jQuery('#message-form');
let $text = jQuery('#TxtMessage');
$form.on('submit', function(event){
	event.preventDefault();
	socket.emit('message',{
		//text: $form.find('input[name=TxtMessage]').val()
		text: $text.val()
	});
	$text.val('').focus();

});