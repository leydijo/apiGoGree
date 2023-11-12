import { Register } from "../interface/register";
import { Response } from "express";
import { RegisterModel } from "../models/register";

const registerModel = new RegisterModel();

const registerUser = async (newUser: Register, res: Response) => {
  try {
    const responseUser = await registerModel.createUser(newUser);
    console.log(newUser);
    return responseUser;
  } catch (e) {
    console.log(e);
    throw new Error("Error savingUser");
  }
};

export { registerUser };
