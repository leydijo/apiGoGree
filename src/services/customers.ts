import { Customer } from "../interface/customer";
import { Response } from "express";
import { CustomerModel } from "../models/customer";

const customerModel = new CustomerModel();

const registerCustomer = async (newCustomer: Customer, res: Response) => {
  try {
    const responseUser = await customerModel.createCustomer(newCustomer);
    console.log(newCustomer);
    return responseUser;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingCustomer");
  }
};

export { registerCustomer };
