const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { Supplier } from "../interface/supplier";
const mysql = require('mysql2');
const pool = require('../config/mysql');

require('dotenv').config();

class SuppliersModel {

  constructor() {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
  }

  async createSsupplier(newSupplier: Supplier) {
    const sql = 'INSERT INTO suppliers (supplier_name, supplier_phone, supplier_address, supplier_website) VALUES (?, ?, ?, ?)';
    const values = [newSupplier.supplier_name, newSupplier.supplier_phone, newSupplier.supplier_address, newSupplier.supplier_website];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error al crear el suppliers:', error);
      throw error;
    }
  }
}

export { SuppliersModel};                      