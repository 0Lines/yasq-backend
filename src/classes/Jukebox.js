class Jukebox {
    currentSongId = "";
	isPlaying = false;
	startedAt = 0;
	stoppedAt = 0;

    constructor() {
        this.resetJukebox();
    }

	hasSong() {
		return this.currentSongId != "";
	}

	resetJukebox() {
		this.currentSongId = "";
		this.isPlaying = false;
		this.startedAt = 0;
		this.stoppedAt = 0;
	}

	getSongElapsedTime() {
		const songCurrentTime = this.isPlaying ? Date.now() : this.stoppedAt;
		return songCurrentTime - this.startedAt;
	}

	play() {
		if(!this.isPlaying) {
			const songElapsedTime = this.stoppedAt - this.startedAt;
			this.startedAt = Date.now() - songElapsedTime;
			this.isPlaying = true;

			return songElapsedTime;
		}
		return -1;
	}

	pause() {
		if(this.isPlaying) {
			this.stoppedAt = Date.now();
			this.isPlaying = false;

			return this.stoppedAt - this.startedAt;
		}

		return -1;
	}

	changeSong(newSongId) {
		this.resetJukebox();
		this.currentSongId = newSongId;
		this.play();
	}
}
  
module.exports = Jukebox 