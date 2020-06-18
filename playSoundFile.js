const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');
const Volume = require("pcm-volume");

async function playSoundFile(path, volume) {
	if (volume === 0) return;
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

module.exports = playSoundFile;