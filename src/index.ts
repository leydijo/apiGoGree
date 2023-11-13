import "dotenv/config";
import app from "./app/app";
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const PORT = process.env.PORT || 3000;

// Conecta a la base de datos MySQL a través de Sequelize
sequelize
  .sync() // Esto sincronizará tus modelos con la base de datos
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MySQL:", error);
  });
