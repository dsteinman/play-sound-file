const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');
const Volume = require("pcm-volume");
const EventEmitter = require("events");

async function playSoundFile(path, volume) {
	if (volume === 0) {
		console.log('volume', volume);
		return;
	}
	return new Promise((resolve, reject) => {
		try {
			const file = fs.createReadStream(path);
			const reader = new wav.Reader();
			reader.on('format', function (format) {
				const speaker = new Speaker(format);
				
				speaker.on('close', function () {
					resolve();
				});
				
				if (volume === null || typeof volume === 'undefined' || volume === 1) {
					reader.pipe(speaker);
				}
				else {
					const volumeStream = new Volume();
					volumeStream.setVolume(volume);
					volumeStream.pipe(speaker);
					reader.pipe(volumeStream);
				}
			});
			file.pipe(reader);
		}
		catch(e) {
			reject(e);
		}
	});
}

class SoundLoop extends EventEmitter {
	constructor(path, volume, autostart, num_times) {
		super();
		this.path = path;
		this.num_times = num_times;
		this.count = 0;
		this.setVolume(volume);
		if (autostart) this.start();
	}
	getVolume() {
		return this.volume;
	}
	setVolume(volume) {
		if (volume < 0) volume = 0;
		if (volume > 1) volume = 1;
		this.volume = volume;
	}
	
	start() {
		if (this.playing) return;
		this.count = 0;
		this.playing = true;
		this.loop();
	}
	
	async loop() {
		if (this.playing) {
			this.count++;
			this.emit('loop-begin');
			// todo: this isn't a seemless loop, need to create a buffer/stream
			await playSoundFile(this.path, this.volume);
			this.emit('loop-end');
			if (this.count >= this.num_times) {
				this.stop();
			}
			else {
				return this.loop(this.path, this.volume);
			}
		}
		else {
			this.stop();
		}
	}
	
	stop() {
		if (this.playing) {
			this.emit('stopped');
		}
		this.playing = false;
	}
}

function loopSoundFile(path, volume, autostart, num_times) {
	return new SoundLoop(path, volume, autostart, num_times);
}

module.exports = playSoundFile;

module.exports.loopSoundFile = loopSoundFile;

