import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { registerProduct } from "../services/product";
import { Product } from "../interface/product";

const productCtrl = async  (req: Request, res: Response)=> {
  try {
    const { product_name, product_description, product_price} = req.body;
   
    if (typeof product_name === "undefined" ||  typeof product_description === "undefined" || 
        typeof product_price === "undefined") {
        return handleHttp(res, 400, responseApi.general.notFound);
    }

    const newProduct: Product = {
      product_name,
      product_description,
      product_price
    };

    const responseUser = await registerProduct(newProduct, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in product", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { productCtrl };
