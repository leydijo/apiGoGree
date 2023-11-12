const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { Login } from "../interface/login";
const mysql = require('mysql2');
const pool = require('../config/mysql');

require('dotenv').config();

class LoginModel {
  constructor() {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    });
  }

  async createLogin(newLogin: Login) {
    const sql = 'INSERT INTO login (username, password, lastlogin) VALUES (?, ?, ?)';
    const values = [newLogin.username, newLogin.password, newLogin.lastlogin];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error creating login:', error);
      throw error;
    }
  }
}

export { LoginModel};                      