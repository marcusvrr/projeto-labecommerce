import express, { Request, Response } from 'express';
import cors from 'cors';
import { creatUser, createProduct, createPurchase, dataProduct, dataPurchase, dataUser, deleteProductById, deleteUserById, editProductbyid, editUserbyid, getAllProducts, getAllPurchasesFromUserId, getAllUsers, getProductById, queryProductsByName } from "./database";
import { db } from './database/knex';

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw('SELECT * FROM users;')
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

app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw('SELECT * FROM products;')
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }

})
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const productExists =  await db.raw(`SELECT * FROM products WHERE id = "${id}";`)
        if (!productExists) {
            throw new Error("Produto não encontrado")
        }
        const result =  await db.raw(`
        SELECT * FROM products 
        WHERE id = "${id}";
        
        `)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }

});
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const result = await db.raw(`SELECT * FROM products WHERE name LIKE '%${q.toLowerCase()}%';`)
        res.status(200).send(result)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const id: string = Math.floor(Date.now() * Math.random()).toString(36)
        const {name, email, password } = req.body
        if (typeof name !== "string" || typeof email !== "string") {
            return res.status(400).send("'nome'e 'email' deve ser tipo string")
        }
        const [invalidUser] = await db.raw(`SELECT * FROM users WHERE id = "${id}";`)
        if (invalidUser) {
            res.status(400)
            throw new Error("Este ID já esta cadastrado")
        }
        const [invalidEmail] = await db.raw(`SELECT * FROM users WHERE email = "${email}";`)
        if (invalidEmail) {
            res.status(400)
            throw new Error("Este email já esta cadastrado")
        }
        const newEntry = await db.raw(`INSERT INTO users (id, name, email, password) VALUES ("${id}", "${name}","${email}", "${password}")`) 
        res.status(201).send("Cadastro realizado com sucesso")
    } catch (error: any) {
        res.send(error.message)
    }
});

app.post('/products', async (req: Request, res: Response) => {
    try {
        const id: string = Math.floor(Date.now() * Math.random()).toString(36)        
        const { name, price, description, imageUrl } = req.body
        if (typeof name !== "string" || typeof price !== "number" || typeof description !== "string" ||typeof imageUrl !== "string" ) {
            res.status(400)
            throw new Error("'id','nome'e 'description' deve ser tipo string e price do tipo number");
        }
        const [invalidProductId] = await db.raw(`SELECT * FROM products WHERE id = "${id}";`)
        if (invalidProductId) {
            res.status(400)
            throw new Error("Este ID já possui um produto")
        }
        const newEntry = await db.raw(`INSERT INTO products (id, name, price, description, image_url) VALUES ("${id}", "${name}","${price}", "${description}", "${imageUrl}")`) 
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        res.send(error.message)
    }

});

app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const id: string = Math.floor(Date.now() * Math.random()).toString(36) 
        const { buyer, totalPrice } = req.body
        if (typeof buyer !== "string" || typeof totalPrice!== "number") {
            res.status(400)
            throw new Error("passe um id de usuario ou valor toal e compra válidos")
        }
        const [userExists] = await db.raw(`SELECT * FROM users WHERE id = "${buyer}";`)
        if (!userExists) {
            throw new Error("Usuário não encontrado")
        }
        const newEntry = await db.raw(`INSERT INTO purchases (id,buyer, total_price) VALUES ("${id}", "${buyer}","${totalPrice}")`)
        res.status(201).send("Compra cadastrada com sucesso")
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

// app.put('/products/:id', (req: Request, res: Response) => {
//     try {
//     const id = req.params.id
//     const newName = req.body.name as string | undefined
//     const newPrice = req.body.password as number | undefined
//     const newCategory = req.body.category as string | undefined
//     if (newName) {
//         if (typeof newName!== "string") {
//             throw new Error("'nome' deve ser tipo string")
//         }
//     }
//     if (newPrice) {
//         if (typeof newPrice!== "string") {
//             throw new Error("'nome' deve ser tipo string")
//         }
//     }
//     if (newCategory) {
//         if (typeof newCategory!== "string") {
//             throw new Error("'nome' deve ser tipo string")
//         }
//     }
//     const productExists = dataProduct.find((product) => product.id === id)
//     if (!productExists) {
//         throw new Error("Produto não encontrado")
//     }
//     const result = editProductbyid(id, newName, newPrice, newCategory)
//     res.status(200).send(result)        
//     } catch (error:any) {
//         res.send(error.message)        
//     }

// })

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
// console.log(createProduct("003", "Bearbie", 70, Category.DOLLS));
console.table(dataProduct);
console.log(getProductById("010"));

console.log(queryProductsByName("bola"));

console.log(createPurchase("003", "003", 2, 140));

console.log(getAllPurchasesFromUserId("001"));

