ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE SCHEMA IF NOT EXISTS `trelloclone`;

USE trelloclone;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `bio` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ;

CREATE TABLE IF NOT EXISTS `teams` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`team_id`)
) ;


CREATE TABLE IF NOT EXISTS `users_teams` (
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `user_role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`team_id`),
  KEY `fk_userteams_team_idx` (`team_id`),
  CONSTRAINT `fk_userteams_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`),
  CONSTRAINT `fk_userteams_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ;

CREATE TABLE IF NOT EXISTS `board` (
  `board_id` int(11) NOT NULL AUTO_INCREMENT,
  `board_name` varchar(45) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `is_private` int(11) NOT NULL,
  PRIMARY KEY (`board_id`),
  CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `list` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `list_name` varchar(45) NOT NULL,
  `board_id` int(11) NOT NULL,
  `order_in_board` int(11) NOT NULL,
  PRIMARY KEY (`list_id`),
  CONSTRAINT `fk_board_id` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
);

CREATE TABLE IF NOT EXISTS `card` (
  `card_id` int(11) NOT NULL AUTO_INCREMENT,
  `card_name` varchar(45) NOT NULL,
  `list_id` int(11) NOT NULL,
  `order_in_list` int(11) NOT NULL,
  `description` text NOT NULL,
  `due_date` date,
  PRIMARY KEY (`card_id`),
  CONSTRAINT `fk_list_id` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`)
);

CREATE TABLE IF NOT EXISTS `checklist` (
  `checklist_id` int(11) NOT NULL AUTO_INCREMENT,
  `checklist_name` varchar(45) NOT NULL,
  `card_id` int(11) NOT NULL,
  PRIMARY KEY (`checklist_id`),
  CONSTRAINT `fk_card_id` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`)
);

CREATE TABLE IF NOT EXISTS `checklist_item` (
  `checklist_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `checklist_item_description`  text NOT NULL,
  `checklist_id` int(11) NOT NULL,
  `is_completed` int(11) NOT NULL,
  PRIMARY KEY (`checklist_item_id`),
  CONSTRAINT `fk_checklist_id` FOREIGN KEY (`checklist_id`) REFERENCES `checklist` (`checklist_id`)
);