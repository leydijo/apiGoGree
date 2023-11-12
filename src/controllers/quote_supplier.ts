import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { quoteSupplier } from "../services/quote_supplier";
import { QuoteSupplier } from "../interface/quote_supplier";

const quoteSupplierCtrl = async  (req: Request, res: Response)=> {
  try {
    const { quote_suppliers_created, supplier_id, quote_suppliers_description,quote_suppliers_price} = req.body;
   
    if (typeof quote_suppliers_created === "undefined" ||  typeof supplier_id === "undefined" || 
        typeof quote_suppliers_description === "undefined" || typeof quote_suppliers_price === "undefined") {
        return handleHttp(res, 400, responseApi.general.notFound);
    }

    const newQuoteSupplier: QuoteSupplier = {
      quote_suppliers_created,
      supplier_id,
      quote_suppliers_description,
      quote_suppliers_price
    };

    const responseUser = await quoteSupplier(newQuoteSupplier, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in QuoteSupplier", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { quoteSupplierCtrl };
