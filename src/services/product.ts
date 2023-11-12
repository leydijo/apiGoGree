import { Product } from "../interface/product";
import { Response } from "express";
import { ProductModel } from "../models/product";

const customerProduct = new ProductModel();

const registerProduct = async (newProduct: Product, res: Response) => {
  try {
    const responseProduct = await customerProduct.createProduct(newProduct);
    console.log(newProduct);
    return responseProduct;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingProduct");
  }
};

export { registerProduct };
