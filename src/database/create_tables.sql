CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS Rooms;
CREATE TABLE IF NOT EXISTS Rooms (
  id_room VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_room)
);

DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (
  id_user VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
  nickname VARCHAR(50) NOT NULL,
  photo_link VARCHAR(150),
  id_room VARCHAR(50) REFERENCES Rooms(id_room) ON DELETE CASCADE,
  PRIMARY KEY (id_user)
);

DROP TABLE IF EXISTS Songs;
CREATE TABLE IF NOT EXISTS Songs (
  id_song VARCHAR(50) NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  artist VARCHAR(50),
  music_link VARCHAR(300) NOT NULL,
  thumbnail_link VARCHAR(300),
  priority INT NOT NULL,
  id_room VARCHAR(50) NOT NULL REFERENCES Rooms(id_room) ON DELETE CASCADE,
  PRIMARY KEY (id_song)
);
