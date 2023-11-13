import { Customer } from "../interface/customer";
import { Response } from "express";
import { CustomerModel } from "../models/customer";
import { areFieldsValid } from "../utils/validationCustomer";
import responseApi from "../lang/response-api";
import { handleHttp } from "../utils/response.handle";

const customerModel = new CustomerModel();

const registerCustomer = async (newCustomer: Customer, res: Response) => {
  try {
    // Verificar si los campos son válidos antes de intentar la creación
    if (!areFieldsValid(newCustomer)) {
      throw new Error('Fields are mandatory');
    }

    // Intentar crear el nuevo cliente
    const responseUser = await CustomerModel.createCustomer(newCustomer);

    return res.status(201).json(responseApi.registration.success);

    return responseUser;
  } catch (e) {
    if (e instanceof Error && e.message === 'El correo electrónico ya está registrado.') {
      return res.status(400).json(responseApi.registration.emailExists);
    }

    return res.status(500).json(responseApi.general.serverError);
  }
};

export { registerCustomer };

