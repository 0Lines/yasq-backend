class Song {
    id_song = "";
    name = "";
    artist = "";
    videoid = "";
    music_link  = "";
    thumbnail_link = "";
    priority = 0;
    id_room = "";

    constructor(params) {
        this.id_song = params.id_song;
        this.name = params.name;
        this.artist = params.artist;
        this.videoid = params.videoid;
        this.music_link = params.music_link;
        this.thumbnail_link = params.thumbnail_link;
        this.priority = params.priority;
        this.id_room = params.id_room;
    }
}
  
module.exports = Song 
