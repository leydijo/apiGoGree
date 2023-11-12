import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { quoteSupplier } from "../services/quote";
import { Quote } from "../interface/quote";

const quoteSupplierCtrl = async  (req: Request, res: Response)=> {
  try {
    const { quote_created, quote_expiration, customer_id,product_id,quote_description,quote_price} = req.body;
   
    if (typeof quote_created === "undefined" ||  typeof quote_expiration === "undefined" || 
    typeof customer_id === "undefined" || typeof product_id === "undefined" || 
    typeof quote_description === "undefined" || typeof quote_price === "undefined") {
    return handleHttp(res, 400, responseApi.general.notFound);
}
    const newQuote: Quote = {
      quote_created,
      quote_expiration,
      customer_id,
      product_id,
      quote_description,
      quote_price
    };

    const responseUser = await quoteSupplier(newQuote, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in QuoteSupplier", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { quoteSupplierCtrl };
