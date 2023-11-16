import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { getAllSuppliers } from "../services/supplier";
import { SupplierModel } from "../models/supplier";



const  newSupplier = async (req: Request, res: Response) => {

  try {
    const newSupplierInput =  req.body;
    const createdSuppliers = await SupplierModel.create(newSupplierInput);

    handleHttp(res, 201, responseApi.registration.success, createdSuppliers);
  } catch (error) {
    console.error('Error getting all suppliers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};

const  allSupplier = async (req: Request, res: Response) => {
  try {
    const customers = await getAllSuppliers(res);
    handleHttp(res, 200, responseApi.registration.success, customers);
  } catch (error) {
    console.error('Error getting all suppliers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};


export { newSupplier, allSupplier};
