import express, { Request, Response} from 'express';
import cors from 'cors';
import { creatUser, createProduct, createPurchase, dataProduct, dataPurchase, dataUser, deleteProductById, deleteUserById, editProductbyid, editUserbyid, getAllProducts, getAllPurchasesFromUserId, getAllUsers, getProductById, queryProductsByName } from "./database";
import { Category } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

app.get('/users',(req: Request, res: Response)=>{
    const result = getAllUsers()
    res.status(200).send(result)
})
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id
    const result = getAllPurchasesFromUserId(id)
    res.status(200).send(result)
});

app.get('/products',(req: Request, res: Response)=>{
    const result = getAllProducts()
    res.status(200).send(result)
})
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = getProductById(id)
    res.status(200).send(result)
});
app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.produto as string
    const result = queryProductsByName(q)
    res.status(200).send(result)
});

app.post('/users', (req: Request, res: Response) => {
    const {id, email, password} = req.body
    const result = creatUser(id, email, password)
    res.status(201).send(result)
});

app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, category} = req.body
    const result = createProduct(id, name, price, category)
    res.status(201).send(result)
});

app.post('/purchases', (req: Request, res: Response) => {
    const {userid, productId, quantity, totalPrices} = req.body
    const result = createPurchase(userid, productId, quantity, totalPrices)
    res.status(201).send(result)
});

app.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined
    const result = editUserbyid(id, newEmail, newPassword)
    res.status(200).send(result)
})

app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newname = req.body.name as string | undefined
    const newprice = req.body.password as number | undefined
    const newCategory = req.body.category as Category | undefined
    const result = editProductbyid(id, newname, newprice,newCategory)
    res.status(200).send(result)
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = deleteUserById(id)
    res.status(200).send(result)
})
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = deleteProductById(id)
    res.status(200).send(result)
})


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

