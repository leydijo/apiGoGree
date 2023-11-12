// En el controlador (authenticationController.ts)
import { Request, Response } from "express";
import { handleHttp } from "../utils/response.handle";
import responseApi from "../lang/response-api";
import { registerUser } from "../services/register";
import { Register } from "../interface/register";

const registerCtrl = async  (req: Request, res: Response)=> {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
   
    if (typeof fullname === "undefined" || typeof email === "undefined" || typeof password === "undefined") {
      return handleHttp(res, 400, responseApi.general.notFound);
    }

    const newUser: Register = {
      fullname,
      email,
      password,
      confirmPassword,
      date:new Date(),
    };

    const responseUser = await registerUser(newUser, res);
    return handleHttp(res, 200, responseApi.registration.success, responseUser);

  } catch (e) {
    console.log("error in registration", e);
    return handleHttp(res, 500, responseApi.general.serverError);
  }
};

export { registerCtrl };
