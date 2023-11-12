import { Supplier } from "../interface/supplier";
import { Response } from "express";
import { SuppliersModel } from "../models/suppliers";

const supplierService = new SuppliersModel();

const registerSuppliers = async (newSupplier: Supplier, res: Response) => {
  try {
    const responseUser = await supplierService.createSsupplier(newSupplier);
    console.log(newSupplier);
    return responseUser;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingSuppliers");
  }
};

export { registerSuppliers };
