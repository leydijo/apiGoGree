import { Login } from "../interface/login";
import { Response } from "express";
import { LoginModel } from "../models/login";

const loginModel = new LoginModel();

const login = async (newLogin: Login, res: Response) => {
  try {
    const responseUser = await loginModel.createLogin(newLogin);
    console.log(newLogin);
    return responseUser;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingLogin");
  }
};

export { login };
