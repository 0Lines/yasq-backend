const Jukebox = require('./Jukebox');

class Room { //TODO #IMPORTANT JUKEBOX DOES NOTHING WHEN SONG IS REMOVED
	id_room = "";
    jukebox = null;
	roomNotifier = null; //TODO #WEIRD_ROOM_VARIABLE

    constructor(id_room, roomNotifier) {
		this.id_room = id_room;
        this.jukebox = new Jukebox();
		this.roomNotifier = roomNotifier;
    }

	getCurrentState() {
		return {
			currentSongId: this.jukebox.currentSongId,
			isPlaying: this.jukebox.isPlaying,
			songElapsedTime: this.jukebox.getSongElapsedTime(),
		};
	}

	pauseJukebox() {
		const songTime = this.jukebox.pause();

		if(songTime != -1)
			this.notifyRoom("pause", songTime);
	}

	playJukebox() {
		const songTime = this.jukebox.play();

		if(songTime != -1)
			this.notifyRoom("play", songTime);
	}

	changeSongInJukebox(newSongId) {
		this.jukebox.changeSong(newSongId);
		this.notifyRoom("changeCurrentSong", newSongId);
	}

	notifyCurrentState() {
		this.notifyRoom("getCurrentState", this.getCurrentState());
	}

	notifyRoom(eventName, parameter) {
		this.roomNotifier.notifyRoom(this.id_room, eventName, parameter);
	}
}
  
module.exports = Room 