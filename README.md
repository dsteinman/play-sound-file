Async function for playing .wav files in NodeJS.

## Install

```
npm install play-sound-file --mpg123-backend=openal
```

Any package which requires this module will have to apply the `mpg123-backend` option during `npm install`.

```
npm install --mpg123-backend=openal
```

## Usage (Play)

```
const playSoundFile = require('play-sound-file');
```

```
playFile(path, volume);
```

- path = path ot the .wav file

- volume = volume to play at (0.0 to 1.0)

If the volume is 0, the file is not played.  If the volume is null or undefined it plays at max volume (1.0).

#### Play Example

```
async function play() {
    const volume = 0.7;
	await playFile(__dirname + '/path/to/file.wav', volume);
}

play().then(r => {
	console.log('done');
});
```

## Usage (Loop)

```
const {loopSoundFile} = require('play-sound-file');
```

```
const player = loopSoundFile(path, volume);
```

- player.on('loop-begin') = is emitted when the file begins playing

- player.on('loop-end') = is emitted when the file has finished playing

- player.setVolume(volume) = sets the volume for the next loop

- player.getVolume() = returns the volume

- player.stop() = stops playing

- player.start() = start playing

- volume = volume to play at (0.0 to 1.0)

If the volume is 0, the file is not played.  If the volume is null or undefined it plays at max volume (1.0).

#### Loop Example

```
async function play() {
    const volume = 0.7;
	await playFile(__dirname + '/path/to/file.wav', volume);
}

play().then(r => {
	console.log('done');
});
```