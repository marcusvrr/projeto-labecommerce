"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
console.log(database_1.dataUser);
console.log(database_1.dataProduct);
console.log(database_1.dataPurchase);
console.log((0, database_1.creatUser)("003", "ro@labemail.com", "654320"));
console.table(database_1.dataUser);
console.table((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("003", "Bearbie", 70, types_1.Category.DOLLS));
console.table(database_1.dataProduct);
console.log((0, database_1.getProductById)("010"));
console.log((0, database_1.queryProductsByName)("bola"));
console.log((0, database_1.createPurchase)("003", "003", 2, 140));
console.log((0, database_1.getAllPurchasesFromUserId)("001"));
//# sourceMappingURL=index.js.map