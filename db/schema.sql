CREATE database inspure_db;

USE inspire_db;

CREATE TABLE users(
id BIGINT NOT NULL AUTO_INCREMENT,
username VARCHAR(50),
password VARCHAR(50),
email VARCHAR(254),
data_created DATETIME,
PRIMARY KEY (id)
)

CREATE TABLE logins (
loginID BIGINT NOT NULL AUTO_INCREMENT,
userid BIGINT,
last_login DATETIME,
IP_ADDRESS VARCHAR(15),
PRIMARY KEY (loginID)
)