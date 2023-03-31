export enum Category {
  SPORTS = "brinquedos relacionados a esporte",
  CARS = "carrinhos",
  DOLLS = "bonecas"
}

export type User = {
    id: string,
    email: string,
    password: string
  }

  export type Product = {
    id: string,
    name: string,
    price: number,
    category: Category
  }
  
  export type Purchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrices: number
  }