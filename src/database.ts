import { user, product, purchase } from "./types";

export const dataUser: user[]=[
    {
        id : "001",
        email: "marcus@labemail.com",
        password : "123456"
    },
    {
        id : "002",
        email: "paula@labemail.com",
        password : "654321"
    }
]

export const dataProduct: product[]=[
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
]

export const dataPurchase: purchase[]=[
    {
        userId: "001",
        productId: "001",
        quantity: 2,
        totalPrices:24,
    },
    {
        userId: "002",
        productId: "002",
        quantity: 1,
        totalPrices:30,
    }
]