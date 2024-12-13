SHOW DATABASES;

show TABLES;

CREATE TABLE visitor(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    comment MEDIUMTEXT
);

DESC visitor;

INSERT INTO visitor(name, comment) VALUES('공민수', '덥다더워');
INSERT INTO visitor(name, comment) VALUES('심소영', '오늘 저녁뭐먹지');
INSERT INTO visitor VALUES(null, '홍길동', '으라차차');

SELECT * FROM visitor;

-- 데이터 수정
UPDATE visitor SET comment='야호' WHERE id=2;

-- 데이터 삭제
DELETE FROM visitor WHERE id=3;

-- my sql 사용자 생성
CREATE USER 'test'@'%' IDENTIFIED BY '0000';

-- 권한 부여
GRANT ALL PRIVILEGES ON *.* TO 'test'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES

SELECT * FROM mysql.user;

SHOW GRANTS FOR 'test'@'%';

ALTER USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY '0000';

CREATE DATABASE visitor;

USE visitor;
SHOW TABLES;
SELECT * FROM visitor;

