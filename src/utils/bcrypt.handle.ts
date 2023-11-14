import { hash, compare } from "bcryptjs";
import bcrypt from 'bcrypt';

export const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, 8);
  return passwordHash;
};

export const verified = async (pass: string, passHash: string) => {
  bcrypt.compare(pass, passHash, (err, result) => {
    if (err) {
      // Manejar el error, por ejemplo, lanzar una excepción
      throw err;
    }
  
    if (result) {
      // La contraseña coincide
      console.log('Contraseña correcta');
    } else {
      // La contraseña no coincide
      console.log('Contraseña incorrecta');
    }
  })
};


export const hashPassword = async(password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}


