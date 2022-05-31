class User {
    id = "";
    nickname = "";
    photo_link = "";
    id_room = "";

    constructor(params) {
        this.id_user = params.id_user;
        this.nickname = params.nickname;
        this.photo_link = params.photo_link;
        this.id_room = params.id_room;
    }
}
  
module.exports = User
