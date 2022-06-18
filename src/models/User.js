class User {
    id_user = "";
    nickname = "";
    photo_link = "";
    id_room = "";

    constructor({ id_user, nickname, photo_link, id_room }) {
        this.id_user = id_user;
        this.nickname = nickname;
        this.photo_link = photo_link;
        this.id_room = id_room;
    }
}
  
module.exports = User
