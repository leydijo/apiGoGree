import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { Customer } from '../interface/customer';
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

interface CustomerCreationAttributes extends Optional<Customer, 'customer_id'> {}

class CustomerModel extends Model<Customer, CustomerCreationAttributes> {
  public customer_id!: number;
  public customer_type!: string;
  public customer_name!: string;
  public customer_phone!: number;
  public customer_email!: string;
  public customer_address!: string;

  static async createCustomer(newCustomerInput: Customer) {
    try {
      // Verificar la unicidad del email antes de insertar
      const existingCustomer = await CustomerModel.findOne({
        where: {
          customer_email: newCustomerInput.customer_email,
        },
      });

      if (existingCustomer) {
        throw new Error('Email is already in use');
      }
      if (!newCustomerInput.customer_phone) {
        throw new Error('Phone cannot be empty');
      }
      // Crear una instancia del modelo con los datos proporcionados
      const createdCustomer = await CustomerModel.create(newCustomerInput);

      return createdCustomer;
    } catch (error: any) {
      if (error.message === 'Email is already in use') {
        console.log('Email is already in use:', error.message);
        throw error;
      }
      if (error.message === 'Phone cannot be empty') {
        console.log('Phone cannot be empty:', error.message);
        throw error;
      }
      console.error('Error creating customer:', error);
      throw new Error('Error creating customer');
    }
  }

  static async findAllCustomers(): Promise<Customer[]> {
    try {
      // Obtener todos los clientes
      const allCustomers = await CustomerModel.findAll();
      return allCustomers;
    } catch (error) {
      console.error('Error fetching all customers:', error);
      throw new Error('Error fetching all customers');
    }
  }

}


CustomerModel.init(
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone cannot be empty',
        },
      },
    },
    customer_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customer_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customers',
    timestamps: false,
  }
);

export { CustomerModel };
