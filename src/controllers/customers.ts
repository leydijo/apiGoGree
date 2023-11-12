import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { registerCustomer } from "../services/customers";
import { Customer } from "../interface/customer";

const customerCtrl = async  (req: Request, res: Response)=> {
  try {
    const { customer_type, customer_name, customer_phone, customer_email,customer_address} = req.body;
   
    if (typeof customer_type === "undefined" ||  typeof customer_name === "undefined" || 
        typeof customer_phone === "undefined" || typeof customer_email === "undefined" || 
        typeof customer_email === customer_address) {
        return handleHttp(res, 400, responseApi.general.notFound);
    }

    const newCustomer: Customer = {
      customer_type,
      customer_name,
      customer_phone,
      customer_email,
      customer_address
    };

    const responseUser = await registerCustomer(newCustomer, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in customer", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { customerCtrl };
