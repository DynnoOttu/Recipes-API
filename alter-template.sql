-- Active: 1676718221634@@127.0.0.1@5432@recipes@public

-- change column type

ALTER TABLE users ALTER COLUMN id TYPE integer;

-- change column name

ALTER TABLE users RENAME COLUMN id TO id;

-- Change column comment

COMMENT ON COLUMN users.id IS 'comment';

SELECT * FROM users;

INSERT INTO
    users(name, email, phone, password)
VALUES (
        'Agung',
        'agung@gmail.com',
        '029348449',
        '12345'
    );

CREATE TABLE
    recipes(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingradients TEXT NOT NULL,
        photo VARCHAR,
        created_at TIMESTAMP NOT NULL,
        users_id INT REFERENCES users(id)
    );

ALTER TABLE users ADD PRIMARY KEY(id);

SELECT * FROM recipes;

SELECT * FROM category;

CREATE TABLE category(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

INSERT INTO category(name) VALUES('desserts');

SELECT * FROM category;

ALTER TABLE recipes ADD category_id INT;

ALTER TABLE recipes
add
    Foreign Key (category_id) REFERENCES category(id);

ALTER TABLE recipes ADD slug VARCHAR;

ALTER TABLE recipes add deleted_at TIMESTAMP DEFAULT NULL;

SELECT * FROM recipes LIMIT 2 OFFSET 3;

CREATE TABLE
    users(
        id VARCHAR PRIMARY KEY,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        fullname VARCHAR,
        photo VARCHAR,
        verif INT DEFAULT 0,
        OTP VARCHAR,
        created_at TIMESTAMP
    );

INSERT INTO
    users(id, email, password, fullname)
VALUES (
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        'michelle@gmail.com',
        '12345',
        'michelle pau gie'
    );

ALTER TABLE recipes add users_id VARCHAR;

ALTER TABLE recipes ADD FOREIGN KEY (users_id) REFERENCES users(id);

SELECT * FROM users;

SELECT * FROM category;

SELECT * FROM recipes 