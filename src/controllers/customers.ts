import { Request, Response } from "express";
import { registerCustomer, getAllCustomers } from '../services/customers';
import { CustomerModel } from "../models/customer";


const customerCtrl = async  (req: Request, res: Response)=> {
  try {
    const newCustomerInput =  req.body;

   if (req.method === 'GET') {
    const customers = await getAllCustomers(res);
    res.status(201).json(customers);
   }

    const createdCustomer = await CustomerModel.createCustomer(newCustomerInput);

    res.status(201).json(createdCustomer);

  } catch (e: any) {
    if (e.message === 'Email is already in use') {
      res.status(400).json({ error: 'Email is already in use' });
    } else if (e.message === 'Phone cannot be empty') {
      res.status(400).json({ error: 'Phone cannot be empty' });
      
    } else {
      // Manejar otros errores
      console.error('Error creating customer:', e);
      res.status(500).json({ error: 'Error creating customer' });
    }
    
  }
};

export { customerCtrl };
