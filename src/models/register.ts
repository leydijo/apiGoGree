
import { Model, DataTypes, Sequelize } from 'sequelize';
import { hashPassword } from '../utils/bcrypt.handle'; 
import { Register } from '../interface/register';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
class RegisterModel extends Model {
  
  public fullname!: string;
  public email!: string;
  public password!: string;
  public confirmPassword!: string;
  public date!: Date;

  static async registerUser(newRegister: Register) {
    try {
      // Validar que fullname sea una cadena no vacía
      if (typeof newRegister.fullname !== 'string' || !newRegister.fullname.trim()) {
        throw new Error('Fullname must be a non-empty string');
      }

      // Validar el formato de email usando una expresión regular simple
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newRegister.email)) {
        throw new Error('Invalid email format');
      }

      const existingRegister = await RegisterModel.findOne({
        where: {
          email: newRegister.email,
        },
      });
      if (existingRegister) {
        throw new Error('Email is already in use');
      }

      // Validar que password y confirmPassword no estén vacíos y coincidan
      if (!newRegister.password || !newRegister.confirmPassword || newRegister.password !== newRegister.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Hashear la contraseña antes de almacenarla
      const hashedPassword = await hashPassword(newRegister.password);

      // Realizar la inserción si todas las validaciones pasan
      const createdUser = await RegisterModel.create({
        ...newRegister,
        password: hashedPassword,
        confirmPassword:hashedPassword
      });

      return createdUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
}

// Configurar el modelo con Sequelize
RegisterModel.init(
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

export { RegisterModel };
