const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { Quote } from "../interface/quote";
const mysql = require('mysql2');
const pool = require('../config/mysql');

require('dotenv').config();

class QuoteModel {
  constructor() {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
  }

  async createQuote(newQuote: Quote) {
    const sql = 'INSERT INTO quotes (quote_created, quote_expiration, customer_id, product_id, quote_description,quote_price) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [newQuote.quote_created, newQuote.quote_expiration, newQuote.customer_id, newQuote.quote_description, newQuote.quote_price];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error creating quotes:', error);
      throw error;
    }
  }
}

export { QuoteModel};                      