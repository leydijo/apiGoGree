
import { Request, Response } from "express";
import { RegisterUser } from "../services/register";
import { Register } from "../interface/register";

class RegisterController  {
  async registerUser(req: Request, res: Response) {
    try {
      const { fullname, email, password, confirmPassword, date } = req.body;

      // Crear un nuevo objeto Register con los datos recibidos
      const newRegister: Register = {
     
        fullname,
        email,
        password,
        confirmPassword,
        date:new Date(),
      };

      // Intentar registrar al nuevo usuario
      const createdUser = await RegisterUser.newUser(newRegister);

      // El usuario se registró con éxito
      res.status(201).json(createdUser);
    } catch (error:any) {
      // Manejar errores específicos
      if (
        error.message === 'Fullname must be a non-empty string' ||
        error.message === 'Invalid email format' ||
        error.message === 'Passwords do not match' ||
        error.message == 'Email is already in use'
      ) {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Error in registerUser controller:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
const registerCtrl = new RegisterController();
export { registerCtrl };

