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

DROP TABLE users;

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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
    );
--   A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 1 para true.
-- Os pedidos começam com paid valendo 0 (você irá definir isso quando for popular a tabela com o INSERT).

-- A coluna delivered_at será utilizada para gerenciar a data de entrega do pedido. Ela é opcional, porque sempre começará sem valor ao criar um pedido, ou seja, null.
-- O SQLite recomenda utilizar TEXT para lidar com strings no formato ISO8601 "aaaa-mm-dd hh:mm:sss". Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.
-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.

DROP TABLE purchases;
INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("c001", 82, 0, "u001"),
("c002", 125, 0, "u002"),
("c003", 96, 0, "u003"),
("c004", 43, 0, "u004");
INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("c005", 15, 0, "u001"),
("c006", 56, 0, "u002");

-- Edite o status da data de entrega de um pedido
-- Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).
UPDATE purchases
SET delivered_at = datetime('now','localtime')
WHERE id= "c001";
UPDATE purchases
SET delivered_at = datetime('now','localtime')
WHERE id IN("c003","c004");

SELECT * FROM purchases;
-- Exercício 3
-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
-- Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.

SELECT * FROM users
INNER JOIN purchases
ON users.id=purchases.buyer_id
WHERE users.id="u002";

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('c001','p003',1),
('c001','p004',1),
('c002','p002',2),
('c002','p005',1);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;
