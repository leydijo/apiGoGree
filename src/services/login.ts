import { Login } from "../interface/login";
import { Response } from "express";
import { LoginModel } from "../models/login";
import { Register } from '../interface/register';
import { handleHttp } from '../utils/response.handle';

const loginModel = new LoginModel();

const login = async (newRegister: Register, res: Response) => {
  try {
    const isAuthenticated = await LoginModel.loginUser(newRegister);

    return handleHttp(res, 200, 'Login successful', { isAuthenticated });
  } catch (e) {
    console.log(e);
    throw new Error("Error savingLogin");
  }
};

export { login };
