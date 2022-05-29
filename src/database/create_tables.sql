CREATE TABLE Users (
  id_user VARCHAR(50) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  photo_link VARCHAR(150),
  id_room VARCHAR(50) NOT NULL REFERENCES Rooms(id_room) ON DELETE CASCADE,
  PRIMARY KEY (id_user)
);

CREATE TABLE Rooms (
  id_room VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_room)
);

CREATE TABLE Songs (
  id_music VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  artist VARCHAR(50),
  music_link VARCHAR(300) NOT NULL,
  thumbnail_link VARCHAR(300),
  priority INT NOT NULL,
  id_room VARCHAR(50) NOT NULL REFERENCES Rooms(id_room) ON DELETE CASCADE,
  PRIMARY KEY (id_music)
);
