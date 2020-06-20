const {loopSoundFile} = require('../');

const player = loopSoundFile('./test.wav', 0, true);

let count = 0;

player.on('loop-begin', function() {
	console.log('begin');
});
player.on('loop-end', function() {
	console.log('end');
	count++;
	
	let newVolume = player.getVolume() + 0.1;
	player.setVolume(newVolume);
	
	console.log('newVolume = ', newVolume);
	
	if (count === 10) {
		player.stop();
	}
});