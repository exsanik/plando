CREATE DATABASE `php_app`;

CREATE TABLE `refresh_tokens` (
    `user_id` int(11) NOT NULL,
    `refresh_token` varchar(255) NOT NULL,
    `expiration` varchar(255) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `todos` (
    `id` int(11) NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `user_id` int(11) NOT NULL,
    `assigned_users` json NOT NULL,
    `is_done` tinyint(1) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    `expire_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `todo_user` (
    `user_id` int(11) NOT NULL,
    `todo_id` int(11) NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

--
-- PRIMARY KEY
--
ALTER TABLE
    `refresh_tokens`
ADD
    PRIMARY KEY (`user_id`, `refresh_token`);

ALTER TABLE
    `todos`
ADD
    PRIMARY KEY (`id`);

ALTER TABLE
    `todo_user`
ADD
    KEY `todo_id` (`todo_id`),
ADD
    KEY `user_id` (`user_id`);

ALTER TABLE
    `users`
ADD
    PRIMARY KEY (`id`);

--
-- AUTO INCREMENT
--
ALTER TABLE
    `todos`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 28;

ALTER TABLE
    `users`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 105;

--
-- FOREIGN KEY
--
ALTER TABLE
    `refresh_tokens`
ADD
    CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE
    `todo_user`
ADD
    CONSTRAINT `todo_user_ibfk_1` FOREIGN KEY (`todo_id`) REFERENCES `todos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `todo_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;