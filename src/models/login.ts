
import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { Register } from '../interface/register';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
class LoginModel extends Model {
  
  public email!: string;
  public password!: string;


  static async loginUser(newRegister: Register) {
    try {
      // Validar que fullname sea una cadena no vacía
      if (typeof newRegister.email !== 'string' || !newRegister.password.trim()) {
        throw new Error('Fullname must be a non-empty string');
      }

      // Validar el formato de email usando una expresión regular simple
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newRegister.email)) {
        throw new Error('Invalid email format');
      }

      const existingRegister = await LoginModel.findOne({
        where: {
          email: newRegister.email,
        },
      });
      
      if (!existingRegister) {
        throw new Error('User not found. Verify your credentials');
      }

      // Validar que password y confirmPassword no estén vacíos y coincidan
      if (newRegister.password.trim() === '' ) {
        throw new Error('Password cannot be empty');
      }
      
      const passwordMatch = await bcrypt.compare(newRegister.password, existingRegister.password);


      if (!passwordMatch) {
        throw new Error('Incorrect password');
      }
      
      return true;
    } catch (error:any) {
      console.error('Error login user:', error);
      if (error.message === 'User not found. Verify your credentials') {
        throw error;
      }
      if (error.message === 'ncorrect password') {
        throw error;
      }
      throw error;
    }
  }
}

// Configurar el modelo con Sequelize
LoginModel.init(
  {
    idregister: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Register', 
    tableName: 'register', 
    timestamps: false, 
  }
);

export { LoginModel };
