const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { Customer } from "../interface/customer";
const mysql = require('mysql2');
const pool = require('../config/mysql');

require('dotenv').config();

class CustomerModel {
  constructor() {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    });
  }

  async createCustomer(newCustomer: Customer) {
    const sql = 'INSERT INTO customers (customer_type, customer_name, customer_phone, customer_email, customer_address) VALUES (?, ?, ?, ?, ?)';
    const values = [newCustomer.customer_type, newCustomer.customer_name, newCustomer.customer_phone, newCustomer.customer_email, newCustomer.customer_address];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error creating customers:', error);
      throw error;
    }
  }
}

export { CustomerModel};                      