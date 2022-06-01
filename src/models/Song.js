class Song {
    id = "";
    name = "";
    artist = "";
    music_link  = "";
    thumbnail_link = "";
    priority = 0;
    room = "";

    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.artist = params.artist;
        this.music_link = params.music_link;
        this.thumbnail_link = params.thumbnail_link;
        this.priority = params.priority;
        this.room = params.room;
    }
}
  
module.exports = Song 
