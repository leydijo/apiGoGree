const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { Product } from "../interface/product";
const mysql = require('mysql2');
const pool = require('../config/mysql');
require('dotenv').config();

class ProductModel {
  constructor() {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
  }

  async createProduct(newProduct: Product) {
    const sql = 'INSERT INTO product (product_name, product_description, product_price) VALUES (?, ?, ?)';
    const values = [newProduct.product_name, newProduct.product_description, newProduct.product_price];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
}

export { ProductModel};                      