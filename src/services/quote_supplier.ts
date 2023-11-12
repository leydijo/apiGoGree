import { QuoteSupplier } from "../interface/quote_supplier";
import { Response } from "express";
import { QuoteSuppliers } from "../models/quote_supplier";

const customerModel = new QuoteSuppliers();

const quoteSupplier = async (newQuoteSupplier: QuoteSupplier, res: Response) => {
  try {
    const responseUser = await customerModel.createQuoteSupplier(newQuoteSupplier);
    console.log(newQuoteSupplier);
    return responseUser;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingnewQuoteSupplier");
  }
};

export { quoteSupplier };
