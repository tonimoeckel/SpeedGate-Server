
var socket = io.connect('http://localhost:3000');
socket.on('connect', function(data) {
	console.log('Emit Hello');
	socket.emit('join', 'Hello World from client');
});