Async function for playing .wav files in NodeJS.

## Install

```
npm install play-sound-file
```

MacOSX users will also require the alternative mpg123 backend:

```
npm install speaker --mpg123-backend=openal
```

## Usage

```
playFile(path, volume);
```

- path = path ot the .wav file

- volume = volume to play at (0.0 to 1.0)

If the volume is 0, the file is not played.  If the volume is null or undefined it plays at max volume (1.0).

## Example

```
async function play() {
    const volume = 0.7;
	await playFile(__dirname + '/path/to/file.wav', volume);
}

play().then(r => {
	console.log('done');
});
```