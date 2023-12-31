import { Request, Response } from "express";
import { getAllCustomers } from '../services/customers';
import { CustomerModel } from "../models/customer";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";



const customerCtrl = async (req: Request, res: Response) => {

 
  try {
    const newCustomerInput =  req.body;
    const createdCustomer = await CustomerModel.createCustomer(newCustomerInput);
    handleHttp(res, 201, responseApi.registration.success, createdCustomer);
  } catch (error:any) {
      if (error.message === 'Email is already in use') {
        res.status(400).json({ error: 'Email is already in use' });
      }else if (error.message === 'Phone cannot be empty') {
        res.status(400).json({ error: 'Phone cannot be empty' });
      }else {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Error creating customer' });
      }
  }

}

const  allCustomers = async (req: Request, res: Response) => {

 
  try {
    const customers = await getAllCustomers(res);
    handleHttp(res, 200, responseApi.registration.success, customers);
  } catch (error) {
    console.error('Error getting all customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};


  

 


export { allCustomers,customerCtrl };
