let socket = io();
socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	//let now = moment();
	//let timestamp = now.valueOf();
	let momentTimestamp = moment.utc(message.timestamp);
		//timestamp = timestampMoment.local().format('h:mm a');


	jQuery('.message').append(`<p>${message.text} :<strong>${momentTimestamp.local().format('h:mm a')}</strong></p>`);
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