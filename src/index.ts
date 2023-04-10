import express, { Request, Response } from 'express';
import cors from 'cors';
import { creatUser, createProduct, createPurchase, dataProduct, dataPurchase, dataUser, deleteProductById, deleteUserById, editProductbyid, editUserbyid, getAllProducts, getAllPurchasesFromUserId, getAllUsers, getProductById, queryProductsByName } from "./database";
import { Category, Product } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/users', (req: Request, res: Response) => {
    try {
        const result = getAllUsers()
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userExists = dataUser.find((user) => user.id === id)
        if (!userExists) {
            throw new Error("Usuário não encontrado")
        }
        const result = getAllPurchasesFromUserId(id)
        res.status(200).send(result)
    } catch (error: any) {
        res.send(error.message)
    }

});

app.get('/products', (req: Request, res: Response) => {
    try {
        const result = getAllProducts()
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }

})
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const productExists = dataProduct.find((product) => product.id === id)
        if (!productExists) {
            throw new Error("Produto não encontrado")
        }
        const result = getProductById(id)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }

});
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.produto as string
        if (q.length < 1) {
            throw new Error("query params deve possuir pelo menos um caractere")
        }
        const result = queryProductsByName(q)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
});

app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body
        if (typeof id !== "string" || typeof email !== "string") {
            return res.status(400).send("'id'e 'email' deve ser tipo string")
        }
        const invalidUser = dataUser.find((user) => user.id === id)
        if (invalidUser) {
            res.status(400)
            throw new Error("Este ID já possui um usuário")
        }
        const invalidEmail = dataUser.find((user) => user.email === email)
        if (invalidEmail) {
            res.status(400)
            throw new Error("Este ID já possui um usuário")
        }
        const result = creatUser(id, email, password)
        res.status(201).send(result)
    } catch (error: any) {
        res.send(error.message)
    }
});

app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, category }: Product = req.body
        if (typeof id !== "string" || typeof name !== "string" || typeof price !== "number" || typeof category !== "string") {
            res.status(400)
            throw new Error("'id','nome'e 'category' deve ser tipo string e price do tipo number");
        }
        const invalidProductId = dataProduct.find((product) => product.id === id)
        if (invalidProductId) {
            res.status(400)
            throw new Error("Este ID já possui um usuário")
        }
        const result = createProduct(id, name, price, category)
        res.status(201).send(result)
    } catch (error: any) {
        res.send(error.message)
    }

});

app.post('/purchases', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrices } = req.body
        if (typeof userId !== "string" || typeof productId !== "string" || typeof quantity !== "number" || typeof totalPrices !== "number") {
            res.status(400)
            throw new Error("'userId'e 'productId' deve ser tipo string e 'quantity' e 'totalPrices' do tipo number")
        }
        const userExists = dataUser.find((user) => user.id === userId)
        if (!userExists) {
            throw new Error("Usuário não encontrado")
        }
        const productExists = dataProduct.find((product) => product.id === productId)
        if (!productExists) {
            throw new Error("Produto não encontrado")
        }
        if (productExists.price * quantity !== totalPrices) {
            throw new Error("A quantidade e o total da compra devem estar com o cálculo correto")
        }
        const result = createPurchase(userId, productId, quantity, totalPrices)
        res.status(201).send(result)
    } catch (error: any) {
        res.send(error.message)
    }

});

app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined
        if (newEmail) {
            if (typeof newEmail!== "string") {
                throw new Error("'nome' deve ser tipo string")
            }
        }
        if (newPassword) {
            if (typeof newPassword!== "string") {
                throw new Error("'nome' deve ser tipo string")
            }
        }
        const userExists = dataUser.find((user) => user.id === id)
        if (!userExists) {
            throw new Error("Usuário não encontrado")
        }
        const result = editUserbyid(id, newEmail, newPassword)
        res.status(200).send(result)
    } catch (error: any) {
        res.send(error.message)
    }

})

app.put('/products/:id', (req: Request, res: Response) => {
    try {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.password as number | undefined
    const newCategory = req.body.category as Category | undefined
    if (newName) {
        if (typeof newName!== "string") {
            throw new Error("'nome' deve ser tipo string")
        }
    }
    if (newPrice) {
        if (typeof newPrice!== "string") {
            throw new Error("'nome' deve ser tipo string")
        }
    }
    if (newCategory) {
        if (typeof newCategory!== "string") {
            throw new Error("'nome' deve ser tipo string")
        }
    }
    const productExists = dataProduct.find((product) => product.id === id)
    if (!productExists) {
        throw new Error("Produto não encontrado")
    }
    const result = editProductbyid(id, newName, newPrice, newCategory)
    res.status(200).send(result)        
    } catch (error:any) {
        res.send(error.message)        
    }

})

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userExists = dataUser.find((user) => user.id === id)
        if (!userExists) {
            throw new Error("Usuário não encontrado")
        }
        const result = deleteUserById(id)
        res.status(200).send(result)
    } catch (error: any) {
        res.send(error.message)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const productExists = dataProduct.find((product) => product.id === id)
        if (!productExists) {
            throw new Error("Produto não encontrado")
        }
        const result = deleteProductById(id)
        res.status(200).send(result)
    } catch (error: any) {
        res.send(error.message)
    }
})


console.log(dataUser);
console.log(dataProduct);
console.log(dataPurchase);

console.log(creatUser("003", "ro@labemail.com", "654320"));
console.table(dataUser);
console.table(getAllUsers());
console.log(createProduct("003", "Bearbie", 70, Category.DOLLS));
console.table(dataProduct);
console.log(getProductById("010"));

console.log(queryProductsByName("bola"));

console.log(createPurchase("003", "003", 2, 140));

console.log(getAllPurchasesFromUserId("001"));

