BEGIN TRANSACTION;
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`email`	TEXT UNIQUE,
	`password`	TEXT,
	`role`	TEXT
);
DROP TABLE IF EXISTS `project_type`;
CREATE TABLE IF NOT EXISTS `project_type` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT
);
DROP TABLE IF EXISTS `project_position`;
CREATE TABLE IF NOT EXISTS `project_position` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT
);
DROP TABLE IF EXISTS `project_person`;
CREATE TABLE IF NOT EXISTS `project_person` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`person_id`	INTEGER,
	`project_position_id`	INTEGER
);
DROP TABLE IF EXISTS `project_file`;
CREATE TABLE IF NOT EXISTS `project_file` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT,
	`filename`	TEXT,
	`hash`	TEXT
);
DROP TABLE IF EXISTS `project_excercise`;
CREATE TABLE IF NOT EXISTS `project_excercise` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT
);
DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT,
	`project_type_id`	INTEGER,
	`department_id`	INTEGER,
	`project_excercise_id`	INTEGER,
	`state`	INTEGER,
	`year`	INTEGER
);
DROP TABLE IF EXISTS `person`;
CREATE TABLE IF NOT EXISTS `person` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`firstName`	TEXT,
	`lastName`	TEXT,
	`slug`	TEXT UNIQUE,
	`enrolledAt`	INTEGER,
	`department_id`	INTEGER NOT NULL,
	`user_id`	INTEGER,
	`phone`	TEXT,
	`email`	TEXT,
	`urlWeb`	TEXT,
	`urlFacebook`	TEXT,
	`isActiveStudent`	INTEGER,
	`isPublic`	INTEGER DEFAULT 0,
	`createdAt`	INTEGER,
	`updatedAt`	INTEGER
);
DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT,
	`acronym`	TEXT
);
COMMIT;
