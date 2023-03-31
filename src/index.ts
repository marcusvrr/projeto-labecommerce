
import { creatUser, createProduct, createPurchase, dataProduct, dataPurchase, dataUser, getAllPurchasesFromUserId, getAllUsers, getProductById, queryProductsByName } from "./database";
import { Category } from "./types";


console.log(dataUser);
console.log(dataProduct);
console.log(dataPurchase);

console.log(creatUser("003", "ro@labemail.com","654320"));
console.table(dataUser);
console.table(getAllUsers());
console.log(createProduct("003","Bearbie",70, Category.DOLLS));
console.table(dataProduct);
console.log(getProductById("010"));

console.log(queryProductsByName("bola"));

console.log(createPurchase("003", "003", 2, 140));

console.log(getAllPurchasesFromUserId("001"));

