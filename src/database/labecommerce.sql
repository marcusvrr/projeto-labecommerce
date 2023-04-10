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
-- Get All Users
-- retorna todos os usuários cadastrados
SELECT * FROM users;
-- Get All Products
-- retorna todos os produtos cadastrados
SELECT * FROM products;
-- Search Product by name
-- crie um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca
SELECT * FROM products
where name="cinto";
-- Create User
-- crie um novo usuário
-- insere o item mockado na tabela users
INSERT INTO users (id, email, password)
VALUES
("u004", "celio@email.com", "cr12345");
-- Create Product
-- crie um novo produto
-- insere o item mockado na tabela products
INSERT INTO products (id, name, price, category)
VALUES
("p006", "bermuda", 37, "roupas");
-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT *FROM users
ORDER BY email ASC;
-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

-- Get All Products versão 2
-- seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo definido em ordem crescente
select * from products
WHERE price BETWEEN 30.00 and 50.00
ORDER BY price ASC;