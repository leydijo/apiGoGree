import { Supplier } from "../interface/supplier";
import { Response } from "express";
import { SupplierModel } from "../models/supplier";







  const CreateSuppliers = async (newRegister: Supplier ,res: Response) => {
    try {
      const createdSuppliers = await SupplierModel.create(newRegister);
      return createdSuppliers;
    } catch (error) {
      console.error('Error in registerUser service:', error);
      throw error;
    }

  }
  const getAllSuppliers = async (res: Response) => {
    try {
      // Obtener todos los clientes
      const allSuppliers = await SupplierModel.findAllSuppliers();
  
      return res.status(200).json({
        success: true,
        message: 'All suppliers retrieved successfully',
        data: allSuppliers,
      });
    } catch (error) {
      console.error('Error fetching all suppliers:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }



export { CreateSuppliers,getAllSuppliers }
