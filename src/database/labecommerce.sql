-- Active: 1681094450959@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
("u001", "marcus@email.com", "mv12345"),
("u002", "rodrigo@email.com", "rs12345"),
("u003", "paula@email.com", "pr12345");

CREATE TABLE products (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT NOT NULL,
    price REAL NOT NULL,
	category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("p001", "camiseta", 28, "roupas"),
("p002", "calça", 55, "roupas"),
("p003", "cinto", 41, "acessorios"),
("p004", "chapeu", 41, "acessorios"),
("p005", "meia", 15, "roupas");

DROP TABLE products;