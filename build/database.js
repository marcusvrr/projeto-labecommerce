"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.creatUser = exports.dataPurchase = exports.dataProduct = exports.dataUser = void 0;
const types_1 = require("./types");
exports.dataUser = [
    {
        id: "001",
        email: "marcus@labemail.com",
        password: "123456"
    },
    {
        id: "002",
        email: "paula@labemail.com",
        password: "654321"
    }
];
exports.dataProduct = [
    {
        id: "001",
        name: "bola",
        price: 12,
        category: types_1.Category.SPORTS
    },
    {
        id: "002",
        name: "Ferrari",
        price: 30,
        category: types_1.Category.CARS
    }
];
exports.dataPurchase = [
    {
        userId: "001",
        productId: "001",
        quantity: 2,
        totalPrices: 24,
    },
    {
        userId: "002",
        productId: "002",
        quantity: 1,
        totalPrices: 30,
    }
];
const creatUser = (id, email, password) => {
    exports.dataUser.push({ id, email, password });
    return "Cadastro realizado com sucesso";
};
exports.creatUser = creatUser;
const getAllUsers = () => {
    return exports.dataUser;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    exports.dataProduct.push({ id, name, price, category });
    return "Produto criado com sucesso";
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.dataProduct;
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    const findProduct = exports.dataProduct.find(prod => prod.id === idToSearch);
    return findProduct;
};
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    const findProduct = exports.dataProduct.filter(prod => prod.name.toLowerCase().includes(q.toLowerCase()));
    return findProduct;
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrices) => {
    exports.dataPurchase.push({ userId, productId, quantity, totalPrices });
    return "Compra realizada com sucesso";
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    const findPurchase = exports.dataPurchase.filter(purchase => purchase.userId === userIdToSearch);
    return findPurchase;
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map