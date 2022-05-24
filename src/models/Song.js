class Song {
    id = "";
    name = "";
    artist = "";
    link = "";
    thumbnail = "";
    priority = 0;
    room = 0;

    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.artist = params.artist;
        this.link = params.link;
        this.thumbnail = params.thumbnail;
        this.priority = params.priority;
        this.room = params.room;
    }
}
  
module.exports = Song 
