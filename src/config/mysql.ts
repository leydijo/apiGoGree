import { createConnection, Connection } from 'mysql2/promise'; 
import "dotenv/config";
const mysql = require('mysql2');

let dbConnection: Connection | null = null;

async function dbConnect(): Promise<void> {
  if (dbConnection) {
    return; // Si ya hay una conexión, no se crea otra.
  }

  try {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    });

    module.exports = pool.promise();

    console.log('MySQL database connection successful.');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    throw error;
  }
}

export default dbConnect;

