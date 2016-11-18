CREATE DATABASE inspire_db;
USE inspire_db;

/*CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	VARCHAR(?) username,
    VARCHAR(?) password,
    VARCHAR(254) email,
    DATETIME last_login,
    DATETIME data_created
	PRIMARY KEY (id)
);*/

CREATE TABLE users (
  id INTEGER(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL DEFAULT '',
  password VARCHAR(20) NOT NULL DEFAULT '',
  email VARCHAR(100) NOT NULL DEFAULT '',
  created DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id)
);

CREATE TABLE users_meta (
  meta_id INTEGER(11) NOT NULL AUTO_INCREMENT,
  user_id INTEGER(11) NOT NULL DEFAULT 0,
  favorite_podcast VARCHAR(225) NOT NULL DEFAULT '',
  favorite_videos VARCHAR(225) NOT NULL DEFAULT '',
  favorite_quotes VARCHAR(225) NOT NULL DEFAULT '',
  created DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (meta_id)
);