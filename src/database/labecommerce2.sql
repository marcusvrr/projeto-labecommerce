-- Active: 1681592554878@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

DROP TABLE products;

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        paid INTEGER NOT NULL DEFAULT (0),
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

DROP TABLE purchases;

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT (1),
        FOREIGN KEY (purchase_id) REFERENCES purchases (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

DROP TABLE purchases_products;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Fulano da Silva",
        "fulano@email.com",
        "fs12345"
    ), (
        "u002",
        "Marcus Rodrigues",
        "marcus@email.com",
        "mr12345"
    ), (
        "u003",
        "Rodrigo Santos",
        "rodrigo@email.com",
        "rs12345"
    );

SELECT * FROM users;

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "p001",
        "camiseta",
        28,
        "roupas",
        "camiseta.png"
    ), (
        "p002",
        "calça",
        55,
        "roupas",
        "calça.png"
    ), (
        "p003",
        "cinto",
        41,
        "acessorios",
        "cinto.png"
    ), (
        "p004",
        "chapeu",
        41,
        "acessorios",
        "chapeu.png"
    ), (
        "p005",
        "meia",
        15,
        "roupas",
        "meia.png"
    );

SELECT * FROM products;

INSERT INTO users (id,name, email, password)
VALUES
("u004", "Celio Rodrigues", "celio@email.com", "cr12345");

INSERT INTO products (id, name, price, description, image_url)
VALUES
("p006", "bermuda", 37, "roupas", "bermuda.png");

INSERT INTO purchases (id, buyer, total_price)
VALUES
("c001","u001", 82 ),
("c002", "u002", 125),
("c003", "u003", 96),
("c004", "u004", 43);

SELECT * FROM purchases;
SELECT * FROM users
INNER JOIN purchases
ON users.id=purchases.buyer
WHERE users.id="u002";
INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('c001','p003',1),
('c001','p004',1),
('c002','p002',2),
('c002','p005',1);
SELECT * FROM purchases_products;
SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;