const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { QuoteSupplier } from "../interface/quote_supplier";
const mysql = require('mysql2');
const pool = require('../config/mysql');


require('dotenv').config();

class QuoteSuppliers {
  constructor() {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    });
  }

  async createQuoteSupplier(newQuoteSupplier: QuoteSupplier) {
    const sql = 'INSERT INTO quote_suppliers (quote_suppliers_created, supplier_id, quote_suppliers_description, quote_suppliers_price) VALUES (?, ?, ?, ?)';
    const values = [newQuoteSupplier.quote_suppliers_created, newQuoteSupplier.supplier_id, newQuoteSupplier.quote_suppliers_description, newQuoteSupplier.quote_suppliers_price];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error creating quote_suppliers:', error);
      throw error;
    }
  }
}

export { QuoteSuppliers};                      