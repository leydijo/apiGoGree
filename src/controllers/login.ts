import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { login } from "../services/login";
import { Register } from '../interface/register';


const loginCtrl = async  (req: Request, res: Response)=> {
  try {
    const newRegister: Register = req.body;
    
    const isAuthenticated = await login(newRegister, res);

    return handleHttp(res, 200, 'Login successful', { isAuthenticated });

  } catch (e:any) {
    console.log('Error in login controller:', e);
    if (e.message === 'User not found. Verify your credentials') {
      throw e;
    }
    if (e.message === 'ncorrect password') {
      throw e;
    }
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { loginCtrl };
