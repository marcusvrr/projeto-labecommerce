"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log((0, database_1.queryProductsByName)("bola"));
console.log((0, database_1.createPurchase)("003", "003", 2, 140));
console.log((0, database_1.getAllPurchasesFromUserId)("001"));
//# sourceMappingURL=index.js.map