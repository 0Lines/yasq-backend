class Song {
    id_song = "";
    name = "";
    artist = "";
    videoid = "";
    music_link  = "";
    thumbnail_link = "";
    priority = 0;
    id_room = "";

    constructor({ id_song, name, artist, videoid, music_link, thumbnail_link, priority, id_room }) {
        this.id_song = id_song;
        this.name = name;
        this.artist = artist;
        this.videoid = videoid;
        this.music_link = music_link;
        this.thumbnail_link = thumbnail_link;
        this.priority = priority;
        this.id_room = id_room;
    }
}
  
module.exports = Song 
