-- Adminer 4.2.4 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DELIMITER ;;

DROP FUNCTION IF EXISTS `civicrm_strip_non_numeric`;;
CREATE DEFINER=`eternity-civicrm`@`localhost` FUNCTION `civicrm_strip_non_numeric`(`input` VARCHAR(255) CHARACTER SET utf8) RETURNS varchar(255) CHARSET utf8
    NO SQL
    DETERMINISTIC
BEGIN
      DECLARE output   VARCHAR(255) CHARACTER SET utf8 DEFAULT '';
      DECLARE iterator INT          DEFAULT 1;
      WHILE iterator < (LENGTH(input) + 1) DO
        IF SUBSTRING(input, iterator, 1) IN ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9') THEN
          SET output = CONCAT(output, SUBSTRING(input, iterator, 1));
        END IF;
        SET iterator = iterator + 1;
      END WHILE;
      RETURN output;
    END;;

DELIMITER ;

-- 2017-07-07 21:23:17
