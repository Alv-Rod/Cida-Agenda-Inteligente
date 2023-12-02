CREATE DATABASE IF NOT EXISTS agenda;

CREATE TABLE IF NOT EXISTS events_table (
	eventId INT PRIMARY KEY AUTO_INCREMENT,
    eventName VARCHAR(60) NOT NULL,
    eventDay DATE NOT NULL,
    eventDescription VARCHAR(255),
    eventStart TIME,
    eventEnd TIME,
    eventIsAllDay BOOL,
    eventType VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS user_table (
	userId INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(60) NOT NULL,
    userEmail VARCHAR(255) NOT NULL
);