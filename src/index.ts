import "dotenv/config";
import app from "./app/app";
import dbConnect from "./config/mysql";

const PORT = process.env.PORT || 3000;

// Conecta a la base de datos MySQL
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MySQL:", error);
  });
