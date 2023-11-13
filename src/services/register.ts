import { Register } from "../interface/register";
import { Response } from "express";
import { RegisterModel } from "../models/register";
class RegisterUser {
  static async newUser(newRegister: Register) {
    try {
      const createdUser = await RegisterModel.registerUser(newRegister);
      return createdUser;
    } catch (error) {
      console.error('Error in registerUser service:', error);
      throw error;
    }
  }
}

export { RegisterUser };

