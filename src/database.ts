import { User, Product, Purchase, Category } from "./types";

export const dataUser: User[] = [
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
]

export const dataProduct: Product[] = [
    {
        id: "001",
        name: "bola",
        price: 12,
        category: Category.SPORTS
    },
    {
        id: "002",
        name: "Ferrari",
        price: 30,
        category: Category.CARS
    }
]

export const dataPurchase: Purchase[] = [
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
]

export const creatUser = (id: string, email: string, password: string): string => {
    dataUser.push({ id, email, password })
    return "Cadastro realizado com sucesso"
}

export const getAllUsers = (): User[] => {
    return dataUser
}

export const createProduct = (id: string, name: string, price: number, category: Category): string => {
    dataProduct.push({ id, name, price, category })
    return "Produto criado com sucesso"
}
export const getAllProducts = (): Product[] => {
    return dataProduct
}

export const getProductById = (idToSearch: string): Product | undefined => {
    const findProduct = dataProduct.find(prod => prod.id === idToSearch)
    return findProduct
}

export const queryProductsByName = (q: string): Product[] => {
    const findProduct = dataProduct.filter(prod => prod.name.toLowerCase().includes(q.toLowerCase()))
    return findProduct
}

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrices: number): string => {
    dataPurchase.push({ userId, productId, quantity, totalPrices })
    return "Compra realizada com sucesso"
}

export const getAllPurchasesFromUserId = (userIdToSearch: string): Purchase[] => {
    const findPurchase = dataPurchase.filter(purchase => purchase.userId === userIdToSearch)
    return findPurchase
}
export const deleteUserById = (id: string): string => {
    const userIndex = dataUser.findIndex((user) => user.id === id)
    if (userIndex >= 0) {
        dataUser.splice(userIndex, 1)
    }
    return "User apagado com sucesso"
}

export const deleteProductById = (id: string): string => {
    const productIndex = dataProduct.findIndex((product) => product.id === id)
    if (productIndex >= 0) {
        dataProduct.splice(productIndex, 1)
    }
    return "Produto apagado com sucesso"
}

export const editUserbyid = (id: string, email: string|undefined, password: string|undefined): string => {
    const user = dataUser.find((user) => user.id === id)
    if (user) {
        user.email = email || user.email
        user.password = password || user.password
    }
    return "Atualização realizada com sucesso"
}

export const editProductbyid = (id: string, nome: string|undefined, price: number|undefined, category: Category|undefined):string =>{
    const product = dataProduct.find((product) => product.id === id)
    if (product) {
        product.name = nome || product.name
        product.price = price || product.price
        product.category = category || product.category
    }
    return "Produto atualizado com sucesso"
}