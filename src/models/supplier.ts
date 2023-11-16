import { Model, DataTypes, Sequelize,Optional } from 'sequelize';
import { Supplier } from '../interface/supplier';
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

interface SupplierCreationAttributes extends Optional<Supplier, 'supplier_id'> {}
class SupplierModel extends Model<Supplier, SupplierCreationAttributes> {
  public supplier_id!: number;
  public supplier_name!: string;
  public supplier_phone!: number;
  public supplier_address!: string;
  public supplier_website!: string;

  static async registerUser(newSupplier: Supplier) {
    try{

      const createdUser = await SupplierModel.create(newSupplier);
      return createdUser;
    } catch (error) {
      console.error('Error registering supplier:', error);
      throw error;
    }
  }

  static async findAllSuppliers(): Promise<Supplier[]> {
    try {
      // Obtener todos los clientes
      const allSuppliers = await SupplierModel.findAll();
      return allSuppliers;
    } catch (error) {
      console.error('Error fetching all suppliers:', error);
      throw new Error('Error fetching all suppliers');
    }
  }
}

SupplierModel.init(
  {
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    supplier_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    supplier_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier_website: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  },
  {
    sequelize, 
    modelName: 'Supplier', 
    tableName: 'Suppliers', 
    timestamps: false, 
  }
);

export { SupplierModel };