var host = window.location.origin;
var socket = io.connect(host);
socket.on('connect', function(data) {
	console.log('Emit Hello');
	socket.emit('join', 'Hello World from client');
});