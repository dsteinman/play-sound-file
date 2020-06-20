/*
DOESN'T WORK
 */

const playSoundFile = require('../');
const {loopSoundFile} = playSoundFile;

const player = loopSoundFile('./test.wav', 0.5);

let count = 0;

player.on('loop-begin', function() {
	console.log('volume = ', player.getVolume());
});

player.on('loop-end', function() {
	count++;
	
	// increase the volume every loop
	let newVolume = player.getVolume() + 0.1;
	player.setVolume(newVolume);
	
	if (count >= 5) {
		player.stop();
	}
});

function looper() {
	console.log('starting');
	player.setVolume(0.5);
	player.start();
	player.once('stopped', function() {
		count = 0;
		console.log('stopped');
		// wait 5 seconds and start again
		setTimeout(function() {
			looper();
		},5000);
	});
}

looper()

setInterval(function() {
	playSoundFile('./test2.wav');
},10000);