class User {
    id = "";
    firstname = "";
    lastname = "";
    profilesrc = "";

    constructor(params) {
        this.id = params.id;
        this.firstname = params.firstname;
        this.lastname = params.lastname;
        this.profilesrc = params.profilesrc;
    }
}
  
module.exports = User
