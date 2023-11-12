const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
import { Register } from "../interface/register";
const mysql = require('mysql2');
const pool = require('../config/mysql');


require('dotenv').config();

class RegisterModel {
  constructor() {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    });
  }

  async createUser(newUser: Register) {
    const sql = 'INSERT INTO register (fullname, email, password, confirmPassword, date) VALUES (?, ?, ?, ?, ?)';
    const values = [newUser.fullname, newUser.email, newUser.password, newUser.confirmPassword, newUser.date];

    try {
      const [results, fields] = await pool.query(sql, values);
      return results;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  }
}

export { RegisterModel};                      