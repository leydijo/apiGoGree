import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { registerSuppliers } from "../services/supplier";
import { Supplier } from "../interface/supplier";

const supplierCtrl = async  (req: Request, res: Response)=> {
  try {
    const { supplier_name, supplier_phone, supplier_address, supplier_website } = req.body;
   
    if (typeof supplier_name === "undefined" || typeof supplier_phone === "undefined" 
    || typeof supplier_address === "undefined" || typeof supplier_website === "undefined"  ) {
      return handleHttp(res, 400, responseApi.general.notFound);
    }

    const newSupplier: Supplier = {
      supplier_name,
      supplier_phone,
      supplier_address,
      supplier_website
    };

    const responseUser = await registerSuppliers(newSupplier, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in supplier", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { supplierCtrl };
