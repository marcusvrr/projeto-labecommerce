"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataPurchase = exports.dataProduct = exports.dataUser = void 0;
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
        category: "brinquedo"
    },
    {
        id: "002",
        name: "Foguete",
        price: 30,
        category: "brinquedo"
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
//# sourceMappingURL=database.js.map