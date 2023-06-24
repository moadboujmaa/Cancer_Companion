-- Active: 1680457452353@@127.0.0.1@3306
UPDATE mysql.user SET authentication_string = PASSWORD('moad1234') WHERE User = 'root';
FLUSH PRIVILEGES;
