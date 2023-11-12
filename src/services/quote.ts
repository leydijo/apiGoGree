import { Quote } from "../interface/quote";
import { Response } from "express";
import { QuoteModel } from "../models/quotes";

const customerModel = new QuoteModel();

const quoteSupplier = async (newQuote: Quote, res: Response) => {
  try {
    const responseUser = await customerModel.createQuote(newQuote);
    console.log(newQuote);
    return responseUser;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingnewQuoteSupplier");
  }
};

export { quoteSupplier };
