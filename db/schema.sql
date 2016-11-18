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
BIGINT id,
VARCHAR(?) username,
VARCHAR(?) password,
VARCHAR(254) email,
DATETIME data_created
);

CREATE TABLE logins (
BIGINT loginid
BIGINT userid
DATETIME last_login,
VARCHAR(15) IP_ADRESS
...
)