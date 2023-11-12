import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { login } from "../services/login";
import { Login } from "../interface/login";

const loginCtrl = async  (req: Request, res: Response)=> {
  try {
    const { username, password, lastlogin} = req.body;
   
    if (typeof username === "undefined" ||  typeof password === "undefined" || 
        typeof lastlogin === "undefined") {
        return handleHttp(res, 400, responseApi.general.notFound);
    }

    const newLogin: Login = {
      username,
      password,
      lastlogin
    };

    const responseUser = await login(newLogin, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in login", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { loginCtrl };
