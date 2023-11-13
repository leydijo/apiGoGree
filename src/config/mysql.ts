import * as mysql from 'mysql2/promise';

// Configura la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  database: process.env.DB_DATABASE || 'tu_basede_datos',
};

// Función para validar la conexión a la base de datos
async function testDatabaseConnection(): Promise<void> {
  try {
    // Intenta conectar y enviar un ping a la base de datos
    const connection = await mysql.createConnection(dbConfig);
    await connection.ping();
    console.log('Conexión a la base de datos establecida correctamente.');
    // Cierra la conexión después de la prueba exitosa
    await connection.end();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

