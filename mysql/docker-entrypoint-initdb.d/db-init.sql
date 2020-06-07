CREATE DATABASE `php_app`;

CREATE TABLE `php_app`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `php_app`.`todos` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `create_date` DATETIME NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

ALTER TABLE
    `todos`
ADD
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `php_app`.`refresh_tokens` (
    `user_id` INT NOT NULL REFERENCES `php_app`.`users`(id), 
    `refresh_token` VARCHAR(255), 
    `expiration` VARCHAR(255) NULL,
    PRIMARY KEY(`user_id`, `refresh_token`)  
) ENGINE = InnoDB;